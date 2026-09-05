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

  // Animated portrait frame + one glowing point travelling around each orbit.
  const style = document.createElement("style");
  style.textContent = `
    .portrait-wrap {
      contain: layout paint;
    }
    .portrait-frame {
      overflow: visible !important;
      isolation: isolate;
      border: 8px solid rgba(214,164,92,.88) !important;
      background: transparent !important;
      box-shadow: 0 24px 70px rgba(0,0,0,.42), inset 0 0 0 1px rgba(255,255,255,.25) !important;
    }
    .portrait-frame::before {
      content: "";
      position: absolute;
      inset: -7px;
      border-radius: 50%;
      background: conic-gradient(
        from 0deg,
        transparent 0deg,
        rgba(214,164,92,.14) 45deg,
        rgba(240,201,129,1) 95deg,
        rgba(214,164,92,.18) 145deg,
        transparent 210deg,
        transparent 360deg
      );
      -webkit-mask: radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 7px));
      mask: radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 7px));
      z-index: -1;
      animation: portraitRingSpin 12s linear infinite;
      pointer-events: none;
    }
    .portrait-frame img {
      position: static;
      z-index: auto;
      width: 100% !important;
      height: 100% !important;
      border-radius: 50% !important;
      object-fit: cover;
      object-position: center top;
      display: block;
    }
    .orbit {
      transform-origin: center center;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      will-change: transform;
      border-color: rgba(214,164,92,.46) !important;
      pointer-events: none;
    }
    .orbit::before {
      content: "";
      position: absolute;
      top: -5px;
      left: calc(50% - 5px);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #f0c981;
      box-shadow: 0 0 0 2px rgba(214,164,92,.18), 0 0 16px rgba(214,164,92,.75);
      pointer-events: none;
    }
    .orbit::after {
      content: none;
      display: none;
    }
    .orbit-one {
      border-style: solid !important;
      animation: orbitSpinOne 28s linear infinite;
    }
    .orbit-two {
      border-style: dashed !important;
      animation: orbitSpinTwo 36s linear infinite reverse;
    }
    @keyframes portraitRingSpin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    @keyframes orbitSpinOne {
      from { transform: translateZ(0) rotate(0deg); }
      to { transform: translateZ(0) rotate(360deg); }
    }
    @keyframes orbitSpinTwo {
      from { transform: translateZ(0) rotate(30deg); }
      to { transform: translateZ(0) rotate(390deg); }
    }
    .grain { opacity: .025; }
    @media (max-width: 760px) {
      .grain { display: none; }
      .orbit { border-color: rgba(214,164,92,.52) !important; }
      .orbit-one { animation-duration: 34s; }
      .orbit-two { animation-duration: 44s; }
      .orbit::before {
        width: 8px;
        height: 8px;
        top: -4px;
        left: calc(50% - 4px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .portrait-frame::before,
      .orbit-one,
      .orbit-two { animation: none; }
    }
  `;
  document.head.appendChild(style);
})();
