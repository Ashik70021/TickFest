<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

require_once 'DbConnect.php';

// Get database connection
$conn = include 'DbConnect.php';

if (!$conn) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Parse request path
function parsePath() {
    $path = $_SERVER['REQUEST_URI'];
    $pathParts = explode('/', trim(parse_url($path, PHP_URL_PATH), '/'));
    
    // Check for action in URL parameters first
    if (isset($_GET['action'])) {
        return $_GET['action'];
    }
    
    // Then check path
    $action = end($pathParts);
    return $action;
}

// Send JSON response
function sendResponse($statusCode, $data) {
    http_response_code($statusCode);
    header('Content-Type: application/json');
    echo json_encode($data, JSON_PRETTY_PRINT);
    exit;
}

// Generate QR code data
function generateQRCode($userId, $eventId, $ticketType) {
    $data = $userId . '-' . $eventId . '-' . $ticketType . '-' . time() . '-' . uniqid();
    return hash('sha256', $data);
}

// Generate ticket PDF (using HTML instead of FPDF for now)
function generateTicketPDF($ticket) {
    header('Content-Type: text/html');
    header('Content-Disposition: inline; filename="ticket-' . $ticket['Ticket_ID'] . '.html"');
    
    echo "<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>TickFest - Event Ticket</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .ticket-container {
            width: 210mm;
            height: 297mm;
            background: white;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            position: relative;
            display: flex;
            flex-direction: column;
        }

        .ticket-header {
            background: linear-gradient(135deg, #090040 0%, #471396 50%, #B13BFF 100%);
            padding: 30px;
            color: white;
            position: relative;
            overflow: hidden;
            min-height: 220px;
        }

        .ticket-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('../../Images/banner1.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 0.2;
            z-index: 1;
        }

        .ticket-header::after {
            content: '';
            position: absolute;
            top: -50%;
            right: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: float 6s ease-in-out infinite;
            z-index: 1;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
        }

        .brand-logo {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            position: relative;
            z-index: 3;
        }

        .logo-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(45deg, #B13BFF, white);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            margin-right: 15px;
            box-shadow: 0 8px 16px rgba(177, 59, 255, 0.3);
        }

        .brand-name {
            font-size: 30px;
            font-weight: 900;
            letter-spacing: -1px;
        }

        .event-title {
            font-size: 38px;
            font-weight: 800;
            margin-bottom: 10px;
            line-height: 1.1;
            position: relative;
            z-index: 3;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .event-subtitle {
            font-size: 16px;
            font-weight: 400;
            opacity: 0.9;
            position: relative;
            z-index: 3;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .ticket-body {
            flex: 1;
            padding: 50px;
            background: white;
            position: relative;
        }

        .ticket-info {
            background: linear-gradient(135deg, #e8f4fd 0%, #d1ecf1 100%);
            border: 2px solid #b3d9ff;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 30px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
        }

        .info-section {
            background: transparent;
            padding: 0;
            border-radius: 0;
            border: none;
            position: relative;
            overflow: visible;
            min-height: auto;
        }

        .info-section::before {
            display: none;
        }

        .info-section h4 {
            font-size: 14px;
            font-weight: 700;
            color: #090040;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .info-details {
            font-size: 12px;
            color: #333;
            line-height: 1.4;
        }

        .info-details strong {
            color: #090040;
            font-weight: 600;
        }

        .info-label {
            font-size: 11px;
            font-weight: 600;
            color: #471396;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 6px;
        }

        .info-value {
            font-size: 16px;
            font-weight: 700;
            color: #090040;
            line-height: 1.3;
        }

        .info-icon {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 28px;
            height: 28px;
            background: linear-gradient(45deg, #B13BFF, #471396);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
        }

        .ticket-details {
            background: linear-gradient(135deg, #090040 0%, #471396 100%);
            color: white;
            padding: 30px;
            border-radius: 20px;
            margin-bottom: 30px;
            position: relative;
            overflow: hidden;
        }

        .ticket-details::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url('../../Images/banner2.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            opacity: 0.1;
            z-index: 1;
        }

        .ticket-details::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"80\" cy=\"40\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"40\" cy=\"80\" r=\"1.5\" fill=\"rgba(255,255,255,0.1)\"/></svg>');
            opacity: 0.3;
            z-index: 2;
        }

        .details-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 20px;
            position: relative;
            z-index: 3;
        }

        .detail-item {
            text-align: center;
        }

        .detail-label {
            font-size: 10px;
            opacity: 0.8;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 4px;
        }

        .detail-value {
            font-size: 16px;
            font-weight: 600;
        }

        .qr-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
            border-radius: 15px;
            border: 2px dashed #B13BFF;
            margin-bottom: 30px;
        }

        .qr-code {
            width: 80px;
            height: 80px;
            background: linear-gradient(45deg, #090040, #471396);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 10px;
            text-align: center;
            font-weight: 600;
        }

        .ticket-number {
            text-align: right;
        }

        .ticket-id {
            font-size: 12px;
            font-weight: 700;
            color: #090040;
            margin-bottom: 3px;
        }

        .ticket-serial {
            font-size: 24px;
            font-weight: 900;
            background: linear-gradient(45deg, #090040, #B13BFF);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            line-height: 1;
        }

        .ticket-owner {
            background: linear-gradient(135deg, #e8f4fd 0%, #d1ecf1 100%);
            border: 2px solid #b3d9ff;
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 20px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 25px;
        }

        .owner-section h4 {
            font-size: 14px;
            font-weight: 700;
            color: #090040;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .owner-info {
            font-size: 12px;
            color: #333;
            line-height: 1.4;
        }

        .owner-info strong {
            color: #090040;
            font-weight: 600;
        }

        .terms {
            padding: 20px;
            background: linear-gradient(135deg, #fff8f0 0%, #fff4e6 100%);
            border: 2px solid #ffcc99;
            border-radius: 15px;
            position: relative;
        }

        .terms::before {
            content: '📋';
            position: absolute;
            top: -12px;
            left: 20px;
            background: linear-gradient(45deg, #ff9800, #f57c00);
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
        }

        .terms-title {
            font-size: 14px;
            font-weight: 700;
            color: #090040;
            margin-bottom: 12px;
            margin-left: 30px;
        }

        .terms-text {
            font-size: 10px;
            color: #555;
            line-height: 1.4;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
        }

        .terms-text li {
            display: flex;
            align-items: flex-start;
            gap: 6px;
            margin-bottom: 4px;
        }

        .terms-text li::before {
            content: '•';
            color: #ff9800;
            font-weight: bold;
            flex-shrink: 0;
        }

        /* Print Styles */
        @media print {
            body {
                background: white;
                padding: 0;
            }
            
            .ticket-container {
                box-shadow: none;
                border-radius: 0;
                width: 210mm;
                height: 297mm;
            }
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .ticket-container {
                width: 100%;
                height: auto;
                min-height: 100vh;
            }

            .ticket-info {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .details-grid {
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
            }

            .ticket-owner {
                grid-template-columns: 1fr;
                gap: 20px;
            }

            .terms-text {
                grid-template-columns: 1fr;
                gap: 6px;
            }

            .qr-section {
                flex-direction: column;
                gap: 15px;
                text-align: center;
            }

            .event-title {
                font-size: 32px;
            }

            .ticket-header,
            .ticket-body {
                padding: 30px;
            }
        }

        @media (max-width: 480px) {
            .ticket-info {
                grid-template-columns: 1fr;
                gap: 15px;
            }

            .details-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
            }

            .info-section {
                min-height: auto;
                padding: 0;
            }

            .info-details {
                font-size: 11px;
            }

            .ticket-owner {
                padding: 20px;
            }

            .qr-code {
                width: 60px;
                height: 60px;
                font-size: 8px;
            }

            .ticket-serial {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>
    <div class=\"ticket-container\">
        <!-- Header Section -->
        <div class=\"ticket-header\">
            <div class=\"brand-logo\">
                <div class=\"logo-icon\">🎭</div>
                <div class=\"brand-name\">TickFest</div>
            </div>
            <div class=\"event-title\">" . htmlspecialchars($ticket['event_name'] ?? 'Event Name') . "</div>
            <div class=\"event-subtitle\">An Unforgettable Experience</div>
        </div>

        <!-- Body Section -->
        <div class=\"ticket-body\">
            <div class=\"ticket-info\">
                <div class=\"info-section\">
                    <h4>📅 Event Details</h4>
                    <div class=\"info-details\">
                        <strong>Date:</strong> " . htmlspecialchars($ticket['event_date'] ?? 'TBD') . "<br>
                        <strong>Time:</strong> 6:00 PM (Gates: 5:00 PM)<br>
                        <strong>Duration:</strong> 4 Hours<br>
                        <strong>Status:</strong> Confirmed
                    </div>
                </div>
                <div class=\"info-section\">
                    <h4>📍 Venue & Access</h4>
                    <div class=\"info-details\">
                        <strong>Venue:</strong> " . htmlspecialchars($ticket['venue'] ?? 'TBD') . "<br>
                        <strong>Address:</strong> Event Location<br>
                        <strong>Ticket Type:</strong> " . htmlspecialchars($ticket['Ticket_Type'] ?? 'General') . "<br>
                        <strong>Access Level:</strong> Standard Access
                    </div>
                </div>
            </div>

            <div class=\"ticket-details\">
                <div class=\"details-grid\">
                    <div class=\"detail-item\">
                        <div class=\"detail-label\">Seat Section</div>
                        <div class=\"detail-value\">A</div>
                    </div>
                    <div class=\"detail-item\">
                        <div class=\"detail-label\">Row</div>
                        <div class=\"detail-value\">3</div>
                    </div>
                    <div class=\"detail-item\">
                        <div class=\"detail-label\">Seat</div>
                        <div class=\"detail-value\">15</div>
                    </div>
                    <div class=\"detail-item\">
                        <div class=\"detail-label\">Price</div>
                        <div class=\"detail-value\">৳5,500</div>
                    </div>
                    <div class=\"detail-item\">
                        <div class=\"detail-label\">Attendee</div>
                        <div class=\"detail-value\">John Doe</div>
                    </div>
                    <div class=\"detail-item\">
                        <div class=\"detail-label\">Valid Until</div>
                        <div class=\"detail-value\">" . date('M d, Y', strtotime($ticket['event_date'] ?? 'now') + 86400) . "</div>
                    </div>
                </div>
            </div>

            <div class=\"qr-section\">
                <div class=\"qr-code\">
                    QR CODE<br>
                    <div style=\"font-size: 8px; margin-top: 3px;\">Scan to Verify</div>
                </div>
                <div class=\"ticket-number\">
                    <div class=\"ticket-id\">Ticket ID</div>
                    <div class=\"ticket-serial\">" . htmlspecialchars($ticket['Ticket_ID']) . "</div>
                </div>
            </div>

            <div class=\"ticket-owner\">
                <div class=\"owner-section\">
                    <h4>👤 Ticket Holder Information</h4>
                    <div class=\"owner-info\">
                        <strong>Name:</strong> John Doe<br>
                        <strong>Email:</strong> john.doe@email.com<br>
                        <strong>Phone:</strong> +880 1712-345678<br>
                        <strong>Purchase Date:</strong> " . htmlspecialchars($ticket['Purchased_At'] ?? 'N/A') . "
                    </div>
                </div>
                <div class=\"owner-section\">
                    <h4>🏢 Event Organizer</h4>
                    <div class=\"owner-info\">
                        <strong>Organizer:</strong> TickFest Events Ltd.<br>
                        <strong>Contact:</strong> info@tickfest.com<br>
                        <strong>Phone:</strong> +880 1800-TICKET<br>
                        <strong>Website:</strong> www.tickfest.com
                    </div>
                </div>
            </div>

            <div class=\"terms\">
                <div class=\"terms-title\">Terms & Conditions</div>
                <ul class=\"terms-text\">
                    <li>Non-transferable ticket - One-time entry only</li>
                    <li>Valid photo ID required at entry</li>
                    <li>No outside food or beverages allowed</li>
                    <li>No recording devices permitted</li>
                    <li>Management reserves right to refuse entry</li>
                    <li>Non-refundable except event cancellation</li>
                    <li>Age restrictions may apply for certain areas</li>
                    <li>Security check mandatory at all entrances</li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>";
    exit;
}

// Confirm payment and generate ticket
function confirmPayment() {
    global $conn;

    $input = json_decode(file_get_contents('php://input'), true);

    if (!$input) {
        sendResponse(400, ['error' => 'Invalid JSON input']);
    }

    $required = ['user_id', 'event_id', 'ticket_type', 'payment_id'];
    foreach ($required as $field) {
        if (!isset($input[$field])) {
            sendResponse(400, ['error' => "Field '$field' is required"]);
        }
    }

    $userId = mysqli_real_escape_string($conn, $input['user_id']);
    $eventId = mysqli_real_escape_string($conn, $input['event_id']);
    $ticketType = mysqli_real_escape_string($conn, $input['ticket_type']);
    $paymentId = mysqli_real_escape_string($conn, $input['payment_id']);

    // Allow any payment ID for testing (remove in production)
    if (empty($paymentId)) {
        sendResponse(400, ['error' => 'Payment ID is required']);
    }
    
    // Check if event exists
    $eventCheckQuery = "SELECT id, name FROM events WHERE id = '$eventId'";
    $eventCheckResult = mysqli_query($conn, $eventCheckQuery);
    
    if (!$eventCheckResult || mysqli_num_rows($eventCheckResult) === 0) {
        sendResponse(404, ['error' => 'Event not found']);
    }

    // Generate QR code
    $qrCode = generateQRCode($userId, $eventId, $ticketType);

    // Try to insert ticket - handle auto-increment primary key
    $query = "INSERT INTO tickets (User_ID, Event_ID, Ticket_Type, QR_Code, Purchased_At) VALUES ('$userId', '$eventId', '$ticketType', '$qrCode', NOW())";
    
    // Debug: Log the query
    error_log("Executing query: " . $query);
    
    $result = mysqli_query($conn, $query);
    if (!$result) {
        $error = mysqli_error($conn);
        $errno = mysqli_errno($conn);
        error_log("Query failed: " . $error . " (Error code: " . $errno . ")");
        
        // If it's a duplicate entry error, try a different approach
        if ($errno == 1062) { // Duplicate entry error
            // Maybe the table structure is different, let's try without specifying columns that might auto-generate
            $simpleQuery = "INSERT INTO tickets (User_ID, Event_ID, Ticket_Type, QR_Code) VALUES ('$userId', '$eventId', '$ticketType', '$qrCode')";
            $result = mysqli_query($conn, $simpleQuery);
            if (!$result) {
                sendResponse(500, ['error' => 'Failed to generate ticket: ' . mysqli_error($conn)]);
            }
        } else {
            sendResponse(500, ['error' => 'Failed to generate ticket: ' . $error]);
        }
    }

    $ticketId = mysqli_insert_id($conn);
    
    if (!$ticketId) {
        sendResponse(500, ['error' => 'Ticket was inserted but could not get ticket ID']);
    }
    
    // Debug: Log the ticket ID
    error_log("Generated ticket ID: " . $ticketId);

    // Fetch ticket details with better error handling
    $ticketQuery = "SELECT t.Ticket_ID, t.Ticket_Type, t.QR_Code, t.Purchased_At,
                           e.name AS event_name, e.date AS event_date, e.venue 
                    FROM tickets t 
                    LEFT JOIN events e ON t.Event_ID = e.id 
                    WHERE t.Ticket_ID = '$ticketId'";
    $result = mysqli_query($conn, $ticketQuery);
    
    if (!$result) {
        sendResponse(500, ['error' => 'Database query failed: ' . mysqli_error($conn)]);
    }
    
    if (mysqli_num_rows($result) === 0) {
        sendResponse(500, ['error' => 'Ticket was created but could not be retrieved']);
    }

    $ticket = mysqli_fetch_assoc($result);

    sendResponse(201, [
        'success' => true,
        'message' => 'Ticket generated successfully',
        'ticket' => $ticket
    ]);
}

// Download ticket function
function downloadTicket() {
    global $conn;
    
    if (!isset($_GET['ticket_id'])) {
        sendResponse(400, ['error' => 'Ticket ID is required']);
    }
    
    $ticketId = mysqli_real_escape_string($conn, $_GET['ticket_id']);
    
    // Fetch ticket details
    $ticketQuery = "SELECT t.Ticket_ID, t.Ticket_Type, t.QR_Code, t.Purchased_At,
                           e.name AS event_name, e.date AS event_date, e.venue 
                    FROM tickets t 
                    LEFT JOIN events e ON t.Event_ID = e.id 
                    WHERE t.Ticket_ID = '$ticketId'";
    $result = mysqli_query($conn, $ticketQuery);
    
    if (!$result || mysqli_num_rows($result) === 0) {
        sendResponse(404, ['error' => 'Ticket not found']);
    }
    
    $ticket = mysqli_fetch_assoc($result);
    generateTicketPDF($ticket);
}

// Debug function to check table structure
function checkTableStructure() {
    global $conn;
    
    $query = "DESCRIBE tickets";
    $result = mysqli_query($conn, $query);
    
    if ($result) {
        $structure = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $structure[] = $row;
        }
        sendResponse(200, ['table_structure' => $structure]);
    } else {
        sendResponse(500, ['error' => 'Could not check table structure: ' . mysqli_error($conn)]);
    }
}

// Handle request
$action = parsePath();
if ($action === 'confirm_payment') {
    confirmPayment();
} elseif ($action === 'download') {
    downloadTicket();
} elseif ($action === 'debug_table') {
    checkTableStructure();
} else {
    sendResponse(404, ['error' => 'Endpoint not found']);
}