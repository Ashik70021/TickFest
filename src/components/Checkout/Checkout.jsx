import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('bookingData');
    if (data) {
      setBookingData(JSON.parse(data));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#B13BFF] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-[#090040] mb-8">Checkout</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Event Details */}
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-[#B13BFF]/10 to-[#471396]/10 p-6 rounded-xl">
                  <h2 className="text-xl font-bold text-[#090040] mb-4">Event Details</h2>
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-[#090040]">{bookingData.event.name}</h3>
                    <p className="text-gray-700">{bookingData.event.venue}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{bookingData.event.date} {bookingData.event.month} {bookingData.event.year}</span>
                      <span>{bookingData.event.time}</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h2 className="text-xl font-bold text-[#090040] mb-4">Ticket Details</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{bookingData.ticket.name}</span>
                      <span className="text-[#B13BFF] font-bold">৳{bookingData.ticket.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Quantity</span>
                      <span className="font-semibold">{bookingData.quantity}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold text-[#B13BFF]">৳{bookingData.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Form */}
              <div className="space-y-6">
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h2 className="text-xl font-bold text-[#090040] mb-4">Payment Information</h2>
                  <p className="text-gray-600 mb-4">This is a demo checkout page. Payment integration would be implemented here.</p>
                  
                  <div className="space-y-4">
                    <button 
                      onClick={() => {
                        alert('Payment successful! This is a demo.');
                        localStorage.removeItem('bookingData');
                        navigate('/');
                      }}
                      className="w-full bg-gradient-to-r from-[#B13BFF] to-[#471396] text-white font-bold py-4 px-6 rounded-2xl hover:from-[#471396] hover:to-[#B13BFF] transition-all duration-300"
                    >
                      Complete Payment - ৳{bookingData.total}
                    </button>
                    
                    <button 
                      onClick={() => navigate(-1)}
                      className="w-full bg-gray-200 text-gray-700 font-bold py-4 px-6 rounded-2xl hover:bg-gray-300 transition-colors"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
