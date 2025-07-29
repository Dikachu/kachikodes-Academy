// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Set current year in footer
document.getElementById("footer-year").textContent = new Date().getFullYear();

// Show/hide scroll to top button
window.addEventListener("scroll", function () {
  const scrollButton = document.querySelector(".scroll-to-top");
  if (window.pageYOffset > 300) {
    scrollButton.classList.add("visible");
  } else {
    scrollButton.classList.remove("visible");
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
