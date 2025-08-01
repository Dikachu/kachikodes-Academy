// Toggle menu visibility on small screens
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", function () {
      sidebar.classList.toggle("active");

      if (sidebar.classList.contains("active")) {
        // console.log("Side bar showing");
        document.getElementById("main-content").classList.add("overlay");
        // menuToggle.style.transform = "rotate(180deg)"
        // document.body.style.overflowY = 'hidden'
      } else {
        // console.log("Side bar not showing ");
        document.getElementById("main-content").classList.remove("overlay");
        // menuToggle.style.transform = ""
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
    notifications: document.getElementById("notifications-content"),
    quiz: document.getElementById("quiz-content"),
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
        document.getElementById("main-content").classList.remove("overlay");
        menuToggle.style.transform = "";
        // document.body.style.overflowY = ''
        // overlay.classList.remove("active");
      }
    });
  });

  // Initialize calendar
  // new Calendar();

  // Initialize calendar when DOM is loaded
  let calendar;
  calendar = new KachikodesCalendar();

  // Export calendar instance for external access
  window.calendar = calendar;


  //   Profile Scripts
  let isEditMode = false;

  // Initialize placeholder on load
  // updateLanguage()
});

// Utilitis

// class Calendar {
//   constructor() {
//     this.currentDate = new Date();
//     this.events = {
//       "2025-07-15": {
//         type: "class",
//         name: "Web Development",
//         time: "9:00 AM",
//         instructor: "John Doe",
//         description: "Introduction to HTML tags and their uses",
//       },
//       "2025-07-18": {
//         type: "class",
//         name: "JavaScript Fundamentals",
//         time: "10:30 AM",
//         instructor: "Sarah Wilson",
//         description: "Basic JavaScript concepts and DOM manipulation",
//       },
//       "2025-07-20": {
//         type: "assignment",
//         name: "CSS Project",
//         time: "11:59 PM",
//         instructor: "Jane Smith",
//         description: "Submit your CSS styling project",
//       },
//       "2025-07-22": {
//         type: "class",
//         name: "React Basics",
//         time: "2:00 PM",
//         instructor: "Mike Johnson",
//         description: "Introduction to React components and state",
//       },
//       "2025-07-25": {
//         type: "meeting",
//         name: "General Meeting",
//         time: "1:00 PM",
//         instructor: "Admin",
//         description: "Monthly general meeting for all students",
//       },
//       "2025-07-28": {
//         type: "assignment",
//         name: "JavaScript Quiz",
//         time: "11:59 PM",
//         instructor: "Sarah Wilson",
//         description: "Complete online JavaScript fundamentals quiz",
//       },
//       "2025-07-30": {
//         type: "class",
//         name: "Database Design",
//         time: "9:00 AM",
//         instructor: "David Chen",
//         description: "Introduction to database design principles",
//       },
//     };
//     this.init();
//   }

//   init() {
//     this.renderCalendar();
//     this.bindEvents();
//   }

//   bindEvents() {
//     document
//       .getElementById("prevMonth")
//       .addEventListener("click", () => this.previousMonth());
//     document
//       .getElementById("nextMonth")
//       .addEventListener("click", () => this.nextMonth());
//     document
//       .getElementById("addEventBtn")
//       .addEventListener("click", () => this.openModal());
//     document
//       .getElementById("closeModal")
//       .addEventListener("click", () => this.closeModal());
//     document
//       .getElementById("cancelBtn")
//       .addEventListener("click", () => this.closeModal());
//     document
//       .getElementById("eventForm")
//       .addEventListener("submit", (e) => this.addEvent(e));

//     // Color option selection
//     document.querySelectorAll(".color-option").forEach((option) => {
//       option.addEventListener("click", () => {
//         document
//           .querySelectorAll(".color-option")
//           .forEach((opt) => opt.classList.remove("selected"));
//         option.classList.add("selected");
//       });
//     });

//     // Modal close on backdrop click
//     document.getElementById("eventModal").addEventListener("click", (e) => {
//       if (e.target.id === "eventModal") {
//         this.closeModal();
//       }
//     });
//   }

//   renderCalendar() {
//     const monthYear = document.getElementById("monthYear");
//     const calendarDays = document.getElementById("calendarDays");

//     const year = this.currentDate.getFullYear();
//     const month = this.currentDate.getMonth();

//     monthYear.textContent = `${this.currentDate.toLocaleString("default", {
//       month: "long",
//     })}, ${year}`;

//     calendarDays.innerHTML = "";

