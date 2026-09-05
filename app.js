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

  // Restore the original portrait treatment: the photo keeps its gold frame,
  // while the two outer circles stay segmented and rotate around it.
  const style = document.createElement("style");
  style.textContent = `
    .portrait-wrap {
      contain: layout paint;
    }
    .portrait-frame {
      overflow: hidden !important;
      isolation: auto;
      border: 8px solid rgba(214,164,92,.88) !important;
      background: #d6d0c7 !important;
      box-shadow: 0 24px 70px rgba(0,0,0,.42), inset 0 0 0 1px rgba(255,255,255,.25) !important;
    }
    .portrait-frame::before {
      content: none !important;
      display: none !important;
    }
    .portrait-frame img {
      position: static;
      z-index: auto;
      width: 100% !important;
      height: 100% !important;
      border-radius: 0;
      object-fit: cover;
      display: block;
    }
    .orbit {
      transform-origin: center center;
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      will-change: transform;
      border-color: rgba(214,164,92,.46) !important;
    }
    .orbit-one {
      border-style: dashed !important;
      animation: orbitSpinOne 28s linear infinite;
    }
    .orbit-two {
      border-style: dotted !important;
      animation: orbitSpinTwo 36s linear infinite reverse;
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
    }
    @media (prefers-reduced-motion: reduce) {
      .orbit-one,
      .orbit-two { animation: none; }
    }
  `;
  document.head.appendChild(style);
})();
