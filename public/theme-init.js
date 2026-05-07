(function () {
  var t = localStorage.getItem("sr-theme") || "system";
  document.documentElement.setAttribute("data-theme", t);
  if (t === "light") {
    document.documentElement.classList.add("light-mode");
  } else if (t === "system") {
    if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.classList.add("light-mode");
    }
  }
})();