//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const startDate = new Date(firstDay);
//     startDate.setDate(startDate.getDate() - firstDay.getDay());

//     const today = new Date();
//     const todayString = today.toISOString().split("T")[0];

//     for (let i = 0; i < 42; i++) {
//       const date = new Date(startDate);
//       date.setDate(startDate.getDate() + i);

//       const dayCell = document.createElement("div");
//       dayCell.className = "day-cell";

//       const dayNumber = document.createElement("div");
//       dayNumber.className = "day-number";
//       dayNumber.textContent = date.getDate();

//       if (date.getMonth() !== month) {
//         dayCell.classList.add("other-month");
//       }

//       const dateString = date.toISOString().split("T")[0];

//       if (dateString === todayString) {
//         dayCell.classList.add("today");
//       }

//       dayCell.appendChild(dayNumber);

//       // Add event if exists
//       if (this.events[dateString]) {
//         const event = this.events[dateString];

//         const indicator = document.createElement("div");
//         indicator.className = `event-indicator ${event.type}`;
//         dayCell.appendChild(indicator);

//         const eventText = document.createElement("div");
//         eventText.className = `event-text ${event.type}`;
//         eventText.textContent = `${
//           event.type === "class"
//             ? "Class"
//             : event.type === "meeting"
//             ? "Meeting"
//             : "Due"
//         } - ${event.time}`;
//         dayCell.appendChild(eventText);

//         this.addTooltip(dayCell, event);
//       }

//       calendarDays.appendChild(dayCell);
//     }
//   }

//   addTooltip(element, event) {
//     const tooltip = document.getElementById("tooltip");

//     element.addEventListener("mouseenter", (e) => {
//       const typeLabel =
//         event.type === "class"
//           ? "Class"
//           : event.type === "meeting"
//           ? "Meeting"
//           : "Assignment";
//       tooltip.innerHTML = `
//                         <strong>${typeLabel} - ${event.time}</strong><br>
//                         ${
//                           event.instructor
//                             ? `Instructor: ${event.instructor}<br>`
//                             : ""
//                         }
//                         ${event.description}
//                     `;

//       const rect = element.getBoundingClientRect();
//       tooltip.style.left = `${rect.left + window.scrollX}px`;
//       tooltip.style.top = `${
//         rect.top + window.scrollY - tooltip.offsetHeight - 10
//       }px`;

//       tooltip.classList.add("show");
//     });

//     element.addEventListener("mouseleave", () => {
//       tooltip.classList.remove("show");
//     });
//   }

//   previousMonth() {
//     this.currentDate.setMonth(this.currentDate.getMonth() - 1);
//     this.renderCalendar();
//   }

//   nextMonth() {
//     this.currentDate.setMonth(this.currentDate.getMonth() + 1);
//     this.renderCalendar();
//   }

//   openModal() {
//     const modal = document.getElementById("eventModal");
//     modal.classList.add("show");

//     // Set default date to today or selected date
//     const today = new Date();
//     const defaultDate = today.toISOString().split("T")[0];
//     document.getElementById("eventDate").value = defaultDate;

//     // Focus on the first input
//     setTimeout(() => {
//       document.getElementById("eventName").focus();
//     }, 100);
//   }

//   closeModal() {
//     document.getElementById("eventModal").classList.remove("show");
//     document.getElementById("eventForm").reset();
//     document
//       .querySelectorAll(".color-option")
//       .forEach((opt) => opt.classList.remove("selected"));
//     document.querySelector(".color-option.class").classList.add("selected");
//   }

//   addEvent(e) {
//     e.preventDefault();

//     const eventData = {
//       name: document.getElementById("eventName").value,
//       date: document.getElementById("eventDate").value,
//       time: document.getElementById("eventTime").value,
//       instructor: document.getElementById("eventInstructor").value || "TBD",
//       description:
//         document.getElementById("eventDescription").value ||
//         "No description provided",
//       type: document.querySelector(".color-option.selected").dataset.type,
//     };

//     // Format time to 12-hour format
//     const timeFormatted = new Date(
//       `2000-01-01T${eventData.time}`
//     ).toLocaleString("en-US", {
//       hour: "numeric",
//       minute: "2-digit",
//       hour12: true,
//     });

//     this.events[eventData.date] = {
//       type: eventData.type,
//       name: eventData.name,
//       time: timeFormatted,
//       instructor: eventData.instructor,
//       description: eventData.description,
//     };

//     // Re-render calendar to show new event
//     this.renderCalendar();
//     this.closeModal();

//     // Show success message (optional)
//     console.log("Event added successfully:", eventData);
//   }
// }

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

