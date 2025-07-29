const filterSectionInputs = [
  ...document.querySelectorAll('.filter-section input[type="checkbox"]'),
];
// console.log(filterSectionInputs);
// console.log(window.screen.width);
// console.log('1024');
// console.log(1024);

if (window.screen.width <= 1024) {
  // console.log('Anything');

  filterSectionInputs.forEach((input) => {
    input.addEventListener("click", () => {
      // console.log(input);

      document.querySelector(".sidebar").classList.remove("active");
    });
  });

  document.querySelector(".clear-filters").addEventListener("click", () => {
    document.querySelector(".sidebar").classList.remove("active");
  });
}

// Sample data - in a real application, this would come from an API
const resources = [
  {
    id: 1,
    title: "Complete React Tutorial for Beginners",
    description:
      "Learn React from scratch with hands-on examples and projects. Perfect for beginners starting their frontend journey.",
    type: "video",
    category: "frontend",
    difficulty: "beginner",
    duration: "45 min",
    tags: ["React", "JavaScript", "Frontend"],
    videoURL: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    created: "2024-01-15",
  },
  {
    id: 2,
    title: "Node.js Best Practices Guide",
    description:
      "Comprehensive PDF guide covering Node.js best practices, security, and performance optimization.",
    type: "pdf",
    category: "backend",
    difficulty: "intermediate",
    pages: "128",
    tags: ["Node.js", "Backend", "Security"],
    pdfUrl: "https://example.com/nodejs-guide.pdf",
    created: "2024-01-10",
  },
  {
    id: 3,
    title: "Building a Full-Stack E-commerce App",
    description:
      "Complete tutorial series for building a modern e-commerce application with React and Node.js.",
    type: "zip",
    category: "fullstack",
    difficulty: "advanced",
    duration: "8 hours",
    tags: ["React", "Node.js", "MongoDB", "E-commerce"],
    zipUrl: "https://example.com/ecommerce-zip",
    created: "2024-01-20",
  },
  {
    id: 4,
    title: "JavaScript Array Methods Cheat Sheet",
    description:
      "Quick reference for all JavaScript array methods with examples and use cases.",
    type: "code",
    category: "frontend",
    difficulty: "beginner",
    duration: "15 min",
    tags: ["JavaScript", "Arrays", "Cheat Sheet"],
    codeSnippet: "const arr = [1, 2, 3];\narr.map(x => x * 2);",
    created: "2024-01-05",
  },
  {
    id: 5,
    title: "Todo App with React Hooks",
    description:
      "Build a complete todo application using React hooks and local storage.",
    type: "project",
    category: "frontend",
    difficulty: "intermediate",
    duration: "3 hours",
    tags: ["React", "Hooks", "Project"],
    projectUrl: "https://github.com/example/todo-app",
    created: "2024-01-25",
  },
  {
    id: 6,
    title: "JavaScript Fundamentals Quiz",
    description:
      "Test your knowledge of JavaScript basics with this interactive quiz.",
    type: "quiz",
    category: "frontend",
    difficulty: "beginner",
    duration: "20 min",
    tags: ["JavaScript", "Quiz", "Assessment"],
    quizUrl: "https://example.com/js-quiz",
    created: "2024-01-12",
  },
  {
    id: 7,
    title: "Express.js Documentation",
    description: "Official Express.js documentation and API reference.",
    type: "link",
    category: "backend",
    difficulty: "intermediate",
    duration: "Variable",
    tags: ["Express.js", "Documentation", "API"],
    externalUrl: "https://expressjs.com/",
    created: "2024-01-08",
  },
  {
    id: 8,
    title: "Advanced CSS Animations",
    description:
      "Master CSS animations and transitions with practical examples and techniques.",
    type: "video",
    category: "frontend",
    difficulty: "advanced",
    duration: "1 hour",
    tags: ["CSS", "Animations", "Frontend"],
    videoURL: "dQw4w9WgXcQ",
    created: "2024-01-18",
  },
  {
    id: 9,
    title: "Vue.js Component Guide",
    description: "Comprehensive guide to building reusable Vue.js components.",
    type: "pdf",
    category: "frameworks",
    difficulty: "intermediate",
    duration: "1.5 hours",
    tags: ["Vue.js", "Components", "Framework"],
    pdfUrl: "https://example.com/vue-components.pdf",
    created: "2024-01-22",
  },
  {
    id: 10,
    title: "REST API Design Principles",
    description: "Learn the fundamental principles of designing RESTful APIs.",
    type: "zip",
    category: "backend",
    difficulty: "intermediate",
    duration: "2 hours",
    tags: ["REST", "API", "Design"],
    zipUrl: "https://example.com/rest-api-guide",
    created: "2024-01-14",
  },
];

let filteredResources = [...resources];
let currentFilters = {
  search: "",
  categories: [],
  types: [],
  difficulties: [],
};

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  renderResources();
  setupEventListeners();
});

