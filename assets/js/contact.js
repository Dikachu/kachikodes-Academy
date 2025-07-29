// Add smooth scrolling for any anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(".info-card, .faq-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});

function toggleFAQ(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector(".faq-icon");

  // Close all other FAQs
  document.querySelectorAll(".faq-question").forEach((q) => {
    if (q !== element) {
      q.classList.remove("active");
      q.nextElementSibling.classList.remove("active");
      q.querySelector(".faq-icon").textContent = "+";
    }
  });

  // Toggle current FAQ
  element.classList.toggle("active");
  answer.classList.toggle("active");

  if (element.classList.contains("active")) {
    icon.textContent = "−";
  } else {
    icon.textContent = "+";
  }
}
