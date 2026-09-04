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
})();
