

$(document).ready(function () {
    fetchSections();


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
    window.location.href = API_BASE_URL;
    // window.location.href = 'http://192.168.1.33:3000/api/auth/google';

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


  // جعل الدالة متاحة عالميًا
  window.loadCategories = function (sectionId) {
    const lang = 'en';

    $.ajax({
      url: `${API_BASE_URL}/section/${sectionId}/categories`,
      method: 'GET',
      success: function (categories) {
        $('#categoriesSection').empty();

        categories.forEach(category => {
          const title = category.title[lang] || category.title['en'];
          const description = category.description[lang] || category.description['en'];
          const categoryId = category.categoryId;

          $('#categoriesSection').append(`
                  <div class="col-md-4 mb-4">
                      <div class="card category-card" data-category-id="${categoryId}">
                          <img src="${category.imageUrl}" class="card-img-top" alt="${title}">
                          <div class="card-body">
                              <h5 class="card-title">${title}</h5>
                              <p class="card-text">${description}</p>
                              <a href="javascript:void(0);" class="btn btn-primary">Read More</a>
                          </div>
                      </div>
                      <div class="row subcategories-container" id="subcategories-${categoryId}" style="display: none;"></div>
                  </div>
              `);
        });

        // عند الضغط على كارد الفئة
        $('.category-card').click(function (event) {
          event.preventDefault();  // لمنع التغيير في الرابط
          const categoryId = $(this).data('category-id');

          // إزالة الحدود الزرقاء من جميع الكروت وإخفاء الفئات الفرعية
          $('.category-card').removeClass('border-primary');
          $('.subcategories-container').slideUp();

          // إضافة الحدود الزرقاء للفئة المختارة وإظهار الفئات الفرعية
          $(this).addClass('border-primary');

          loadSubcategories(sectionId, categoryId);
        });
      },
      error: function (err) {
        console.error("Error fetching categories:", err);
      }
    });
  };


  // تحميل الفئات الفرعية
  window.loadSubcategories = function (sectionId, categoryId) {
    console.log("sectionId", sectionId);
    console.log("categoryId", categoryId);

    $.ajax({
      url: `${API_BASE_URL}/section/${sectionId}/category/${categoryId}/subcategories`,
      method: "GET",
      success: function (subcategories) {
        const subcategoriesContainer = $(`#subcategories-${categoryId}`);
        subcategoriesContainer.empty();

        // إضافة حاوية الفئات الفرعية التي تحتوي على الكروت
        subcategoriesContainer.append('<div class="subcategory-row">');

        subcategories.forEach((subcategory, index) => {
          // توزيع الكروت على صفوف مكونة من 3 كروت
          if (index % 3 === 0 && index !== 0) {
            subcategoriesContainer.append('</div><div class="subcategory-row">'); // إضافة صف جديد بعد 3 كروت
          }

          // إضافة الكرت الخاص بالفئة الفرعية
          subcategoriesContainer.append(`
          <div class="col-md-4 mb-4 mt-5">
            <div class="card subcategory-card" data-section-id="${sectionId}" data-category-id="${categoryId}" data-subcategory-id="${subcategory.subcategoryId}">
              <img src="${subcategory.imageUrl}" class="card-img-top" alt="${subcategory.title.en}" style="height: 36px; width: 40%; object-fit: cover;">
              <div class="card-body">
                <h6 class="card-title" style="font-size: 14px; font-weight: bold;">${subcategory.title.en}</h6>
                <p class="card-text" style="font-size: 12px; color: #555;">${subcategory.description.en}</p>
                <a href="subcategory.html?sectionId=${sectionId}&categoryId=${categoryId}&subcategoryId=${subcategory.subcategoryId}" class="btn btn-sm btn-primary">Read More</a>
              </div>
            </div>
          </div>
        `);
        });

        subcategoriesContainer.append('</div>'); // إغلاق الحاوية بعد إضافة كل الكروت

        // إظهار الفئات الفرعية تحت الفئة المختارة
        subcategoriesContainer.slideDown();

        // عند الضغط على فئة فرعية، يتم فتح صفحة جديدة
        $(".subcategory-card").click(function () {
          const sectionId = $(this).data("section-id");
          const categoryId = $(this).data("category-id");
          const subcategoryId = $(this).data("subcategory-id");

          // الانتقال إلى صفحة جديدة مع تمرير المعلومات في الرابط
          window.location.href = `subcategory.html?sectionId=${sectionId}&categoryId=${categoryId}&subcategoryId=${subcategoryId}`;
        });
      },
      error: function (err) {
        console.error("Error fetching subcategories:", err);
      },
    });
  };


  function loadSubcategoryDescription(sectionId, categoryId, subcategoryId) {
    const lang = 'en'; // أو يمكنك تحديد اللغة من الـ query أو من مكان آخر

    $.ajax({
      url: `${API_BASE_URL}/section/${sectionId}/category/${categoryId}/subcategory/${subcategoryId}`,
      method: 'GET',
      success: function (subcategory) {
        $('#sectionsSection').empty(); // Clear the current content

        // استخدام اللغة المحددة في العنوان والوصف والمحتوى
        const title = subcategory.title[lang] || subcategory.title['en'];
        const description = subcategory.description[lang] || subcategory.description['en'];
        const content = subcategory.content[lang] || subcategory.content['en'];

        // إضافة البيانات إلى الـ HTML
        $('#sectionsSection').append(`
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <hr>
                    <p class="card-text">${content}</p>
                </div>
            </div>
        `);
      },
      error: function (err) {
        console.error("Error fetching subcategory description:", err);
      }
    });
  }

});


function fetchSections() {
    $.ajax({
        url: `${API_BASE_URL}/sections`,
        method: "GET",
        success: function (data) {
            renderSections(data);
        },
        error: function (err) {
            console.error("Error fetching sections:", err);
        }
    });
}

function renderSections(sections) {
    if (sections.length === 0) return;
    const lang = localStorage.getItem("selectedLang") || "en";
    sections.forEach(section => {
        const title = section.title[lang] || section.title['en'];
        const description = section.description[lang] || section.description['en'];
        const imageUrl = section.imageUrl;
        $("#sectionsSection").append(`
            <div class="col">
                <div class="card" data-section-id="${section.sectionId}">
                    <img src="${imageUrl}" class="card-img-top" alt="${title}">
                    <div class="card-img-overlay d-flex justify-content-center align-items-center">
                        <h5 class="card-title text-white">${title}</h5>
                    </div>
                </div>
            </div>
        `);
    });
    $(".card").click(function () {
        const sectionId = $(this).data("section-id");
        window.location.href = `categories.html?sectionId=${sectionId}`;
    });
}

document.addEventListener("DOMContentLoaded", function () {
 
  // Check if user data exists in localStorage
  const userName = localStorage.getItem('userName');

  if (userName) {
    // Display user name and dashboard link

    let welcomeText = i18next.t('user_welcome');
    console.log("test",welcomeText);
    if (welcomeText === 'user_welcome') {
      document.getElementById('userName').textContent = `${welcomeText}, ${userName}`;


    } else {
      document.getElementById('userName').textContent = `Welcome, ${userName}`;

    }


    document.getElementById('dashboardLink').style.display = 'inline-block';
    document.getElementById('logoutBtn').style.display = 'inline-block';

    // Hide login and signup buttons
    document.getElementById('loginLink').style.display = 'none';
    document.getElementById('signupLink').style.display = 'none';
  }

  // Handle logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      // Clear user data from localStorage
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('token');

      // Redirect to homepage or login page
      window.location.href = 'index';
    });
  }
});