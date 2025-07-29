const slides = document.querySelectorAll(".hero-slide");
const indicators = document.querySelectorAll(".indicator");
const headline = document.getElementById("headline");
const subheadline = document.getElementById("subheadline");

let currentSlide = 0;
let slideInterval;

const slideContent = [
  {
    headline: "Transform Your Developer Career",
    subheadline:
      "Join a thriving community of developers who learn, grow, and succeed together. Connect with like-minded professionals and accelerate your tech journey.",
  },
  {
    headline: "Master Modern Technologies",
    subheadline:
      "Stay ahead with cutting-edge skills in web development, mobile apps, and emerging technologies. Learn from industry experts and hands-on projects.",
  },
  {
    headline: "Build Real-World Projects",
    subheadline:
      "Apply your knowledge through collaborative coding sessions and portfolio-building workshops. Create applications that showcase your expertise.",
  },
  {
    headline: "Network with Industry Leaders",
    subheadline:
      "Connect with experienced developers, tech entrepreneurs, and hiring managers. Expand your professional network and discover new opportunities.",
  },
  {
    headline: "Launch Your Tech Career",
    subheadline:
      "Get job-ready with interview preparation, resume reviews, and career guidance. Turn your passion for coding into a successful career.",
  },
];

function updateContent(index) {
  const content = slideContent[index];

  // Fade out current content
  headline.classList.add("content-fade-out");
  subheadline.classList.add("content-fade-out");

  // Update content after fade out
  setTimeout(() => {
    headline.textContent = content.headline;
    subheadline.textContent = content.subheadline;

    // Fade in new content
    headline.classList.remove("content-fade-out");
    subheadline.classList.remove("content-fade-out");
  }, 400);
}

function goToSlide(index) {
  // Remove active class from current slide and indicator
  slides[currentSlide].classList.remove("active");
  indicators[currentSlide].classList.remove("active");

  // Add active class to new slide and indicator
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  indicators[currentSlide].classList.add("active");

  // Update content
  updateContent(currentSlide);
}

function nextSlide() {
  const next = (currentSlide + 1) % slides.length;
  goToSlide(next);
}

function startSlideshow() {
  slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideshow() {
  clearInterval(slideInterval);
}

// Add click event listeners to indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    goToSlide(index);
    stopSlideshow();
    startSlideshow(); // Restart the interval
  });
});

// Pause slideshow on hover
const heroSection = document.querySelector(".hero-section");
heroSection.addEventListener("mouseenter", stopSlideshow);
heroSection.addEventListener("mouseleave", startSlideshow);

// Handle visibility change (pause when tab is not active)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    stopSlideshow();
  } else {
    startSlideshow();
  }
});

// Start the slideshow
startSlideshow();

// CTA section
document
  .getElementById("newsletterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;

    if (firstName && lastName && email) {
      const submitBtn = document.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Subscribing...";
      submitBtn.disabled = true;

      // Simulate API call
      setTimeout(() => {
        submitBtn.textContent = "Subscribed! ✓";
        submitBtn.style.background =
          "linear-gradient(135deg, var(--color-success) 0%, var(--color-success-light) 100%)";

        // Reset form
        setTimeout(() => {
          document.getElementById("newsletterForm").reset();
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
        }, 2000);
      }, 1000);
    }
  });

// Add floating animation on scroll
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const elements = document.querySelectorAll(".floating-element");

  elements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
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