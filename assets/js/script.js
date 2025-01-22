alert("script.js");

// URL الأساسي للسيرفر
const BASE_URL = "http://localhost:3000";



// الانتظار حتى تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
    const appointmentForm = document.querySelector('#appointmentForm');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const formData = {
                patient_name: document.querySelector('#patientName')?.value,
                phone_number: document.querySelector('#phoneNumber')?.value,
                email: document.querySelector('#email')?.value,
                identity_number: document.querySelector('#identityNumber')?.value,
                appointment_date: document.querySelector('#appointmentDate')?.value,
                appointment_time: document.querySelector('#appointmentTime')?.value,
                appointment_reason: document.querySelector('#appointmentReason')?.value,
                preferred_doctor: document.querySelector('#preferredDoctor')?.value || null,
                additional_notes: document.querySelector('#additionalNotes')?.value || null,
                has_insurance: document.querySelector('#hasInsurance')?.checked || false,
                insurance_company: document.querySelector('#insuranceCompany')?.value || null,
                insurance_policy_number: document.querySelector('#insurancePolicyNumber')?.value || null,
                agree_to_terms: document.querySelector('#agreeToTerms')?.checked,
                reminder_method: document.querySelector('#reminderMethod')?.value,
                appointment_id:"0DIp40VffqQiwNv71Dn4"
            };

            // تأكد من أن جميع الحقول الضرورية غير فارغة
            const missingFields = [];
            for (const [key, value] of Object.entries(formData)) {
                if ((value === null || value === '') && key !== 'preferred_doctor' && key !== 'additional_notes' && key !== 'insurance_company' && key !== 'insurance_policy_number') {
                    missingFields.push(key);
                }
            }

            if (missingFields.length > 0) {
                alert(`الحقول التالية مفقودة: ${missingFields.join(', ')}`);
                return;
            }

            bookAppointment(formData);
        });
    }
});

// إرسال طلب لحجز موعد
async function bookAppointment(formData) {
    try {
        const response = await fetch(`${BASE_URL}/bookAppointment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
            alert(`تم حجز الموعد بنجاح! رقم الموعد: ${result.appointment_id}`);
        } else {
            alert(`حدث خطأ: ${result.error}`);
        }
    } catch (error) {
        console.error('خطأ أثناء الاتصال بالسيرفر:', error);
        alert('حدث خطأ أثناء الاتصال بالسيرفر. حاول مرة أخرى.');
    }
}