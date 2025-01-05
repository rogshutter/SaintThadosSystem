const toggle = document.getElementById("dark-mode-toggle");
toggle.addEventListener("change", () => {
  document.documentElement.classList.toggle("dark");
});
