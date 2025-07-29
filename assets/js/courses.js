function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto";
}

function enrollCourse(courseId) {
  alert("Redirecting to enrollment page...");
  // Here you would typically redirect to your enrollment/payment page
  // window.location.href = `/enroll/${courseId}`;
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modals = document.getElementsByClassName("modal");
  for (let i = 0; i < modals.length; i++) {
    if (event.target === modals[i]) {
      modals[i].style.display = "none";
      document.body.style.overflow = "auto";
    }
  }
};

// Close modal with Escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    const modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
      if (modals[i].style.display === "block") {
        modals[i].style.display = "none";
        document.body.style.overflow = "auto";
      }
    }
  }
});

// Add smooth scrolling animation on load
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".category-section");
  sections.forEach((section, index) => {
    section.style.animationDelay = `${index * 0.2}s`;
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