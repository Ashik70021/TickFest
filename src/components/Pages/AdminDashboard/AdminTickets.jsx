import { useState } from 'react';

const AdminTickets = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Sample tickets data
    const tickets = [
        {
            id: "TKT001",
            eventName: "Tech Expo 2025",
            customerName: "Ahmed Rahman",
            customerEmail: "ahmed.rahman@email.com",
            ticketType: "VIP",
            quantity: 2,
            price: "1000 BDT",
            purchaseDate: "2025-01-10 14:30",
            status: "Active",
            qrCode: "TKT001-QR-CODE",
            seatNumber: "A-15, A-16"
        },
        {
            id: "TKT002",
            eventName: "Comedy Fiesta",
            customerName: "Sarah Ahmed",
            customerEmail: "sarah.ahmed@email.com",
            ticketType: "Regular",
            quantity: 1,
            price: "300 BDT",
            purchaseDate: "2025-01-08 09:15",
            status: "Used",
            qrCode: "TKT002-QR-CODE",
            seatNumber: "B-23"
        },
        {
            id: "TKT003",
            eventName: "Business Summit",
            customerName: "Mohammad Khan",
            customerEmail: "mohammad.khan@email.com",
            ticketType: "Premium",
            quantity: 1,
            price: "800 BDT",
            purchaseDate: "2025-01-05 16:45",
            status: "Cancelled",
            qrCode: "TKT003-QR-CODE",
            seatNumber: "C-08"
        }
    ];

    // Filter tickets
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            ticket.eventName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'all' || ticket.status.toLowerCase() === filterStatus.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    // Stats
    const totalTickets = tickets.length;
    const activeTickets = tickets.filter(t => t.status === 'Active').length;
    const usedTickets = tickets.filter(t => t.status === 'Used').length;
    const cancelledTickets = tickets.filter(t => t.status === 'Cancelled').length;

    return (
        <div className="space-y-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-full p-6">
            <div className="relative z-10 p-6 lg:p-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-black text-[#090040] mb-2">
                                    🎫 Ticket Management
                                </h1>
                                <p className="text-gray-600">Track and manage all event tickets</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-4 lg:mt-0">
                                <button className="bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                                    <span className="flex items-center gap-2">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                        </svg>
                                        Export Tickets
                                    </span>
                                </button>
                                <button className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl font-semibold border border-gray-200 hover:bg-gray-200 transition-all duration-300">
                                    Generate Report
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Total Tickets</p>
                                    <p className="text-3xl font-bold text-gray-900">{totalTickets}</p>
                                </div>
                                <div className="w-12 h-12 bg-[#B13BFF]/10 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-[#B13BFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Active Tickets</p>
                                    <p className="text-3xl font-bold text-gray-900">{activeTickets}</p>
                                </div>
                                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Used Tickets</p>
                                    <p className="text-3xl font-bold text-gray-900">{usedTickets}</p>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:shadow-md transition-all duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm">Cancelled</p>
                                    <p className="text-3xl font-bold text-gray-900">{cancelledTickets}</p>
                                </div>
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search and Filter Controls */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            <div className="flex-1 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                                {/* Search Input */}
                                <div className="relative flex-1">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search by ticket ID, customer, or event..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#B13BFF] focus:border-transparent"
                                    />
                                </div>

                                {/* Status Filter */}
                                <select
                                    value={filterStatus}
                                    onChange={(e) => setFilterStatus(e.target.value)}
                                    className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#B13BFF]"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="used">Used</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>                {/* Tickets Table */}
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ticket</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Event</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type & Seat</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Purchase Date</th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredTickets.map((ticket) => (
                                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-900">{ticket.id}</div>
                                                <div className="text-sm text-gray-600">{ticket.quantity}x {ticket.price}</div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{ticket.eventName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <div>{ticket.customerName}</div>
                                            <div className="text-gray-600">{ticket.customerEmail}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                            <div className="font-medium">{ticket.ticketType}</div>
                                            <div className="text-gray-600">{ticket.seatNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{ticket.purchaseDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                                ticket.status === 'Active' ? 'bg-green-100 text-green-800 border border-green-200' :
                                                ticket.status === 'Used' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                                'bg-red-100 text-red-800 border border-red-200'
                                            }`}>
                                                <div className={`w-2 h-2 rounded-full mr-2 ${
                                                    ticket.status === 'Active' ? 'bg-green-500' :
                                                    ticket.status === 'Used' ? 'bg-blue-500' : 'bg-red-500'
                                                }`}></div>
                                                {ticket.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <div className="flex items-center justify-end space-x-2">
                                                <button className="bg-[#471396] hover:bg-[#B13BFF] text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button className="bg-blue-50 hover:bg-blue-500 text-blue-600 hover:text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 border border-blue-200">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* No results message */}
                {filteredTickets.length === 0 && (
                    <div className="text-center py-12">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">No tickets found</h3>
                        <p className="text-gray-600">Try adjusting your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTickets;
