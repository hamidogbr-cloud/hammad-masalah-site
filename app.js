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
      if (el.tagName === "H1" || el.tagName === "H2") el.innerHTML = value;
      else el.textContent = value;
    });
    if (toggle) {
      toggle.textContent = isArabic ? "EN" : "AR";
      toggle.setAttribute("aria-label", isArabic ? "Switch to English" : "التبديل إلى العربية");
    }
    document.title = "Hammad Masalah | Media Portfolio";
    localStorage.setItem("site-language", lang);
  };

  const saved = localStorage.getItem("site-language");
  setLanguage(saved === "en" ? "en" : "ar");
  toggle?.addEventListener("click", () => setLanguage(root.lang === "ar" ? "en" : "ar"));
  if (year) year.textContent = new Date().getFullYear();

  const style = document.createElement("style");
  style.textContent = `
    .portrait-wrap { contain: layout paint; }
    .portrait-frame {
      overflow: visible !important;
      isolation: isolate;
      border: 5px solid transparent !important;
      background: linear-gradient(#10131a,#10131a) padding-box, linear-gradient(135deg,#f0c981 0%,#d6a45c 30%,#67d7ff 62%,#9b7cff 82%,#f0c981 100%) border-box !important;
      box-shadow: 0 24px 70px rgba(0,0,0,.42), 0 0 28px rgba(103,215,255,.16), 0 0 32px rgba(155,124,255,.12) !important;
      transform-origin: center center;
      animation: portraitTilt 4.8s ease-in-out infinite;
    }
    .portrait-frame::before {
      content:""; position:absolute; inset:-6px; border-radius:50%;
      background:conic-gradient(from 0deg,transparent 0deg,#f0c981 55deg,#67d7ff 115deg,#9b7cff 175deg,transparent 235deg,transparent 360deg);
      -webkit-mask:radial-gradient(farthest-side,transparent calc(100% - 7px),#000 calc(100% - 6px));
      mask:radial-gradient(farthest-side,transparent calc(100% - 7px),#000 calc(100% - 6px));
      z-index:-1; animation:portraitRingSpin 7s linear infinite; pointer-events:none;
    }
    .portrait-frame img { position:static; width:100% !important; height:100% !important; border-radius:50% !important; object-fit:cover; object-position:center top; display:block; }
    .orbit { transform-origin:center center; backface-visibility:hidden; will-change:transform; border-color:rgba(103,215,255,.42) !important; pointer-events:none; }
    .orbit::before { content:""; position:absolute; top:-5px; left:calc(50% - 5px); width:10px; height:10px; border-radius:50%; background:#67d7ff; box-shadow:0 0 0 2px rgba(240,201,129,.2),0 0 18px rgba(103,215,255,.9); pointer-events:none; }
    .orbit::after { content:none; display:none; }
    .orbit-one { border-style:solid !important; animation:orbitSpinOne 22s linear infinite; }
    .orbit-two { border-style:dashed !important; border-color:rgba(155,124,255,.45) !important; animation:orbitSpinTwo 30s linear infinite reverse; }

    /* Lower sections: same gold + cyan + violet palette as the portrait frame. */
    .experience-card, .why-card, .skill-list span, .work-placeholder { transition: border-color .3s, box-shadow .3s, transform .3s, background .3s; }
    .experience-card:hover { border-color:rgba(103,215,255,.42); box-shadow:inset 0 3px 0 rgba(103,215,255,.7); }
    .experience-card:nth-child(2):hover { border-color:rgba(155,124,255,.45); box-shadow:inset 0 3px 0 rgba(155,124,255,.7); }
    .experience-card li::before { background:#67d7ff; box-shadow:0 0 8px rgba(103,215,255,.65); }
    .company, .section-label { color:#f0c981 !important; }
    .why-card { position:relative; overflow:hidden; }
    .why-card::after { content:""; position:absolute; width:90px; height:90px; border:1px solid rgba(103,215,255,.18); border-radius:50%; right:-35px; bottom:-35px; }
    .why-card:nth-child(2)::after { border-color:rgba(155,124,255,.2); }
    .why-card:nth-child(3)::after { border-color:rgba(240,201,129,.22); }
    .why-card:hover { transform:translateY(-4px); box-shadow:0 14px 35px rgba(0,0,0,.2), inset 0 3px 0 rgba(103,215,255,.65); }
    .why-card:nth-child(2):hover { box-shadow:0 14px 35px rgba(0,0,0,.2), inset 0 3px 0 rgba(155,124,255,.7); }
    .why-card:nth-child(3):hover { box-shadow:0 14px 35px rgba(0,0,0,.2), inset 0 3px 0 rgba(240,201,129,.75); }
    .skill-list span:nth-child(3n+1) { border-color:rgba(103,215,255,.35); }
    .skill-list span:nth-child(3n+2) { border-color:rgba(155,124,255,.35); }
    .skill-list span:nth-child(3n) { border-color:rgba(240,201,129,.35); }
    .skill-list span:hover { border-color:#67d7ff !important; color:#9ee8ff !important; background:rgba(103,215,255,.07) !important; box-shadow:0 0 18px rgba(103,215,255,.1); }
    .work-placeholder { background:linear-gradient(105deg,#11141a,#0d0f14) !important; border-color:rgba(103,215,255,.25); }
    .work-placeholder::before { border-color:rgba(103,215,255,.2); }
    .work-placeholder::after { border-color:rgba(155,124,255,.2); }
    .play-icon { border-color:#67d7ff !important; color:#9ee8ff !important; box-shadow:0 0 22px rgba(103,215,255,.15); }
    .scan-line { background:linear-gradient(90deg,transparent,#67d7ff,#9b7cff,transparent) !important; }
    .contact { background:linear-gradient(135deg,#d6a45c 0%,#f0c981 42%,#67d7ff 100%) !important; }
    .contact-glow { border-color:rgba(15,25,35,.2) !important; }
    .contact-links a:hover { border-color:#67d7ff !important; }

    /* Hero text + labels: warm champagne palette pulled from the portrait's tie and skin tones. */
    .hero-copy .hero-kicker {
      color:#f0c981 !important;
      text-shadow:0 0 18px rgba(240,201,129,.18);
      letter-spacing:.12em;
    }
    .hero-copy h1 {
      color:#f2f0e9 !important;
      text-shadow:0 8px 28px rgba(0,0,0,.28);
    }
    .hero-copy h1 em {
      color:#f0c981 !important;
      background:linear-gradient(110deg,#d6a45c 0%,#f0c981 48%,#fff1d0 100%);
      -webkit-background-clip:text;
      background-clip:text;
      -webkit-text-fill-color:transparent;
      text-shadow:none;
    }
    .hero-copy .hero-summary {
      color:#d9d4cc !important;
    }
    .portrait-label {
      background:rgba(8,10,14,.88) !important;
      color:#fff1d0 !important;
      border:1px solid rgba(240,201,129,.72) !important;
      box-shadow:0 8px 26px rgba(0,0,0,.28),0 0 18px rgba(240,201,129,.10);
      backdrop-filter:blur(6px);
    }
    .portrait-label strong { color:#f0c981 !important; }
    .audio-lines i {
      background:linear-gradient(to top,#d6a45c,#fff1d0) !important;
      box-shadow:0 0 8px rgba(240,201,129,.28);
    }

    @keyframes portraitTilt { 0%,100% { transform:rotate(-5deg) scale(1); } 50% { transform:rotate(5deg) scale(1.015); } }
    @keyframes portraitRingSpin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }
    @keyframes orbitSpinOne { from { transform:translateZ(0) rotate(0deg); } to { transform:translateZ(0) rotate(360deg); } }
    @keyframes orbitSpinTwo { from { transform:translateZ(0) rotate(30deg); } to { transform:translateZ(0) rotate(390deg); } }
    .grain { opacity:.025; }
    @media (max-width:760px) {
      .grain { display:none; }
      .orbit-one { animation-duration:28s; }
      .orbit-two { animation-duration:36s; }
      .orbit::before { width:8px; height:8px; top:-4px; left:calc(50% - 4px); }
    }
    @media (prefers-reduced-motion:reduce) { .portrait-frame,.portrait-frame::before,.orbit-one,.orbit-two { animation:none; } }
  `;
  document.head.appendChild(style);
})();
