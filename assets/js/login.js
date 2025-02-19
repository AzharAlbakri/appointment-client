// const BASE_URL = "http://localhost:3000";
const BASE_URL = 'https://user-api-server.onrender.com/';

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // منع إرسال الفورم بشكل تقليدي
        console.log("123321");

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        // التحقق من أن الحقول ليست فارغة
        if (!email || !password) {
            alert('يرجى ملء جميع الحقول');
            return;
        }

        // إرسال بيانات تسجيل الدخول إلى السيرفر
        loginUser({ email, password });
    });

    // إرسال طلب تسجيل الدخول إلى السيرفر
    async function loginUser(credentials) {
        console.log("123321");
        try {
            const response = await fetch(`${BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const result = await response.json();

            if (response.ok) {
                // تخزين التوكن وبيانات المستخدم في الـ localStorage
                localStorage.setItem('token', result.token);
                localStorage.setItem('userName', result.user.fullName);
                localStorage.setItem('userEmail', result.user.email);

                console.log("dfsfhsdf");
                // إعادة توجيه المستخدم إلى الصفحة الرئيسية أو صفحة العيادة
                window.location.href = '/index.html'; // تغيير المسار حسب الحاجة
            } else {
                alert(`خطأ: ${result.message}`);
            }
        } catch (error) {
            console.error('خطأ أثناء إرسال البيانات:', error);
            alert('حدث خطأ أثناء الاتصال بالسيرفر.');
        }
    }
});

