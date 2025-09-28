/**
 * ===============================================
 * Main JavaScript File - ملف الجافا سكريبت الرئيسي
 * ===============================================
 * جميع الـ scripts منظمة ومقسمة بشكل وظيفي
 */

// ===============================================
// 1. DOM Ready Handler - معالج جاهزية الصفحة
// ===============================================
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 تم تحميل الصفحة بنجاح");

  // تشغيل جميع الوظائف عند تحميل الصفحة
  initMobileMenu();
  initBackToTop();
  initTestimonialsSlider();
  initBeforeAfterSliders();
  initMenuActiveState();
});

// ===============================================
// 2. Mobile Menu Functionality - وظائف القائمة المحمولة
// ===============================================
function initMobileMenu() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");

  // التحقق من وجود العناصر
  if (!mobileMenuButton || !mobileMenu || !menuIcon) {
    console.warn("⚠️ عناصر القائمة المحمولة غير موجودة");
    return;
  }

  /**
   * تبديل حالة القائمة المحمولة
   */
  function toggleMobileMenu() {
    const isMenuVisible = !mobileMenu.classList.contains("hidden");

    if (isMenuVisible) {
      // إغلاق القائمة
      closeMobileMenu();
    } else {
      // فتح القائمة
      openMobileMenu();
    }
  }

  /**
   * فتح القائمة المحمولة
   */
  function openMobileMenu() {
    mobileMenu.classList.remove("hidden");
    mobileMenu.classList.add("animate-fade-in");

    // تغيير الأيقونة إلى X
    menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M6 18L18 6M6 6l12 12" />
        `;

    console.log("📱 تم فتح القائمة المحمولة");
  }

  /**
   * إغلاق القائمة المحمولة
   */
  function closeMobileMenu() {
    mobileMenu.classList.add("hidden");

    // تغيير الأيقونة إلى الهامبرجر
    menuIcon.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M4 6h16M4 12h16M4 18h16" />
        `;

    console.log("📱 تم إغلاق القائمة المحمولة");
  }

  // Event Listeners للقائمة المحمولة
  mobileMenuButton.addEventListener("click", toggleMobileMenu);

  // إغلاق القائمة عند النقر خارجها
  document.addEventListener("click", function (e) {
    const isClickOutside =
      !mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target);

    if (isClickOutside && !mobileMenu.classList.contains("hidden")) {
      closeMobileMenu();
    }
  });

  // إغلاق القائمة عند النقر على الروابط
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });
}

// ===============================================
// 3. Back to Top Button - زر العودة للأعلى
// ===============================================
function initBackToTop() {
  const backToTopButton = document.getElementById("back-to-top");

  if (!backToTopButton) {
    console.warn("⚠️ زر العودة للأعلى غير موجود");
    return;
  }

  /**
   * إظهار/إخفاء زر العودة للأعلى حسب موضع التمرير
   */
  function handleScroll() {
    const scrollPosition = window.scrollY;
    const showThreshold = 300; // إظهار الزر بعد التمرير 300px

    if (scrollPosition > showThreshold) {
      showBackToTopButton();
    } else {
      hideBackToTopButton();
    }
  }

  /**
   * إظهار زر العودة للأعلى
   */
  function showBackToTopButton() {
    backToTopButton.classList.remove("opacity-0", "pointer-events-none");
    backToTopButton.classList.add("opacity-100");
  }

  /**
   * إخفاء زر العودة للأعلى
   */
  function hideBackToTopButton() {
    backToTopButton.classList.remove("opacity-100");
    backToTopButton.classList.add("opacity-0", "pointer-events-none");
  }

  /**
   * العودة للأعلى بسلاسة
   */
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    console.log("⬆️ تم الانتقال للأعلى");
  }

  // Event Listeners لزر العودة للأعلى
  window.addEventListener("scroll", handleScroll);
  backToTopButton.addEventListener("click", scrollToTop);
}

// ===============================================
// 4. Testimonials Slider - سلايدر الشهادات
// ===============================================
function initTestimonialsSlider() {
  const testimonialsContainer = document.querySelector(".testimonials-swiper");

  if (!testimonialsContainer) {
    console.warn("⚠️ سلايدر الشهادات غير موجود");
    return;
  }

  // التحقق من وجود مكتبة Swiper
  if (typeof Swiper === "undefined") {
    console.error("❌ مكتبة Swiper غير محملة");
    return;
  }

  try {
    // إعدادات سلايدر الشهادات
    new Swiper(".testimonials-swiper", {
      // الإعدادات الأساسية
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,

      // التشغيل التلقائي
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      // النقاط السفلية
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },

      // أزرار التنقل
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // الاستجابة للشاشات المختلفة
      breakpoints: {
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },

      // التأثيرات
      effect: "slide",
      speed: 600,

      // اللمس والسحب
      touchRatio: 1,
      touchAngle: 45,
      grabCursor: true,
    });

    console.log("🎠 تم تشغيل سلايدر الشهادات بنجاح");
  } catch (error) {
    console.error("❌ خطأ في تشغيل سلايدر الشهادات:", error);
  }
}