// Show Course Outline
const courseOutline = `
<h4 class="modal-title">JavaScript Fundamentals Course Outline</h4>
<div class="course-outline">
    <div class="progress-summary">
        <div class="progress-text">Course Progress: 4 of 10 topics completed</div>
        <div class="progress-bar">
            <div class="progress-fill" style="width: 40%"></div>
        </div>
    </div>
    <div class="timeline">
        <div class="timeline-item">
            <div class="timeline-checkpoint completed">
                <svg class="checkmark completed" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div class="timeline-content completed">
                <h6 class="topic-title completed">HTML Elements & Structure</h6>
                <p class="topic-description">Understanding basic HTML structure, DOCTYPE, html,
                    head, and body elements</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-checkpoint completed">
                <svg class="checkmark completed" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div class="timeline-content completed">
                <h6 class="topic-title completed">Text Formatting Tags</h6>
                <p class="topic-description">Working with headings, paragraphs, bold, italic,
                    and other text formatting elements</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-checkpoint completed">
                <svg class="checkmark completed" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div class="timeline-content completed">
                <h6 class="topic-title completed">Links & Navigation</h6>
                <p class="topic-description">Creating hyperlinks, anchor tags, and navigation
                    menus</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-checkpoint completed">
                <svg class="checkmark completed" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div class="timeline-content completed">
                <h6 class="topic-title completed">Images & Media</h6>
                <p class="topic-description">Embedding images, videos, and other media content
                    with proper attributes</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-checkpoint pending">
                <svg class="checkmark pending" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div class="timeline-content">
                <h6 class="topic-title">Lists & Organization</h6>
                <p class="topic-description">Creating ordered and unordered lists, definition
                    lists, and nested structures</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-checkpoint pending">
                <svg class="checkmark pending" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div class="timeline-content">
                <h6 class="topic-title">Tables & Data</h6>
                <p class="topic-description">Building tables for data presentation with proper
                    headers and structure</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-checkpoint pending">
                <svg class="checkmark pending" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div class="timeline-content">
                <h6 class="topic-title">Forms & Input Elements</h6>
                <p class="topic-description">Creating interactive forms with input fields,
                    buttons, and validation</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-checkpoint pending">
                <svg class="checkmark pending" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div class="timeline-content">
                <h6 class="topic-title">Semantic HTML5</h6>
                <p class="topic-description">Using modern HTML5 semantic elements for better
                    structure and accessibility</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-checkpoint pending">
                <svg class="checkmark pending" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div class="timeline-content">
                <h6 class="topic-title">Meta Tags & SEO</h6>
                <p class="topic-description">Optimizing HTML for search engines and social media
                    sharing</p>
            </div>
        </div>

        <div class="timeline-item">
            <div class="timeline-checkpoint pending">
                <svg class="checkmark pending" viewBox="0 0 24 24">
                    <path d="M20 6L9 17l-5-5" />
                </svg>
            </div>
            <div class="timeline-content">
                <h6 class="topic-title">Best Practices & Accessibility</h6>
                <p class="topic-description">Writing clean, accessible HTML code following
                    modern standards</p>
            </div>
        </div>
    </div>
</div>
`;

const viewCourseOutlineBtn = document.querySelectorAll(
  ".view-course-outline-btn"
);
// console.log(viewCourseOutlineBtn);

if (viewCourseOutlineBtn) {
  viewCourseOutlineBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      // console.log('clicked');

      openModal(courseOutline);
    });
  });
}

