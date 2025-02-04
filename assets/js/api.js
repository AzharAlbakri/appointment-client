const API_BASE_URL = 'http://localhost:3000';

// دالة لحجز استشارة
function bookConsultation(data) {
  $.ajax({
    url: `${API_BASE_URL}/bookAppointment`,
    method: 'POST',
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function (response) {
      alert('تم حجز الموعد بنجاح!');
    },
    error: function (error) {
      console.error('خطأ في الحجز:', error);
    },
  });
}
