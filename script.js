/* ==========================================
   MESTRE DO AUTOCAD
   Tracking Profissional
========================================== */

(function () {
  "use strict";

  console.log("✅ Tracking iniciado.");

  const COURSE_NAME = "Curso Mestre do AutoCAD";
  const COURSE_VALUE = 197;
  const CURRENCY = "BRL";

  /*==========================================
      SALVA UTMs
  ==========================================*/

  const params = new URLSearchParams(window.location.search);

  [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
    "gclid",
    "fbclid",
  ].forEach(param => {
    const value = params.get(param);

    if (value) {
      localStorage.setItem(param, value);
    }
  });

  /*==========================================
      VIEW CONTENT
  ==========================================*/

  if (typeof fbq !== "undefined") {
    fbq("track", "ViewContent", {
      content_name: COURSE_NAME,
      content_category: "Curso Online",
      value: COURSE_VALUE,
      currency: CURRENCY,
    });
  }

  /*==========================================
      SCROLL
  ==========================================*/

  let scroll50 = false;
  let scroll90 = false;

  window.addEventListener("scroll", () => {
    const scroll =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);

    if (scroll >= 0.5 && !scroll50) {
      scroll50 = true;

      console.log("✅ Scroll 50%");

      if (typeof fbq !== "undefined") fbq("trackCustom", "Scroll50");

      if (typeof gtag !== "undefined") gtag("event", "scroll_50");
    }

    if (scroll >= 0.9 && !scroll90) {
      scroll90 = true;

      console.log("✅ Scroll 90%");

      if (typeof fbq !== "undefined") fbq("trackCustom", "Scroll90");

      if (typeof gtag !== "undefined") gtag("event", "scroll_90");
    }
  });

  /*==========================================
      TEMPO NA PÁGINA
  ==========================================*/

  setTimeout(() => {
    if (typeof fbq !== "undefined") fbq("trackCustom", "Time30");

    if (typeof gtag !== "undefined") gtag("event", "time_30");
  }, 30000);

  setTimeout(() => {
    if (typeof fbq !== "undefined") fbq("trackCustom", "Time60");

    if (typeof gtag !== "undefined") gtag("event", "time_60");
  }, 60000);

  /*==========================================
      CHECKOUT
  ==========================================*/

  function checkoutClick(e) {
    e.preventDefault();

    const url = this.href;

    console.log("🛒 Checkout iniciado");

    // Facebook Pixel
    if (typeof fbq !== "undefined") {
      fbq("track", "InitiateCheckout", {
        value: COURSE_VALUE,
        currency: CURRENCY,
      });
    }

    // Google Analytics 4
    if (typeof gtag !== "undefined") {
      gtag("event", "begin_checkout", {
        currency: CURRENCY,
        value: COURSE_VALUE,
        items: [
          {
            item_name: COURSE_NAME,
            price: COURSE_VALUE,
            quantity: 1,
          },
        ],
      });
    }

    // Google Ads
    if (typeof gtag_report_conversion === "function") {
      gtag_report_conversion(url);
    } else {
      window.location.href = url;
    }
  }

  /*==========================================
      BOTÕES DE CHECKOUT
  ==========================================*/

  const buttons = [
    document.getElementById("checkout-btn"),
    document.getElementById("checkout-btn-final"),
  ];

  buttons.forEach(button => {
    if (button) {
      button.addEventListener("click", checkoutClick);
    }
  });
})();
