// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 10) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const toggle = document.querySelector(".mobile-menu-toggle");

  mobileMenu.classList.toggle("open");
  toggle.classList.toggle("active");
}

// Profile dropdown toggle
function toggleProfileDropdown() {
  const dropdown = document.getElementById("profileDropdown");
  const menu = document.getElementById("dropdownMenu");

  dropdown.classList.toggle("open");
  menu.classList.toggle("open");
}

// Close dropdown when clicking outside
document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("profileDropdown");
  const menu = document.getElementById("dropdownMenu");

  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove("open");
    if (menu) menu.classList.remove("open");
  }
});

// Close mobile menu when clicking nav links
document.querySelectorAll(".mobile-nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    const mobileMenu = document.getElementById("mobileMenu");
    const toggle = document.querySelector(".mobile-menu-toggle");

    mobileMenu.classList.remove("open");
    toggle.classList.remove("active");
  });
});

// Add active class to current nav link (desktop & mobile)
(function () {
  // Get current page filename
  var path = window.location.pathname.split("/").pop() || "index.html";
  

  // Desktop nav
  document.querySelectorAll(".nav-link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Mobile nav
  document.querySelectorAll(".mobile-nav-link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === path) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
})();