function setupEventListeners() {
  // Search functionality
  document
    .getElementById("searchInput")
    .addEventListener("input", handleSearch);

  // Filter checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("change", handleFilterChange);
  });

  // Sort dropdown
  document.getElementById("sortSelect").addEventListener("change", handleSort);

  // Modal close on outside click
  document
    .getElementById("previewModal")
    .addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal();
      }
    });
}

function handleSearch(e) {
  currentFilters.search = e.target.value.toLowerCase();
  applyFilters();
}

function handleFilterChange(e) {
  const filterType = e.target.closest(".filter-group").id;
  const value = e.target.value;

  if (filterType === "categoryFilters") {
    if (e.target.checked) {
      currentFilters.categories.push(value);
    } else {
      currentFilters.categories = currentFilters.categories.filter(
        (c) => c !== value
      );
    }
  } else if (filterType === "typeFilters") {
    if (e.target.checked) {
      currentFilters.types.push(value);
    } else {
      currentFilters.types = currentFilters.types.filter((t) => t !== value);
    }
  } else if (filterType === "difficultyFilters") {
    if (e.target.checked) {
      currentFilters.difficulties.push(value);
    } else {
      currentFilters.difficulties = currentFilters.difficulties.filter(
        (d) => d !== value
      );
    }
  }

  applyFilters();
}

function applyFilters() {
  filteredResources = resources.filter((resource) => {
    // Search filter
    if (
      currentFilters.search &&
      !resource.title.toLowerCase().includes(currentFilters.search) &&
      !resource.description.toLowerCase().includes(currentFilters.search) &&
      !resource.tags.some((tag) =>
        tag.toLowerCase().includes(currentFilters.search)
      )
    ) {
      return false;
    }

    // Category filter
    if (
      currentFilters.categories.length > 0 &&
      !currentFilters.categories.includes(resource.category)
    ) {
      return false;
    }

    // Type filter
    if (
      currentFilters.types.length > 0 &&
      !currentFilters.types.includes(resource.type)
    ) {
      return false;
    }

    // Difficulty filter
    if (
      currentFilters.difficulties.length > 0 &&
      !currentFilters.difficulties.includes(resource.difficulty)
    ) {
      return false;
    }

    return true;
  });

  renderResources();
}

function handleSort(e) {
  const sortBy = e.target.value;

  filteredResources.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created) - new Date(a.created);
      case "oldest":
        return new Date(a.created) - new Date(b.created);
      case "title":
        return a.title.localeCompare(b.title);
      case "difficulty":
        const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case "duration":
        return parseDuration(a.duration) - parseDuration(b.duration);
      default:
        return 0;
    }
  });

  renderResources();
}

function parseDuration(duration) {
  const match = duration.match(/(\d+(?:\.\d+)?)\s*(min|hour|hours)/i);
  if (!match) return 0;

  const value = parseFloat(match[1]);
  const unit = match[2].toLowerCase();

  return unit.startsWith("hour") ? value * 60 : value;
}

function renderResources() {
  const grid = document.getElementById("resourceGrid");
  const resultsCount = document.getElementById("resultsCount");
  const noResults = document.getElementById("noResults");

  resultsCount.textContent = `${filteredResources.length} resource${
    filteredResources.length !== 1 ? "s" : ""
  } found`;

  if (filteredResources.length === 0) {
    grid.style.display = "none";
    noResults.style.display = "block";
    return;
  }

  grid.style.display = "grid";
  noResults.style.display = "none";

  grid.innerHTML = filteredResources
    .map((resource) => createResourceCard(resource))
    .join("");
}

