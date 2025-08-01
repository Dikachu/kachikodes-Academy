function enrollCourse(courseId) {
  alert("Redirecting to enrollment page...");
  // Here you would typically redirect to your enrollment/payment page
  // window.location.href = `/enroll/${courseId}`;
}

const modalBody = `
<h4 class="modal-title">Complete React.js Mastery</h4>
<div class="modal-price">
  <div class="old-price">
    <span class="currency">$</span><s>999</s>
  </div>
  <div class="new-price">
    <span class="currency">$</span>99
  </div>
</div>
<p class="modal-description">
  Master React.js from the ground up with hands-on projects. Learn hooks, context API, state management, and build real-world applications that employers love.
</p>
<div class="modal-features">
  <h2>What You'll Learn:</h2>
  <ul class="feature-list">
    <li>React fundamentals and JSX</li>
    <li>Component lifecycle and hooks</li>
    <li>State management with Redux</li>
    <li>React Router for navigation</li>
    <li>API integration and data fetching</li>
    <li>Testing with Jest and React Testing Library</li>
    <li>Deployment strategies</li>
  </ul>
</div>
<button class="enroll-btn" onclick="enrollCourse('react-course')">Enroll Now</button>
`;

const viewCourseDetailsBtn = document.querySelectorAll(".view-course-btn");
// console.log(viewCourseDetailsBtn);

if (viewCourseDetailsBtn) {
  viewCourseDetailsBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      // console.log('clicked');
      
      openModal(modalBody);
    });
  });
}


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