// ===============================================
// 5. Menu Active State - حالة القائمة النشطة
// ===============================================
function initMenuActiveState() {
  const menuLinks = document.querySelectorAll(".menu-link");

  if (menuLinks.length === 0) {
    console.warn("⚠️ روابط القائمة غير موجودة");
    return;
  }

  /**
   * تفعيل الرابط المحدد
   */
  function setActiveLink(clickedLink) {
    // إزالة الحالة النشطة من جميع الروابط
    menuLinks.forEach((link) => {
      link.classList.remove("active");
    });

    // إضافة الحالة النشطة للرابط المحدد
    clickedLink.classList.add("active");

    console.log("🔗 تم تفعيل الرابط:", clickedLink.textContent);
  }

  // إضافة Event Listeners لروابط القائمة
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      setActiveLink(this);
    });
  });

  // إضافة وظيفة إضافية لإغلاق القائمة المحمولة عند النقر على الروابط
  // (هذا للتأكد من التوافق مع الكود الأصلي)
  const mobileLinkElements = document.querySelectorAll("#mobile-menu a");
  const mobileMenuElement = document.getElementById("mobile-menu");
  const menuIconElement = document.getElementById("menu-icon");

  if (mobileLinkElements.length > 0 && mobileMenuElement && menuIconElement) {
    mobileLinkElements.forEach((link) => {
      link.addEventListener("click", function () {
        // إغلاق القائمة المحمولة
        mobileMenuElement.classList.add("hidden");
        menuIconElement.innerHTML =
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        console.log("📱 تم إغلاق القائمة المحمولة من رابط القائمة");
      });
    });
  }
}

// ===============================================
// 6. Before/After Slider - سلايدر قبل/بعد
// ===============================================
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll(".before-after-container");

  if (sliders.length === 0) {
    console.warn("⚠️ سلايدرات قبل/بعد غير موجودة");
    return;
  }

  sliders.forEach((container, index) => {
    const handle = container.querySelector(".slider-handle");
    const afterImage = container.querySelector(".after-image");
    const sliderLine = container.querySelector(".slider-line");

    // التحقق من وجود العناصر المطلوبة
    if (!handle || !afterImage || !sliderLine) {
      console.warn(`⚠️ عناصر سلايدر قبل/بعد رقم ${index + 1} غير مكتملة`);
      return;
    }

    let isDragging = false;
    let animationId = null;

    /**
     * تحديث موضع السلايدر
     */
    function updateSlider(percentage) {
      // التأكد من أن النسبة بين 0 و 100
      percentage = Math.max(0, Math.min(100, percentage));

      // تحديث قناع الصورة
      afterImage.style.clipPath = `inset(0 0 0 ${percentage}%)`;

      // تحديث موضع المقبض والخط
      handle.style.left = `${percentage}%`;
      sliderLine.style.left = `${percentage}%`;

      // تحديث خاصية البيانات للاستخدام المستقبلي
      container.setAttribute("data-position", percentage);
    }

    /**
     * بداية السحب - الماوس
     */
    function handleMouseDown(e) {
      isDragging = true;
      document.body.style.cursor = "ew-resize";
      document.body.style.userSelect = "none";
      e.preventDefault();
    }

    /**
     * أثناء السحب - الماوس
     */
    function handleMouseMove(e) {
      if (!isDragging) return;

      // إلغاء الإطار السابق للحصول على أداء أفضل
      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      animationId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const percentage = ((e.clientX - rect.left) / rect.width) * 100;
        updateSlider(percentage);
      });
    }

    /**
     * انتهاء السحب - الماوس
     */
    function handleMouseUp() {
      isDragging = false;
      document.body.style.cursor = "default";
      document.body.style.userSelect = "";

      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }

    /**
     * بداية اللمس - الهاتف
     */
    function handleTouchStart(e) {
      isDragging = true;
      e.preventDefault();
    }

    /**
     * أثناء اللمس - الهاتف
     */
    function handleTouchMove(e) {
      if (!isDragging) return;

      if (animationId) {
        cancelAnimationFrame(animationId);
      }

      animationId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const touch = e.touches[0];
        const percentage = ((touch.clientX - rect.left) / rect.width) * 100;
        updateSlider(percentage);
      });

      e.preventDefault();
    }

    /**
     * انتهاء اللمس - الهاتف
     */
    function handleTouchEnd() {
      isDragging = false;

      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }

    /**
     * النقر في أي مكان على الحاوية
     */
    function handleContainerClick(e) {
      // تجاهل النقر على المقبض نفسه
      if (e.target === handle || handle.contains(e.target)) return;

      const rect = container.getBoundingClientRect();
      const percentage = ((e.clientX - rect.left) / rect.width) * 100;

      // إضافة تأثير انتقال سلس
      handle.style.transition = "left 0.3s ease";
      sliderLine.style.transition = "left 0.3s ease";
      afterImage.style.transition = "clip-path 0.3s ease";

      updateSlider(percentage);

      // إزالة التأثير بعد الانتهاء
      setTimeout(() => {
        handle.style.transition = "";
        sliderLine.style.transition = "";
        afterImage.style.transition = "";
      }, 300);
    }

    // Event Listeners للماوس
    handle.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Event Listeners للمس
    handle.addEventListener("touchstart", handleTouchStart, { passive: false });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    // النقر على الحاوية
    container.addEventListener("click", handleContainerClick);

    // إضافة دعم لوحة المفاتيح
    handle.setAttribute("tabindex", "0");
    handle.addEventListener("keydown", function (e) {
      const currentPosition =
        parseFloat(container.getAttribute("data-position")) || 50;
      let newPosition = currentPosition;

      switch (e.key) {
        case "ArrowLeft":
          newPosition = Math.max(0, currentPosition - 5);
          break;
        case "ArrowRight":
          newPosition = Math.min(100, currentPosition + 5);
          break;
        case "Home":
          newPosition = 0;
          break;
        case "End":
          newPosition = 100;
          break;
        default:
          return;
      }

      e.preventDefault();
      updateSlider(newPosition);
    });

    // تهيئة السلايدر في الموضع الافتراضي (50%)
    updateSlider(50);

    console.log(`🖼️ تم تشغيل سلايدر قبل/بعد رقم ${index + 1}`);
  });
}

