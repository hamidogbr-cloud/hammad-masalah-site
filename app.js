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

  // Keep the portrait effects smooth without making the whole page feel busy.
  const style = document.createElement("style");
  style.textContent = `
    .portrait-wrap {
      contain: layout paint;
    }
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
      background: conic-gradient(from 0deg, #b98643 0deg, #d6a45c 55deg, #f0c981 110deg, #d6a45c 165deg, #b98643 220deg, #d6a45c 275deg, #f0c981 330deg, #b98643 360deg);
      z-index: 0;
      animation: portraitRingSpin 14s linear infinite;
      will-change: transform;
      transform: translateZ(0);
      filter: drop-shadow(0 0 7px rgba(240,201,129,.25));
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
    .orbit {
      will-change: transform;
      transform-origin: center center;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    .orbit-one {
      animation: orbitSpinOne 28s linear infinite;
    }
    .orbit-two {
      animation: orbitSpinTwo 36s linear infinite reverse;
    }
    @keyframes portraitRingSpin {
      from { transform: translateZ(0) rotate(0deg); }
      to { transform: translateZ(0) rotate(360deg); }
    }
    @keyframes orbitSpinOne {
      from { transform: translateZ(0) rotate(0deg); }
      to { transform: translateZ(0) rotate(360deg); }
    }
    @keyframes orbitSpinTwo {
      from { transform: translateZ(0) rotate(30deg); }
      to { transform: translateZ(0) rotate(390deg); }
    }
    /* The grain texture is visually nice but expensive on some phones. */
    .grain { opacity: .025; }
    @media (max-width: 760px) {
      .grain { display: none; }
      .orbit-one { animation-duration: 34s; }
      .orbit-two { animation-duration: 44s; }
      .portrait-frame::before { animation-duration: 16s; }
    }
    @media (prefers-reduced-motion: reduce) {
      .portrait-frame::before,
      .orbit-one,
      .orbit-two { animation: none; }
    }
  `;
  document.head.appendChild(style);
})();
