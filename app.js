(() => {
  const root = document.documentElement;
  const toggle = document.querySelector(".language-toggle");
  const translatable = document.querySelectorAll("[data-ar][data-en]");
  const year = document.getElementById("year");

  const setLanguage = (lang) => {
    const isArabic = lang === "ar";
    root.lang = lang;
    root.dir = isArabic ? "rtl" : "ltr";
    translatable.forEach((el) => {
      const value = isArabic ? el.dataset.ar : el.dataset.en;
      if (el.tagName === "H1" || el.tagName === "H2") {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });
    if (toggle) {
      toggle.textContent = isArabic ? "EN" : "AR";
      toggle.setAttribute(
        "aria-label",
        isArabic ? "Switch to English" : "التبديل إلى العربية"
      );
    }
    document.title = "Hammad Masalah | Media Portfolio";
    localStorage.setItem("site-language", lang);
  };

  const saved = localStorage.getItem("site-language");
  setLanguage(saved === "en" ? "en" : "ar");

  toggle?.addEventListener("click", () => {
    setLanguage(root.lang === "ar" ? "en" : "ar");
  });

  if (year) year.textContent = new Date().getFullYear();

  const style = document.createElement("style");
  style.textContent = `
    .portrait-frame {
      overflow: visible !important;
      isolation: isolate;
      border-color: transparent !important;
      background: transparent !important;
      box-shadow: 0 24px 70px rgba(0,0,0,.42);
    }
    .portrait-frame::before {
      content: "";
      position: absolute;
      inset: -7px;
      border-radius: 50%;
      background: conic-gradient(from 0deg, transparent 0deg, rgba(214,164,92,.15) 45deg, rgba(240,201,129,1) 95deg, rgba(214,164,92,.18) 145deg, transparent 210deg, transparent 360deg);
      z-index: 0;
      animation: portraitRingSpin 5.5s linear infinite;
      filter: drop-shadow(0 0 8px rgba(240,201,129,.35));
    }
    .portrait-frame img {
      position: relative;
      z-index: 1;
      width: 100% !important;
      height: 100% !important;
      border-radius: 50%;
      object-fit: cover;
      display: block;
    }
    .portrait-frame::after {
      z-index: 2 !important;
      border-radius: 50%;
      pointer-events: none;
    }
    @keyframes portraitRingSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @media (prefers-reduced-motion: reduce) {
      .portrait-frame::before { animation: none; }
    }
  `;
  document.head.appendChild(style);
})();