// Show Assignment details
const assignmentDetails = `
<h4 class="modal-title">Submit Assignment</h4>
<div class="assignment-modal-body">
  <div class="instructions">
    <h6>Assignment Instructions</h6>
    <p id="assignmentInstructions">
      Create a responsive personal portfolio website using HTML and CSS. Include sections for about, projects, skills, and contact information. Use modern CSS techniques like flexbox and grid.
    </p>
  </div>

  <div class="submission-tabs">
    <button class="tab-btn active" onclick="switchTab('file')">File Upload</button>
    <button class="tab-btn" onclick="switchTab('code')">Code Editor</button>
    <button class="tab-btn" onclick="switchTab('github')">GitHub Submission</button>
  </div>

  <div id="fileTab" class="tab-content active">
    <div class="file-upload" ondrop="dropHandler(event)" ondragover="dragOverHandler(event)" ondragleave="dragLeaveHandler(event)" onclick="document.getElementById('fileInput').click()">
        <div class="file-upload-icon">📁</div>
        <h6>Drop files here or click to browse</h6>
        <p>Supported formats: PDF, ZIP, HTML, CSS, JS</p>
        <input type="file" id="fileInput" multiple accept=".pdf,.zip,.html,.css,.js" style="display: none;" onchange="handleFiles(this.files)">
    </div>
    <div id="fileList" class="file-list"></div>
  </div>

  <div id="codeTab" class="tab-content">
      <div class="code-editor">
          <div class="editor-header">
              <span>Code Editor</span>
              <select class="language-select" id="languageSelect" onchange="updateLanguage()">
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="javascript">JavaScript</option>
              </select>
          </div>
          <textarea class="code-textarea" id="codeTextarea" placeholder="Write your code here..."></textarea>
      </div>
  </div>

  <div id="githubTab" class="tab-content">
      <div class="form-group">
          <label for="repoUrl">GitHub Repository URL:</label>
          <input type="url" id="repoUrl" placeholder="https://github.com/username/repository">
          <div class="github-links">
              <a href="#" class="github-btn" id="viewRepoBtn" target="_blank" style="display: none;">
                  🔗 View Repository
              </a>
          </div>
      </div>
      <div class="form-group">
          <label for="pagesUrl">GitHub Pages URL (if applicable):</label>
          <input type="url" id="pagesUrl" placeholder="https://username.github.io/repository">
          <div class="github-links">
              <a href="#" class="github-btn" id="viewLiveBtn" target="_blank" style="display: none;">
                  🌐 View Live Demo
              </a>
          </div>
      </div>
  </div>

  <button class="submit-btn" onclick="submitAssignment()">Submit Assignment</button>
  <div id="successMessage" class="success-message">
      Assignment submitted successfully! ✅
  </div>
</div>
`;

const viewAssignmentDetailsBtn = document.querySelectorAll(
  ".view-assignment-btn"
);
// console.log(viewAssignmentDetailsBtn);

if (viewAssignmentDetailsBtn) {
  viewAssignmentDetailsBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      // console.log('clicked');

      openModal(assignmentDetails);
    });
  });
}

function switchTab(tabName) {
  // Update tab buttons
  document
    .querySelectorAll(".tab-btn")
    .forEach((btn) => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Update tab content
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));
  document.getElementById(tabName + "Tab").classList.add("active");
}

// File upload functionality
function dragOverHandler(event) {
  event.preventDefault();
  event.currentTarget.classList.add("dragover");
}

function dragLeaveHandler(event) {
  event.currentTarget.classList.remove("dragover");
}

function dropHandler(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("dragover");
  const files = event.dataTransfer.files;
  handleFiles(files);
}

function handleFiles(files) {
  Array.from(files).forEach((file) => {
    if (isValidFileType(file)) {
      uploadedFiles.push(file);
      addFileToList(file);
    } else {
      alert(
        `File type ${file.type} is not supported. Please upload PDF, ZIP, HTML, CSS, or JS files.`
      );
    }
  });
}

function isValidFileType(file) {
  const validTypes = [
    "application/pdf",
    "application/zip",
    "application/x-zip-compressed",
    "text/html",
    "text/css",
    "text/javascript",
    "application/javascript",
  ];
  const validExtensions = [".pdf", ".zip", ".html", ".css", ".js"];

  return (
    validTypes.includes(file.type) ||
    validExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))
  );
}

function addFileToList(file) {
  const fileList = document.getElementById("fileList");
  const fileItem = document.createElement("div");
  fileItem.className = "file-item";
  fileItem.innerHTML = `
                <span>${file.name} (${formatFileSize(file.size)})</span>
                <button class="remove-file" onclick="removeFile('${
                  file.name
                }')">Remove</button>
            `;
  fileList.appendChild(fileItem);
}

function removeFile(fileName) {
  uploadedFiles = uploadedFiles.filter((file) => file.name !== fileName);
  renderFileList();
}

function renderFileList() {
  const fileList = document.getElementById("fileList");
  fileList.innerHTML = "";
  uploadedFiles.forEach((file) => addFileToList(file));
}

function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// Code editor functionality
function updateLanguage() {
  const language = document.getElementById("languageSelect").value;
  const textarea = document.getElementById("codeTextarea");

  // Update placeholder based on language
  const placeholders = {
    html: "<!DOCTYPE html>\n<html>\n<head>\n    <title>My Page</title>\n</head>\n<body>\n    <!-- Your HTML here -->\n</body>\n</html>",
    css: "/* Your CSS styles here */\nbody {\n    font-family: Arial, sans-serif;\n    margin: 0;\n    padding: 20px;\n}",
    javascript:
      '// Your JavaScript code here\nfunction myFunction() {\n    console.log("Hello, World!");\n}\n\nmyFunction();',
  };

  if (!textarea.value) {
    textarea.placeholder = placeholders[language] || "Write your code here...";
  }
}