// ===============================================
// 7. Utility Functions - وظائف مساعدة
// ===============================================

/**
 * تنفيذ وظيفة عند انتهاء التحميل
 */
function onDocumentReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

/**
 * إضافة تأثير fade للعنصر
 */
function fadeIn(element, duration = 300) {
  element.style.opacity = "0";
  element.style.display = "block";

  let start = performance.now();

  function animate(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    element.style.opacity = progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

/**
 * إزالة تأثير fade للعنصر
 */
function fadeOut(element, duration = 300) {
  let start = performance.now();
  const initialOpacity = parseFloat(getComputedStyle(element).opacity);

  function animate(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    element.style.opacity = initialOpacity * (1 - progress);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      element.style.display = "none";
    }
  }

  requestAnimationFrame(animate);
}

/**
 * إضافة/إزالة فئة CSS مع انتقال
 */
function toggleClassSmooth(element, className, duration = 300) {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
}

// ===============================================
// 8. Performance Optimization - تحسين الأداء
// ===============================================

/**
 * Throttle function للحد من استدعاء الوظائف المتكررة
 */
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Debounce function لتأخير تنفيذ الوظائف
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// ===============================================
// 9. Error Handling - معالجة الأخطاء
// ===============================================

/**
 * معالج الأخطاء العام
 */
window.addEventListener("error", function (e) {
  console.error("❌ حدث خطأ في الجافا سكريبت:", {
    message: e.message,
    filename: e.filename,
    lineno: e.lineno,
    colno: e.colno,
    error: e.error,
  });
});

/**
 * معالج الأخطاء للـ Promises
 */
window.addEventListener("unhandledrejection", function (e) {
  console.error("❌ خطأ في Promise غير معالج:", e.reason);
  e.preventDefault(); // منع إظهار الخطأ في الكونسول
});

// ===============================================
// 10. Cleanup on Page Unload - تنظيف عند ترك الصفحة
// ===============================================
window.addEventListener("beforeunload", function () {
  // إلغاء جميع الـ animation frames
  if (typeof cancelAnimationFrame !== "undefined") {
    // يمكن إضافة أي تنظيف مطلوب هنا
  }

  console.log("👋 تم ترك الصفحة - تم التنظيف");
});

// ===============================================
// Final Console Message - رسالة نهائية
// ===============================================
console.log(`
🎉 تم تحميل ملف JavaScript الرئيسي بنجاح!
📅 ${new Date().toLocaleString("ar-EG")}
✅ جميع الوظائف جاهزة للعمل
`);
