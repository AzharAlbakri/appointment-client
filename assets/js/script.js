// URL الأساسي للسيرفر
//const BASE_URL = "http://localhost:3000";
const BASE_URL = 'https://user-api-server.onrender.com';

// جلب جميع المواعيد من السيرفر
async function fetchAppointments() {
    try {
        const response = await fetch(`${BASE_URL}/getAllAppointments`);
        if (!response.ok) throw new Error("Failed to fetch appointments.");

        const appointments = await response.json();
        return appointments;
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return [];
    }
}

// تحديث خيارات الوقت والتاريخ في الفورم
async function updateCalendar() {
    const today = new Date();
    const appointmentDateInput = document.querySelector('#appointmentDate');
    const appointmentTimeInput = document.querySelector('#appointmentTime');

    // جلب جميع المواعيد من السيرفر
    const appointments = await fetchAppointments();

    // تعطيل الأيام السابقة
    appointmentDateInput.addEventListener('change', () => {
        const selectedDate = new Date(appointmentDateInput.value);
        const availableTimes = [];

        // تصفية المواعيد بناءً على التاريخ المختار
        appointments.forEach(appointment => {
            const appointmentDate = new Date(`${appointment.date}T${appointment.time}`);
            if (appointment.date === appointmentDateInput.value && appointment.status !== 'booked') {
                if (appointmentDate > today) {
                    availableTimes.push(appointment.time);
                }
            }
        });

        // تحديث خيارات الوقت
        appointmentTimeInput.innerHTML = ''; // مسح الخيارات السابقة
        if (availableTimes.length > 0) {
            availableTimes.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                appointmentTimeInput.appendChild(option);
            });
            appointmentTimeInput.disabled = false;
        } else {
            const option = document.createElement('option');
            option.textContent = 'لا توجد أوقات متاحة';
            appointmentTimeInput.appendChild(option);
            appointmentTimeInput.disabled = true;
        }
    });

    // تعطيل التواريخ التي ليس لها مواعيد متاحة أو قبل اليوم الحالي
    const minDate = today.toISOString().split('T')[0]; // الحد الأدنى للتاريخ
    appointmentDateInput.min = minDate;

    const disabledDates = appointments
        .filter(appointment => appointment.status === 'booked' || new Date(appointment.date) < today)
        .map(appointment => appointment.date);

    appointmentDateInput.addEventListener('input', () => {
        const selectedDate = appointmentDateInput.value;
        if (disabledDates.includes(selectedDate)) {
            appointmentDateInput.setCustomValidity('هذا التاريخ غير متاح.');
        } else {
            appointmentDateInput.setCustomValidity('');
        }
    });
}

// استدعاء تحديث الرزنامة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    updateCalendar();

    
});

// إرسال طلب حجز الموعد
async function bookAppointment(formData) {
    try {
        const response = await fetch(`${BASE_URL}/bookAppointment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
            alert(`The appointment has been successfully booked! Appointment ID: ${result.appointmentId}`);

        } else {
            alert(`Error: ${result.error}`);
        }
    } catch (error) {
        console.error('Error booking appointment:', error);
        alert('An error occurred while connecting to the server.');
    }
}

// التعامل مع إرسال الفورم
document.querySelector('#appointmentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {
        patient_name: document.querySelector('#patientName').value,
        phone_number: document.querySelector('#phoneNumber').value,
        email: document.querySelector('#email').value,
        identity_number: document.querySelector('#identityNumber').value,
        appointment_date: document.querySelector('#appointmentDate').value,
        appointment_time: document.querySelector('#appointmentTime').value,
        appointment_reason: document.querySelector('#appointmentReason').value,
        preferred_doctor: document.querySelector('#preferredDoctor').value,
        additional_notes: document.querySelector('#additionalNotes').value,
        has_insurance: document.querySelector('#hasInsurance').checked,
        insurance_company: document.querySelector('#insuranceCompany').value,
        insurance_policy_number: document.querySelector('#insurancePolicyNumber').value,
        agree_to_terms: document.querySelector('#agreeToTerms').checked,
        reminder_method: document.querySelector('#reminderMethod').value,
        // appointment_id: 'ioqd638bJmJv0UGXcGY0'
    };

    bookAppointment(formData);
});


// التعامل مع إرسال طلب الاستشارة
async function submitConsultationForm(formData) {
    try {
      // إرسال الطلب إلى API إضافة المستخدم
      const response = await fetch(`${BASE_URL}/addUser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(`The consultation request has been successfully submitted! User ID: ${result.userId}`);

      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
        console.error('Error while sending the consultation request:', error);
        alert('An error occurred while connecting to the server.');
        
    }
  }
  
  // التعامل مع فورم طلب الاستشارة
  document.querySelector('#consultationForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    // جمع بيانات الفورم
    const formData = {
      fullName: document.querySelector('#consultationfullName').value,
      email: document.querySelector('#consultationemail').value,
      phone: document.querySelector('#consultationphone').value,
      contactMethod: document.querySelector('#consultationcontactMethod').value,
      consultationType: document.querySelector('#consultationconsultationType').value,
      additionalInfo: document.querySelector('#consultationadditionalInfo').value,
    };
  
    // إرسال البيانات إلى السيرفر
    submitConsultationForm(formData);
  });