function createResourceCard(resource) {
  const iconMap = {
    video: "▶️",
    pdf: "📄",
    zip: "📚",
    code: "💻",
    project: "🚀",
    quiz: "❓",
    link: "🔗",
  };

  const typeColorMap = {
    video: "card-type-video",
    pdf: "card-type-pdf",
    zip: "card-type-tutorial",
    code: "card-type-code",
    project: "card-type-project",
    quiz: "card-type-quiz",
    link: "card-type-link",
  };

  const difficultyClass = `difficulty-${resource.difficulty}`;
  const typeClass = typeColorMap[resource.type];
  const icon = iconMap[resource.type];

  // let specificContent = '';
  let primaryAction = "";
  let secondaryAction = "";

  switch (resource.type) {
    case "video":
      primaryAction = `<button class="btn btn-primary btn-sm" onclick="playVideo('${resource.videoURL}')">▶️ Watch Video</button>`;
      break;

    case "pdf":
      primaryAction = `<button class="btn btn-primary btn-sm" onclick="previewPDF('${resource.id}')">📄 Preview PDF</button>`;
      secondaryAction = `<button class="btn btn-outline btn-sm" onclick="downloadPDF('${resource.pdfUrl}')">⬇️ Download</button>`;
      break;

    case "zip":
      primaryAction = `<button class="btn btn-primary btn-sm" onclick="openTutorial('${resource.zipUrl}')">📚 Download Zip</button>`;
      break;

    case "code":
      primaryAction = `<button class="btn btn-primary btn-sm" onclick="viewCode('${resource.id}')">💻 View Code</button>`;
      secondaryAction = `<button class="btn btn-outline btn-sm" onclick="copyCode('${resource.codeSnippet}')">📋 Copy</button>`;
      break;

    case "project":
      primaryAction = `<button class="btn btn-primary btn-sm" onclick="viewProject('${resource.projectUrl}')">🚀 View Project</button>`;
      break;

    case "quiz":
      primaryAction = `<button class="btn btn-primary btn-sm" onclick="startQuiz('${resource.quizUrl}')">❓ Take Quiz</button>`;
      break;

    case "link":
      primaryAction = `<button class="btn btn-primary btn-sm" onclick="openLink('${resource.externalUrl}')">🔗 Visit Link</button>`;

      break;
  }

  return `
                <div class="resource-card" data-id="${resource.id}">
                    <div class="card-header">
                        <div class="card-type-badge ${typeClass}">${resource.type.toUpperCase()}</div>
                        <div class="card-image">
                            <img src="assets/images/class-room-1.avif" alt="">
                            <div class="card-image-overlay" onclick="playVideo('${
                              resource.videoURL
                            }')">
                                ${icon}
                            </div>
                        </div>
                        <h6 class="card-title">${resource.title}</h6>
                        <p class="card-description">${resource.description}</p>
                        <div class="card-meta">
                            <div class="meta-item">
                                <span class="difficulty-badge ${difficultyClass}">${
    resource.difficulty
  }</span>
                            </div>
                            <div class="meta-item">
                                ⏱️ ${resource.duration}
                            </div>
                            <div class="meta-item">
                                📂 ${resource.category}
                            </div>
                        </div>
                        <div class="card-tags">
                            ${resource.tags
                              .map((tag) => `<span class="tag">${tag}</span>`)
                              .join("")}
                        </div>
                    </div>
                    <div class="card-actions">
                        ${primaryAction}
                        ${secondaryAction}
                    </div>
                </div>
            `;
}

function clearAllFilters() {
  // Clear search
  document.getElementById("searchInput").value = "";

  // Clear all checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Reset filters
  currentFilters = {
    search: "",
    categories: [],
    types: [],
    difficulties: [],
  };

  // Reset sort
  document.getElementById("sortSelect").value = "newest";

  // Apply filters
  applyFilters();
}

// Resource action handlers
function playVideo(videoURL) {
  const modal = document.getElementById("previewModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = "Video Player";
  modalBody.innerHTML = `
                <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
                    <iframe 
                        src="https://www.youtube.com/embed/${videoURL}" 
                        frameborder="0" 
                        allowfullscreen
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                    </iframe>
                </div>
            `;

  modal.style.display = "block";
}

function previewPDF(resourceId) {
  const resource = resources.find((r) => r.id == resourceId);
  const modal = document.getElementById("previewModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = `PDF Preview - ${resource.title}`;
  modalBody.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div style="font-size: 48px; margin-bottom: 20px;">📄</div>
                    <h5>${resource.title}</h5>
                    <p style="color: var(--color-text-secondary); margin-bottom: 20px;">
                        PDF preview would be displayed here in a real application
                    </p>
                    <button class="btn btn-primary btn-sm" onclick="downloadPDF('${resource.pdfUrl}')">
                        ⬇️ Download PDF
                    </button>
                </div>
            `;

  modal.style.display = "block";
}

function downloadPDF(url) {
  // In a real application, this would trigger a download
  alert("PDF download would start here: " + url);
}

function openTutorial(url) {
  window.open(url, "_blank");
}

function viewCode(resourceId) {
  const resource = resources.find((r) => r.id == resourceId);
  const modal = document.getElementById("previewModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = `Code Snippet - ${resource.title}`;
  modalBody.innerHTML = `
                <div style="background: var(--color-bg-secondary); padding: 20px; border-radius: 8px; font-family: var(--font-family-mono);">
                    <pre style="margin: 0; overflow-x: auto;"><code>${resource.codeSnippet}</code></pre>
                </div>
                <div style="margin-top: 20px;">
                    <button class="btn btn-primary btn-sm" onclick="copyCode('${resource.codeSnippet}')">
                        📋 Copy Code
                    </button>
                </div>
            `;

  modal.style.display = "block";
}

function copyCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    alert("Code copied to clipboard!");
  });
}

function viewProject(url) {
  window.open(url, "_blank");
}

function startQuiz(url) {
  window.open(url, "_blank");
}

function openLink(url) {
  window.open(url, "_blank");
}

function closeModal() {
  document.getElementById("previewModal").style.display = "none";
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

// Initialize page
renderResources();