// GitHub integration
function updateGitHubLinks() {
  const repoUrl = document.getElementById("repoUrl").value;
  const pagesUrl = document.getElementById("pagesUrl").value;
  const viewRepoBtn = document.getElementById("viewRepoBtn");
  const viewLiveBtn = document.getElementById("viewLiveBtn");

  // Update repository link
  if (repoUrl && isValidGitHubUrl(repoUrl)) {
    viewRepoBtn.href = repoUrl;
    viewRepoBtn.style.display = "inline-flex";
  } else {
    viewRepoBtn.style.display = "none";
  }

  // Update live demo link
  if (pagesUrl && isValidUrl(pagesUrl)) {
    viewLiveBtn.href = pagesUrl;
    viewLiveBtn.style.display = "inline-flex";
  } else {
    viewLiveBtn.style.display = "none";
  }
}

function isValidGitHubUrl(url) {
  const githubPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/;
  return githubPattern.test(url);
}

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Submit assignment
function submitAssignment() {
  const activeTab = document.querySelector(".tab-content.active").id;
  let submissionData = {
    // assignmentId: currentAssignment.id,
    submissionType: activeTab.replace("Tab", ""),
    timestamp: new Date().toISOString(),
  };

  // Validate submission based on active tab
  let isValid = false;

  switch (activeTab) {
    case "fileTab":
      if (uploadedFiles.length > 0) {
        submissionData.files = uploadedFiles.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        }));
        isValid = true;
      } else {
        alert("Please upload at least one file.");
      }
      break;

    case "codeTab":
      const code = document.getElementById("codeTextarea").value.trim();
      const language = document.getElementById("languageSelect").value;
      if (code) {
        submissionData.code = code;
        submissionData.language = language;
        isValid = true;
      } else {
        alert("Please enter your code.");
      }
      break;

    case "githubTab":
      const repoUrl = document.getElementById("repoUrl").value.trim();
      const pagesUrl = document.getElementById("pagesUrl").value.trim();
      if (repoUrl && isValidGitHubUrl(repoUrl)) {
        submissionData.repository = repoUrl;
        if (pagesUrl && isValidUrl(pagesUrl)) {
          submissionData.liveDemo = pagesUrl;
        }
        isValid = true;
      } else {
        alert("Please enter a valid GitHub repository URL.");
      }
      break;
  }

  if (isValid) {
    // Simulate submission process
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.textContent = "Submitting...";
    submitBtn.disabled = true;

    setTimeout(() => {
      // Update assignment status
      // const assignment = assignments.find(a => a.id === currentAssignment.id);
      // if (assignment) {
      //   assignment.status = 'submitted';
      //   assignment.submittedDate = new Date().toISOString().split('T')[0];
      // }

      // Show success message
      document.getElementById("successMessage").style.display = "block";

      // Reset button
      submitBtn.textContent = "Submit Assignment";
      submitBtn.disabled = false;

      // Auto-close modal after 2 seconds
      setTimeout(() => {
        closeModal();
      }, 2000);

      console.log("Assignment submitted:", submissionData);
    }, 1500);
  }
}

// function closeModal() {
//   document.getElementById("modal").classList.remove("show");
//   resetForm();
// }

function resetForm() {
  uploadedFiles = [];
  document.getElementById("fileList").innerHTML = "";
  document.getElementById("codeTextarea").value = "";
  document.getElementById("repoUrl").value = "";
  document.getElementById("pagesUrl").value = "";
  document.getElementById("successMessage").style.display = "none";
  updateGitHubLinks();
}

// Show Assignment details
const notificationDetails = `
<div class="modal-body-sub-header">
  <h4 class="modal-title">New Grade: Python Basics Assignment #3</h4>
  <div class="notification-meta">
    <span><i class="fas fa-clock"></i> 5 minutes ago</span>
    <span><i class="fas fa-user"></i> Dr. Sarah Johnson</span>
    <span><i class="fas fa-book"></i> Python Basics</span>
  </div>
</div>
<p>
  Congratulations! Your Python Basics Assignment #3 has been graded.
  <br> <br>
  Score: 95/100
  <br> <br>
  Feedback: Excellent work on implementing the data structures. Your code is clean and well-commented. Minor improvement needed in error handling for edge cases.
  <br> <br>
  Keep up the great work!
</p>
`;

