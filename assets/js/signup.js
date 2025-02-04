const BASE_URL = "http://localhost:3000";

document.addEventListener('DOMContentLoaded', function () {
    // التعامل مع إرسال نموذج التسجيل
    document.querySelector('#signupForm').addEventListener('submit', function (event) {
        event.preventDefault();  // منع إرسال الفورم بشكل تقليدي

        // جمع بيانات الفورم
        const formData = {
            fullName: document.querySelector('#fullName').value,
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value,
            registrationType: "email"
        };

        // التحقق من وجود البيانات قبل الإرسال
        if (!formData.fullName || !formData.email || !formData.password) {
            alert('يرجى ملء جميع الحقول');
            return;
        }

        // إرسال البيانات إلى السيرفر باستخدام AJAX
        registerUser(formData);
    });

    // إرسال طلب التسجيل إلى السيرفر
    // async function registerUser(formData) {
    //     try {
    //         const response = await fetch(`${BASE_URL}/api/auth/signup`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(formData),
    //         });

    //         const result = await response.json();

    //         // تحقق من حالة الاستجابة
    //         if (response.ok) {
    //             if (result.user) {
    //                 // تخزين البيانات في localStorage بعد التسجيل بنجاح
    //                 localStorage.setItem('token', result.token);
    //                 localStorage.setItem('userName', result.user.fullName);
    //                 localStorage.setItem('userEmail', result.user.email);

    //                 // إعادة توجيه المستخدم إلى الصفحة الرئيسية
    //                 window.location.href = '/index.html';  // أو حسب المسار المطلوب
    //             } else {
    //                 alert('لم يتم العثور على بيانات المستخدم في الاستجابة');
    //             }
    //         } else {
    //             alert(`خطأ: ${result.message}`);
    //         }
    //     } catch (error) {
    //         console.error('خطأ أثناء إرسال البيانات:', error);
    //         alert('حدث خطأ أثناء الاتصال بالسيرفر.');
    //     }
    // }

    // إرسال طلب التسجيل إلى السيرفر
    async function registerUser(formData) {
        console.log("registerUser");
        try {
            const response = await fetch(`${BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert(`تم إنشاء الحساب بنجاح!`);

                // تخزين التوكن وبيانات المستخدم في الـ localStorage
                localStorage.setItem('token', result.token);
                localStorage.setItem('userName', result.user.fullName);
                localStorage.setItem('userEmail', result.user.email);

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
