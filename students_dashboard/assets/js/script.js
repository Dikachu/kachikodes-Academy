// Toggle menu visibility on small screens
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");

      if (sidebar.classList.contains('active')) {
        // console.log("Side bar showing");
        document.getElementById('main-content').classList.add('overlay')
        menuToggle.style.transform = "rotate(180deg)"
        // document.body.style.overflowY = 'hidden'
      }else {
        // console.log("Side bar not showing ");
        document.getElementById('main-content').classList.remove('overlay')
        menuToggle.style.transform = ""
        // document.body.style.overflowY = ''
      }
    });
  }

  // Toggle Courses Content
  const courseItems = document.querySelectorAll(".course-item-card");
  // console.log('Course Items:', courseItems);

  if (courseItems.length > 0) {
    courseItems.forEach((item) => {
      const viewCourse = item.querySelector(".course-view");

      // console.log('View Course Button:', viewCourse);
      viewCourse.addEventListener("click", function () {
        item.classList.toggle("active");
      });
    });
  }

  // Navigation
  const navLinks = document.querySelectorAll(".nav-link");
  const contentSections = {
    dashboard: document.getElementById("dashboard-content"),
    courses: document.getElementById("courses-content"),
    assignments: document.getElementById("assignments-content"),
    progress: document.getElementById("progress-content"),
    calendar: document.getElementById("calendar-content"),
    chat: document.getElementById("chat-content"),
    profile: document.getElementById("profile-content"),
  };

  const headerTitle = document.querySelector(".header-title");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const section = link.getAttribute("data-section");

      // Update active nav link
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");

      // Show corresponding content
      Object.keys(contentSections).forEach((key) => {
        if (key === section) {
          contentSections[key].style.display = "block";
        } else {
          contentSections[key].style.display = "none";
        }
      });

      // Update header title
      // headerTitle.textContent = section.charAt(0).toUpperCase() + section.slice(1);

      // Close mobile menu if open
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active");
        document.getElementById('main-content').classList.remove('overlay')
        menuToggle.style.transform = ""
        // document.body.style.overflowY = ''
        // overlay.classList.remove("active");
      }
    });
  });

  // Initialize calendar
  new Calendar();


    //   Profile Scripts
    let isEditMode = false;


});

// Utilitis

class Calendar {
  constructor() {
    this.currentDate = new Date();
    this.events = {
      "2025-07-15": {
        type: "class",
        name: "Web Development",
        time: "9:00 AM",
        instructor: "John Doe",
        description: "Introduction to HTML tags and their uses",
      },
      "2025-07-18": {
        type: "class",
        name: "JavaScript Fundamentals",
        time: "10:30 AM",
        instructor: "Sarah Wilson",
        description: "Basic JavaScript concepts and DOM manipulation",
      },
      "2025-07-20": {
        type: "assignment",
        name: "CSS Project",
        time: "11:59 PM",
        instructor: "Jane Smith",
        description: "Submit your CSS styling project",
      },
      "2025-07-22": {
        type: "class",
        name: "React Basics",
        time: "2:00 PM",
        instructor: "Mike Johnson",
        description: "Introduction to React components and state",
      },
      "2025-07-25": {
        type: "meeting",
        name: "General Meeting",
        time: "1:00 PM",
        instructor: "Admin",
        description: "Monthly general meeting for all students",
      },
      "2025-07-28": {
        type: "assignment",
        name: "JavaScript Quiz",
        time: "11:59 PM",
        instructor: "Sarah Wilson",
        description: "Complete online JavaScript fundamentals quiz",
      },
      "2025-07-30": {
        type: "class",
        name: "Database Design",
        time: "9:00 AM",
        instructor: "David Chen",
        description: "Introduction to database design principles",
      },
    };
    this.init();
  }

  init() {
    this.renderCalendar();
    this.bindEvents();
  }

