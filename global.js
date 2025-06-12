// Sidebar collapse/expand (handles both desktop and mobile)
document.addEventListener("DOMContentLoaded", function () {
  // Your sidebar toggle code here

  const sidebar = document.getElementById("sidebar");
  const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
  let collapsed = false;

  function toggleSidebar() {
    if (window.innerWidth <= 800) {
      // On mobile: toggle the .open class to slide sidebar in/out
      sidebar.classList.toggle("open");
    } else {
      // On desktop: toggle the .collapsed class to shrink/expand sidebar
      collapsed = !collapsed;
      sidebar.classList.toggle("collapsed", collapsed);
    }
  }
  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener("click", toggleSidebar);
  }
});
// Dropdowns
document
  .querySelectorAll(".sidebar-menu-item[data-dropdown]")
  .forEach((item) => {
    item.addEventListener("click", function (e) {
      // Prevent parent link navigation
      e.preventDefault();
      const key = item.getAttribute("data-dropdown");
      item.classList.toggle("open");
      document
        .querySelectorAll(`.sidebar-dropdown[data-dropdown-list="${key}"]`)
        .forEach((drop) => {
          drop.style.maxHeight = drop.style.maxHeight
            ? null
            : drop.scrollHeight + "px";
          drop.classList.toggle("open");
        });
    });
  });

// Responsive sidebar for mobile (optional, but helpful)
function checkMobileSidebar() {
  if (window.innerWidth <= 800) {
    sidebar.classList.remove("collapsed");
    // Do not remove .open here—it is handled by the toggle
  } else {
    sidebar.classList.remove("open");
  }
}
window.addEventListener("resize", checkMobileSidebar);
checkMobileSidebar();

// Close sidebar on outside click (mobile)
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 800 && sidebar.classList.contains("open")) {
    if (
      !sidebar.contains(e.target) &&
      !e.target.closest(".sidebar-toggle-btn")
    ) {
      sidebar.classList.remove("open");
    }
  }
});

// Dark mode toggle
const darkModeToggleBtn = document.querySelector(
  '.topbar-action-btn[aria-label="Dark mode"]'
);
const lightModeToggleBtn = document.querySelector(
  '.topbar-action-btn[aria-label="Light mode"]'
);

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDark);
  // Optional: Swap icons if you want to show only one at a time
  if (isDark) {
    darkModeToggleBtn.style.display = "none";
    lightModeToggleBtn.style.display = "";
  } else {
    darkModeToggleBtn.style.display = "";
    lightModeToggleBtn.style.display = "none";
  }
}

// Initialize dark mode from localStorage
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  darkModeToggleBtn.style.display = "none";
  lightModeToggleBtn.style.display = "";
} else {
  darkModeToggleBtn.style.display = "";
  lightModeToggleBtn.style.display = "none";
}

darkModeToggleBtn.addEventListener("click", toggleDarkMode);
lightModeToggleBtn.addEventListener("click", toggleDarkMode);

// Profile dropdown toggle
const profileDropdownBtn = document.getElementById("profileDropdownBtn");
const profileDropdown = document.getElementById("profileDropdown");

profileDropdownBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  profileDropdown.classList.toggle("show");
  profileDropdownBtn.classList.toggle("show-arrow"); // Toggle arrow class
});

// Close dropdown when clicking outside
document.addEventListener("click", function (e) {
  if (
    !profileDropdownBtn.contains(e.target) &&
    !profileDropdown.contains(e.target)
  ) {
    profileDropdown.classList.remove("show");
    profileDropdownBtn.classList.remove("show-arrow"); // Remove arrow class
  }
});