const notificationDetailsBtn = document.querySelectorAll(
  ".view-notification-btn"
);
// console.log(notificationDetailsBtn);

if (notificationDetailsBtn) {
  notificationDetailsBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      // console.log('clicked');

      openModal(notificationDetails);
    });
  });
}

// Quiz View Script
const startQuizBtn = document.querySelectorAll(".start-quiz-btn");
// console.log(startQuizBtn);

if (startQuizBtn) {
  startQuizBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      // console.log('clicked');

      viewQuiz();
    });
  });
}

function viewQuiz() {
  document.getElementById("available-quiz").style.display = "none";
  document.getElementById("quiz-header").style.display = "none";
  document.getElementById("quiz-view").style.display = "block";
}

class KachikodesCalendar {
  constructor() {
    this.currentDate = new Date();
    this.today = new Date();
    this.selectedDate = null;
    this.events = this.generateSampleEvents();
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.populateYearSelector();
    this.renderCalendar();
    this.renderUpcomingEvents();
  }

  generateSampleEvents() {
    const events = [];
    const eventTypes = ["assignment", "live-class", "quiz", "holiday"];
    const courses = [
      "JavaScript Fundamentals",
      "React Development",
      "Node.js Backend",
      "Web Design",
      "Data Structures",
    ];

    // Generate events for the next 3 months
    for (let i = 0; i < 50; i++) {
      const randomDate = new Date();
      randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 90));

      const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const course = courses[Math.floor(Math.random() * courses.length)];

      const eventTitles = {
        assignment: [
          `${course} - Assignment ${Math.floor(Math.random() * 5) + 1}`,
          `Project Submission - ${course}`,
          `Homework Due - ${course}`,
        ],
        "live-class": [
          `Live Session: ${course}`,
          `Interactive Workshop: ${course}`,
          `Q&A Session: ${course}`,
        ],
        quiz: [
          `Quiz: ${course}`,
          `Assessment - ${course}`,
          `Weekly Test: ${course}`,
        ],
        holiday: [
          "Platform Maintenance",
          "Public Holiday",
          "Academy Break",
          "System Update",
        ],
      };

      const titles = eventTitles[type];
      const title = titles[Math.floor(Math.random() * titles.length)];

      const startHour = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
      const duration =
        type === "live-class" ? 120 : Math.floor(Math.random() * 90) + 30;