  bindEvents() {
    document
      .getElementById("prevMonth")
      .addEventListener("click", () => this.previousMonth());
    document
      .getElementById("nextMonth")
      .addEventListener("click", () => this.nextMonth());
    document
      .getElementById("addEventBtn")
      .addEventListener("click", () => this.openModal());
    document
      .getElementById("closeModal")
      .addEventListener("click", () => this.closeModal());
    document
      .getElementById("cancelBtn")
      .addEventListener("click", () => this.closeModal());
    document
      .getElementById("eventForm")
      .addEventListener("submit", (e) => this.addEvent(e));

    // Color option selection
    document.querySelectorAll(".color-option").forEach((option) => {
      option.addEventListener("click", () => {
        document
          .querySelectorAll(".color-option")
          .forEach((opt) => opt.classList.remove("selected"));
        option.classList.add("selected");
      });
    });

    // Modal close on backdrop click
    document.getElementById("eventModal").addEventListener("click", (e) => {
      if (e.target.id === "eventModal") {
        this.closeModal();
      }
    });
  }

  renderCalendar() {
    const monthYear = document.getElementById("monthYear");
    const calendarDays = document.getElementById("calendarDays");

    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    monthYear.textContent = `${this.currentDate.toLocaleString("default", {
      month: "long",
    })}, ${year}`;

    calendarDays.innerHTML = "";

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const dayCell = document.createElement("div");
      dayCell.className = "day-cell";

      const dayNumber = document.createElement("div");
      dayNumber.className = "day-number";
      dayNumber.textContent = date.getDate();

      if (date.getMonth() !== month) {
        dayCell.classList.add("other-month");
      }

      const dateString = date.toISOString().split("T")[0];

      if (dateString === todayString) {
        dayCell.classList.add("today");
      }

      dayCell.appendChild(dayNumber);

      // Add event if exists
      if (this.events[dateString]) {
        const event = this.events[dateString];

        const indicator = document.createElement("div");
        indicator.className = `event-indicator ${event.type}`;
        dayCell.appendChild(indicator);

        const eventText = document.createElement("div");
        eventText.className = `event-text ${event.type}`;
        eventText.textContent = `${
          event.type === "class"
            ? "Class"
            : event.type === "meeting"
            ? "Meeting"
            : "Due"
        } - ${event.time}`;
        dayCell.appendChild(eventText);

        this.addTooltip(dayCell, event);
      }

      calendarDays.appendChild(dayCell);
    }
  }

  addTooltip(element, event) {
    const tooltip = document.getElementById("tooltip");

    element.addEventListener("mouseenter", (e) => {
      const typeLabel =
        event.type === "class"
          ? "Class"
          : event.type === "meeting"
          ? "Meeting"
          : "Assignment";
      tooltip.innerHTML = `
                        <strong>${typeLabel} - ${event.time}</strong><br>
                        ${
                          event.instructor
                            ? `Instructor: ${event.instructor}<br>`
                            : ""
                        }
                        ${event.description}
                    `;

      const rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${
        rect.top + window.scrollY - tooltip.offsetHeight - 10
      }px`;

      tooltip.classList.add("show");
    });

    element.addEventListener("mouseleave", () => {
      tooltip.classList.remove("show");
    });
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  openModal() {
    const modal = document.getElementById("eventModal");
    modal.classList.add("show");

    // Set default date to today or selected date
    const today = new Date();
    const defaultDate = today.toISOString().split("T")[0];
    document.getElementById("eventDate").value = defaultDate;

    // Focus on the first input
    setTimeout(() => {
      document.getElementById("eventName").focus();
    }, 100);
  }

  closeModal() {
    document.getElementById("eventModal").classList.remove("show");
    document.getElementById("eventForm").reset();
    document
      .querySelectorAll(".color-option")
      .forEach((opt) => opt.classList.remove("selected"));
    document.querySelector(".color-option.class").classList.add("selected");
  }

  addEvent(e) {
    e.preventDefault();

    const eventData = {
      name: document.getElementById("eventName").value,
      date: document.getElementById("eventDate").value,
      time: document.getElementById("eventTime").value,
      instructor: document.getElementById("eventInstructor").value || "TBD",
      description:
        document.getElementById("eventDescription").value ||
        "No description provided",
      type: document.querySelector(".color-option.selected").dataset.type,
    };

    // Format time to 12-hour format
    const timeFormatted = new Date(
      `2000-01-01T${eventData.time}`
    ).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    this.events[eventData.date] = {
      type: eventData.type,
      name: eventData.name,
      time: timeFormatted,
      instructor: eventData.instructor,
      description: eventData.description,
    };

    // Re-render calendar to show new event
    this.renderCalendar();
    this.closeModal();

    // Show success message (optional)
    console.log("Event added successfully:", eventData);
  }
}

let isEditMode = false;

function toggleEdit() {
  isEditMode = !isEditMode;
  const editIcon = document.getElementById("editIcon");
  const editActions = document.getElementById("editActions");

  // Toggle between edit and view modes
  const editableFields = [
    { value: "firstName", input: "firstNameInput" },
    { value: "lastName", input: "lastNameInput" },
    { value: "email", input: "emailInput" },
    { value: "phone", input: "phoneInput" },
    { value: "username", input: "usernameInput" },
    { value: "dob", input: "dobInput" },
  ];

  if (isEditMode) {
    editIcon.className = "fas fa-times";
    editActions.classList.add("active");

    editableFields.forEach((field) => {
      document.getElementById(field.value).classList.add("hidden");
      document.getElementById(field.input).classList.remove("hidden");
    });
  } else {
    editIcon.className = "fas fa-edit";
    editActions.classList.remove("active");

    editableFields.forEach((field) => {
      document.getElementById(field.value).classList.remove("hidden");
      document.getElementById(field.input).classList.add("hidden");
    });
  }
}

function saveChanges() {
  // Get updated values
  const firstName = document.getElementById("firstNameInput").value;
  const lastName = document.getElementById("lastNameInput").value;
  const email = document.getElementById("emailInput").value;
  const phone = document.getElementById("phoneInput").value;
  const username = document.getElementById("usernameInput").value;
  const dob = document.getElementById("dobInput").value;

  // Update display values
  document.getElementById("firstName").textContent = firstName;
  document.getElementById("lastName").textContent = lastName;
  document.getElementById("email").textContent = email;
  document.getElementById("phone").textContent = phone;
  document.getElementById("username").textContent = username;

  // Update full name
  document.getElementById(
    "studentName"
  ).textContent = `${firstName} ${lastName}`;

  // Format and update date of birth
  if (dob) {
    const dateObj = new Date(dob);
    const formattedDate = dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    document.getElementById("dob").textContent = formattedDate;
  }

  // Exit edit mode
  toggleEdit();

  // Show success message (you can customize this)
  alert("Profile updated successfully!");
}

function cancelEdit() {
  // Reset input values to original display values
  document.getElementById("firstNameInput").value =
    document.getElementById("firstName").textContent;
  document.getElementById("lastNameInput").value =
    document.getElementById("lastName").textContent;
  document.getElementById("emailInput").value =
    document.getElementById("email").textContent;
  document.getElementById("phoneInput").value =
    document.getElementById("phone").textContent;
  document.getElementById("usernameInput").value =
    document.getElementById("username").textContent;

  // Exit edit mode
  toggleEdit();
}

function changeProfileImage() {
  // Create a file input element
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";

  fileInput.onchange = function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profileImage").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger file selection
  fileInput.click();
}

function copyReferralCode() {
  const referralCode = document.querySelector(".referral-text").textContent;

  // Copy to clipboard
  navigator.clipboard
    .writeText(referralCode)
    .then(function () {
      // Change button icon temporarily to show success
      const copyBtn = document.querySelector(".copy-btn i");
      const originalClass = copyBtn.className;
      copyBtn.className = "fas fa-check";

      setTimeout(function () {
        copyBtn.className = originalClass;
      }, 1500);
    })
    .catch(function () {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = referralCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      alert("Referral code copied to clipboard!");
    });
}
