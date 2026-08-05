/* ==========================================================
   MESTRE DO AUTOCAD
   Tracking Profissional v2.0
========================================================== */

(() => {
  "use strict";

  console.log("Tracking carregado.");

  //==========================================================
  // CONFIGURAÇÕES
  //==========================================================

  const COURSE = {
    name: "Curso AutoCAD",
    value: 197,
    currency: "BRL",
  };

  const GOOGLE_ADS_CONVERSION = "AW-17677408224/R3MGCK-GlNwcEOCvn-1B";

  //==========================================================
  // FUNÇÕES
  //==========================================================

  function sendGA(event, params = {}) {
    if (typeof gtag !== "undefined") {
      gtag("event", event, params);
    }
  }

  function sendFB(event, params = {}) {
    if (typeof fbq !== "undefined") {
      fbq("track", event, params);
    }
  }

  function sendFBCustom(event) {
    if (typeof fbq !== "undefined") {
      fbq("trackCustom", event);
    }
  }

  //==========================================================
  // SALVA UTMs
  //==========================================================

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

  //==========================================================
  // VIEW CONTENT
  //==========================================================

  sendFB("ViewContent", {
    content_name: COURSE.name,
    content_category: "Curso Online",
    value: COURSE.value,
    currency: COURSE.currency,
  });

  //==========================================================
  // SCROLL
  //==========================================================

  let scroll50 = false;
  let scroll90 = false;

  window.addEventListener("scroll", () => {
    const percent =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;

    if (percent >= 50 && !scroll50) {
      scroll50 = true;

      sendFBCustom("Scroll50");
      sendGA("scroll_50");
    }

    if (percent >= 90 && !scroll90) {
      scroll90 = true;

      sendFBCustom("Scroll90");
      sendGA("scroll_90");
    }
  });

  //==========================================================
  // TEMPO NA PÁGINA
  //==========================================================

  [30, 60].forEach(time => {
    setTimeout(() => {
      sendFBCustom(`Time${time}`);
      sendGA(`time_${time}`);
    }, time * 1000);
  });

  //==========================================================
  // CHECKOUT
  //==========================================================

  function checkoutClick(e) {
    e.preventDefault();

    const url = this.href;

    console.log("Checkout iniciado.");

    // Facebook
    sendFB("InitiateCheckout", {
      value: COURSE.value,
      currency: COURSE.currency,
    });

    // Google Analytics
    sendGA("begin_checkout", {
      currency: COURSE.currency,
      value: COURSE.value,
      items: [
        {
          item_name: COURSE.name,
          price: COURSE.value,
        },
      ],
    });

    // Google Ads
    if (typeof gtag !== "undefined") {
      gtag("event", "conversion", {
        send_to: GOOGLE_ADS_CONVERSION,
        value: COURSE.value,
        currency: COURSE.currency,
        event_callback: function () {
          window.open(url, "_blank");
        },
      });

      setTimeout(() => {
        window.open(url, "_blank");
      }, 1200);
    } else {
      window.open(url, "_blank");
    }
  }

  //==========================================================
  // BOTÕES
  //==========================================================

  ["checkout-btn", "checkout-btn-final"].forEach(id => {
    const btn = document.getElementById(id);

    if (btn) {
      btn.addEventListener("click", checkoutClick);
    }
  });
})();