      events.push({
        id: i + 1,
        title: title,
        type: type,
        date: randomDate.toISOString().split("T")[0],
        time: `${startHour.toString().padStart(2, "0")}:00`,
        endTime: `${Math.floor((startHour * 60 + duration) / 60)
          .toString()
          .padStart(2, "0")}:${((startHour * 60 + duration) % 60)
          .toString()
          .padStart(2, "0")}`,
        duration: `${duration} minutes`,
        course: type === "holiday" ? "N/A" : course,
        location:
          type === "live-class" ? "Virtual Classroom" : "Online Platform",
        description: this.generateEventDescription(type, title),
        link:
          type === "holiday"
            ? null
            : "https://academy.kachikodes.com/class/" + (i + 1),
        timezone: "WAT (West Africa Time)",
      });
    }

    return events.sort(
      (a, b) =>
        new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time)
    );
  }

  generateEventDescription(type, title) {
    const descriptions = {
      assignment: `Complete the assigned tasks and submit your work through the platform. Make sure to review the requirements carefully before submission.`,
      "live-class": `Join the interactive live session where we'll cover new concepts and answer your questions. Don't forget to prepare any questions you might have.`,
      quiz: `Test your understanding of the recent topics covered in class. The quiz will be available for a limited time, so make sure to complete it on time.`,
      holiday: `The platform will be under maintenance or it's a scheduled break. Check back later for normal operations.`,
    };
    return descriptions[type];
  }

  setupEventListeners() {
    // Navigation buttons
    document
      .getElementById("prevMonth")
      .addEventListener("click", () => this.previousMonth());
    document
      .getElementById("nextMonth")
      .addEventListener("click", () => this.nextMonth());
    document
      .getElementById("todayBtn")
      .addEventListener("click", () => this.goToToday());

    // Month/Year selectors
    document.getElementById("monthSelector").addEventListener("change", (e) => {
      this.currentDate.setMonth(parseInt(e.target.value));
      this.renderCalendar();
    });

    document.getElementById("yearSelector").addEventListener("change", (e) => {
      this.currentDate.setFullYear(parseInt(e.target.value));
      this.renderCalendar();
    });

    // Modal controls
    document
      .getElementById("closeModal")
      .addEventListener("click", () => this.closeModal());
    document.getElementById("modal").addEventListener("click", (e) => {
      if (e.target.id === "modal") this.closeModal();
    });

    // Touch gestures for mobile
    const calendarGrid = document.getElementById("calendarGrid");
    calendarGrid.addEventListener("touchstart", (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    });

    calendarGrid.addEventListener("touchend", (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") this.closeModal();
      if (e.key === "ArrowLeft") this.previousMonth();
      if (e.key === "ArrowRight") this.nextMonth();
    });
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextMonth();
      } else {
        this.previousMonth();
      }
    }
  }

  populateYearSelector() {
    const yearSelector = document.getElementById("yearSelector");
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year <= currentYear + 5; year++) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      if (year === currentYear) option.selected = true;
      yearSelector.appendChild(option);
    }
  }

  renderCalendar() {
    const calendarGrid = document.getElementById("calendarGrid");
    const monthYearDisplay = document.getElementById("monthYearDisplay");
    const monthSelector = document.getElementById("monthSelector");
    const yearSelector = document.getElementById("yearSelector");

    // Update displays
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    monthYearDisplay.textContent = `${
      monthNames[this.currentDate.getMonth()]
    } ${this.currentDate.getFullYear()}`;
    monthSelector.value = this.currentDate.getMonth();
    yearSelector.value = this.currentDate.getFullYear();

    // Clear existing calendar days (keep headers)
    const existingDays = calendarGrid.querySelectorAll(".calendar-day");
    existingDays.forEach((day) => day.remove());

    // Get first day of month and number of days
    const firstDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDay = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    // Add previous month's days
    const prevMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      0
    );
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const dayElement = this.createDayElement(prevMonth.getDate() - i, true);
      calendarGrid.appendChild(dayElement);
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = this.createDayElement(day, false);
      calendarGrid.appendChild(dayElement);
    }

    // Add next month's days
    const totalCells = calendarGrid.children.length - 7; // Subtract header cells
    const remainingCells = 42 - totalCells; // 6 rows × 7 days = 42
    for (let day = 1; day <= remainingCells; day++) {
      const dayElement = this.createDayElement(day, true);
      calendarGrid.appendChild(dayElement);
    }
  }

  createDayElement(dayNumber, isOtherMonth) {
    const dayElement = document.createElement("div");
    dayElement.className = "calendar-day";

    if (isOtherMonth) {
      dayElement.classList.add("other-month");
    }

    // Check if this is today
    const dayDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      dayNumber
    );
    if (!isOtherMonth && dayDate.toDateString() === this.today.toDateString()) {
      dayElement.classList.add("today");
    }

    const dayNumberElement = document.createElement("div");
    dayNumberElement.className = "day-number";
    dayNumberElement.textContent = dayNumber;
    dayElement.appendChild(dayNumberElement);

    // Add events for this day
    const dayEvents = this.getEventsForDay(dayDate);
    const eventIndicators = document.createElement("div");

    dayEvents.forEach((event) => {
      const indicator = document.createElement("span");
      indicator.className = `event-indicator event-${event.type}`;
      indicator.title = event.title;
      eventIndicators.appendChild(indicator);
    });

    dayElement.appendChild(eventIndicators);

    // Add click listener for events
    if (dayEvents.length > 0) {
      dayElement.style.cursor = "pointer";
      dayElement.addEventListener("click", () => 
        this.showEventDetails(dayEvents[0])
      );
    }

    return dayElement;
  }

  getEventsForDay(date) {
    const dateString = date.toISOString().split("T")[0];
    return this.events.filter((event) => event.date === dateString);
  }

  // showDayEvents(date, events) {
  //   if (events.length === 1) {
  //     this.showEventDetails(events[0]);
  //   } else {
  //     // Show multiple events for the day
  //     this.showMultipleEvents(date, events);
  //   }
  // }

//   showMultipleEvents(date, events) {
//     const modal = document.getElementById("modal");
//     const modalBody = document.getElementById("modal-body");

//     let modalTitle = `Events for ${date.toLocaleDateString("en-GB")}`;

//     let content = '<div style="display: grid; gap: 1rem;">';

