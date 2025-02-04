// تحقق من وجود التوكن
const token = localStorage.getItem('token');
if (!token) {
    alert('Unauthorized! Please login first.');
    window.location.href = 'index.html';
}

$(document).ready(function () {

    // Sidebar Toggle
    $('#sidebarToggle').click(function () {
        $('#sidebar').toggleClass('closed');
        $('#page-content').toggleClass('expanded');
    });

    $('#sidebarClose').click(function () {
        $('#sidebar').addClass('closed');
        $('#page-content').addClass('expanded');
    });


    // إحضار معلومات المستخدم من الـ localStorage (أو الـ API)
     let userName = localStorage.getItem('userName');
    let userEmail = localStorage.getItem('userEmail');
    // إحضار معلومات المستخدم من الـ localStorage (أو الـ API)
    // let user = JSON.parse(localStorage.getItem('user'));
    // التحقق من وجود البيانات واستبدال الفراغات بـ "_"
    if (userName) {
        userName = userName.replace(/ /g, "_");
    } else {
        userName = "user";
    }

    if (!userEmail) {
        userEmail = "email";
    }

      // عرض البيانات في الـ Navbar
    $('#userInfo').text(`${userName} (${userEmail})`);


    // تسجيل الخروج
    $('#logoutLink').on('click', function () {
        localStorage.removeItem('token'); // حذف التوكن
        window.location.href = 'index.html'; // إعادة التوجيه لصفحة تسجيل الدخول
    });


    // التعامل مع الروابط في الـ Sidebar
    $('#settingsLink').on('click', function () {
        loadSettings();
    });

    $('#consultationsLink').on('click', function () {
        loadConsultation();
    });

    $('#appointmentsLink').on('click', function () {
        // loadAppointments();
        loadAppointements();
    });

    $('#articlesLink').on('click', function () {
        loadFavoriteArticles();
    });

    // تحميل الاعدادات
    function loadSettings() {
        $('#content').html('<h3>Loading Settings...</h3>');

    }

    // تحميل الاستشارات
    function loadConsultation() {
        $('#content').html('<h3>Loading Consultation...</h3>');

    }

     // تحميل الاستشارات
     function loadAppointements() {
        $('#content').html('<h3>Loading Appointements...</h3>');

    }

    // تحميل المقالات
    function loadFavoriteArticles() {
        $('#content').html('<h3>Loading Favorite Articles...</h3>');
    }
});
