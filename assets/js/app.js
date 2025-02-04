alert("app.js");

$(document).ready(function () {
  // عند الضغط على زر الحجز
  $('#reservationButton').on('click', function () {
    alert('تم الضغط على زر الحجز!');
  });


  // $('#google-login').click(function () {
  //   $.ajax({
  //     url: '/api/auth/google',
  //     method: 'GET',
  //     success: function (response) {
  //       // معالجة الاستجابة هنا، مثل التوجيه إلى صفحة البروفايل أو تحديث واجهة المستخدم
  //       window.location.href = '/profile';
  //     },
  //     error: function (error) {
  //       console.error('Error logging in with Google', error);
  //     }
  //   });
  // });


  $('#google-login').click(function () {
    window.location.href = 'http://192.168.1.33:3000/api/auth/google';
  });

  $('#microsoft-login').click(function () {
    $.ajax({
      url: '/api/auth/microsoft',
      method: 'GET',
      success: function (response) {
        // معالجة الاستجابة هنا
        window.location.href = '/';
      },
      error: function (error) {
        console.error('Error logging in with Microsoft', error);
      }
    });
  });
 

});

// بعد تحميل الصفحة
// window.onload = function () {
//   const token = localStorage.getItem('token');
//   if (token) {
//     const userName = localStorage.getItem('userName');
//     document.getElementById('userFullName').textContent = userName;
//   }
// }

document.addEventListener('DOMContentLoaded', function() {
  // Check if user data exists in localStorage
  const userName = localStorage.getItem('userName');
  
  if (userName) {
      // Display user name and dashboard link
      document.getElementById('userName').textContent = `Welcome, ${userName}`;
      document.getElementById('dashboardLink').style.display = 'inline-block';
      document.getElementById('logoutBtn').style.display = 'inline-block';
      
      // Hide login and signup buttons
      document.getElementById('loginLink').style.display = 'none';
      document.getElementById('signupLink').style.display = 'none';
  }
  
  // Handle logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
          // Clear user data from localStorage
          localStorage.removeItem('userName');
           localStorage.removeItem('userNameuserEmail');
          localStorage.removeItem('token');
          
          // Redirect to homepage or login page
          window.location.href = 'index';
      });
  }
});