//     events.forEach((event) => {
//       content += `
//                 <div class="event-item ${ event.type }" onclick="calendar.showEventDetails(calendar.events.find(e => e.id === ${ event.id }))" style="margin: 0; cursor: pointer;">
//                   <div class="event-icon ${event.type}">
//                     ${this.getEventIcon(event.type)}
//                   </div>
//                   <div class="event-details">
//                     <h6>${event.title}</h6>
//                     <div class="event-meta">${event.time} - ${ event.course }</div>
//                   </div>
//                 </div>
// `;
//     });
//     content += "</div>";

//     modalBody.innerHTML = content;
//     modal.style.display = "block";
//   }

  showEventDetails(event) {
    // console.log(event);
    
    const modal = document.getElementById("modal");
    const modalBody = document.getElementById("modal-body");

    // modalTitle.textContent = jsxs;

    const eventDate = new Date(event.date + "T" + event.time);

    modalBody.innerHTML = `
                  <h4 class="modal-title">${event.title}</h4>
                  <div class="calendar-modal-body">
                    <div class="detail-row">
                        <div class="detail-label">Type</div>
                        <div class="detail-value">
                            <span class="event-type-badge badge-${event.type}">
                                ${this.getEventTypeLabel(event.type)}
                            </span>
                        </div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Date</div>
                        <div class="detail-value">${eventDate.toLocaleDateString(
                          "en-GB"
                        )}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Time</div>
                        <div class="detail-value">${event.time} - ${ event.endTime } (${event.timezone})</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Duration</div>
                        <div class="detail-value">${event.duration}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Course</div>
                        <div class="detail-value">${event.course}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Location</div>
                        <div class="detail-value">${event.location}</div>
                    </div>
                    <div class="detail-row">
                        <div class="detail-label">Description</div>
                        <div class="detail-value">${event.description}</div>
                    </div>
                    ${ event.link ? `
                    <div class="detail-row">
                        <div class="detail-label">Link</div>
                        <div class="detail-value">
                            <a href="${event.link}" target="_blank" style="color: var(--color-primary); text-decoration: none;">
                                ${event.link}
                            </a>
                        </div>
                    </div>
                    `: "" }
                  </div>
                `;

    modal.classList.add('show');
  }

  getEventTypeLabel(type) {
    const labels = {
      assignment: "Assignment",
      "live-class": "Live Class",
      quiz: "Quiz",
      holiday: "Holiday",
    };
    return labels[type] || type;
  }

  getEventIcon(type) {
    const icons = {
      assignment: "📝",
      "live-class": "🎥",
      quiz: "📊",
      holiday: "🏖️",
    };
    return icons[type] || "📅";
  }

  renderUpcomingEvents() {
    const upcomingEventsContainer = document.getElementById("upcomingEvents");
    const now = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(now.getDate() + 14);

    const upcomingEvents = this.events
      .filter((event) => {
        const eventDate = new Date(event.date + "T" + event.time);
        return eventDate >= now && eventDate <= twoWeeksFromNow;
      })
      .slice(0, 10); // Show max 10 events

    if (upcomingEvents.length === 0) {
      upcomingEventsContainer.innerHTML = `
                        <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                            <div style="font-size: 3rem; margin-bottom: 1rem;">📅</div>
                            <p>No upcoming events in the next 14 days</p>
                        </div>
                    `;
      return;
    }

    upcomingEventsContainer.innerHTML = upcomingEvents
      .map((event) => {
        const eventDate = new Date(event.date + "T" + event.time);
        const isToday = eventDate.toDateString() === now.toDateString();
        const isTomorrow =
          eventDate.toDateString() ===
          new Date(now.getTime() + 24 * 60 * 60 * 1000).toDateString();

        let dateDisplay;
        if (isToday) {
          dateDisplay = "Today";
        } else if (isTomorrow) {
          dateDisplay = "Tomorrow";
        } else {
          dateDisplay = eventDate.toLocaleDateString("en-GB");
        }

        return `
                        <div class="event-item ${
                          event.type
                        }" onclick="calendar.showEventDetails(calendar.events.find(e => e.id === ${
          event.id
        }))">
                            <div class="event-icon ${event.type}">
                                ${this.getEventIcon(event.type)}
                            </div>
                            <div class="event-details">
                                <h6>${event.title}</h6>
                                <div class="event-meta">
                                    ${dateDisplay} at ${event.time} • ${
          event.course
        }
                                </div>
                            </div>
                        </div>
                    `;
      })
      .join("");
  }

  closeModal() {
    document.getElementById("modal").classList.remove('show');
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.renderCalendar();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.renderCalendar();
  }

  goToToday() {
    this.currentDate = new Date();
    this.renderCalendar();
  }
}

// Add some additional utility functions
function formatTimeToAMPM(time24) {
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
}
