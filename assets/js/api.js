const API_BASE_URL = 'https://user-api-server.onrender.com';
// const API_BASE_URL = 'http://localhost:3000';

// دالة لحجز استشارة
function bookConsultation(data) {
  $.ajax({
    url: `${API_BASE_URL}/bookAppointment`,
    method: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (response) {
      alert('The appointment has been successfully booked!');
    },
    error: function (error) {
      console.error('Error in booking:', error);
    },
  });
}
