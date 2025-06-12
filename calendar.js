// ==== Calendar Data and Utilities ====
const months = [
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

let events = [
  { title: "Event Conf.", date: "2025-06-01", type: "conf" },
  { title: "Seminar #4", date: "2025-06-07", type: "seminar" },
  { title: "Seminar #4", date: "2025-06-08", type: "seminar" },
  {
    title: "4p Meeting #5",
    date: "2025-06-09",
    time: "16:00",
    type: "meeting",
  },
  { title: "Seminar #6", date: "2025-06-11", type: "seminar" },
  {
    title: "10:30a Meeting",
    date: "2025-06-12",
    time: "10:30",
    type: "meeting",
  },
  {
    title: "12p Meetup #",
    date: "2025-06-12",
    time: "12:00",
    type: "meeting",
  },
  {
    title: "2:30p Submissi",
    date: "2025-06-12",
    time: "14:30",
    type: "time",
  },
  {
    title: "7a Attend ever",
    date: "2025-06-13",
    time: "07:00",
    type: "meeting",
  },
  {
    title: "4p Submission",
    date: "2025-06-16",
    time: "16:00",
    type: "time",
  },
  { title: "Project submissi", date: "2025-06-28", type: "project" },
];

// ==== Calendar State ====
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentView = "month"; // month, week, day
let selectedDay = today.getDate();
let selectedMonth = currentMonth;
let selectedYear = currentYear;

// ==== DOM Elements ====
const calendarBody = document.getElementById("calendarBody");
const monthYear = document.getElementById("monthYear");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const addEventBtn = document.getElementById("addEventBtn");
const eventModal = document.getElementById("eventModal");
const closeModal = document.getElementById("closeModal");
const eventForm = document.getElementById("eventForm");
const eventTitle = document.getElementById("eventTitle");
const eventDate = document.getElementById("eventDate");
const eventTime = document.getElementById("eventTime");
const monthViewBtn = document.getElementById("monthViewBtn");
const weekViewBtn = document.getElementById("weekViewBtn");
const dayViewBtn = document.getElementById("dayViewBtn");
const weekBody = document.getElementById("weekBody");
const dayBody = document.getElementById("dayBody");
const dayHead = document.getElementById("dayHead");
const monthTable = document.getElementById("monthTable");
const weekTable = document.getElementById("weekTable");
const dayTable = document.getElementById("dayTable");

// ==== Utility ====
function formatDate(date) {
  return date.toISOString().slice(0, 10);
}
function getWeekStart(date) {
  let d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return d;
}
function getWeekDates(date) {
  let start = getWeekStart(date);
  let arr = [];
  for (let i = 0; i < 7; i++) {
    let d = new Date(start);
    d.setDate(start.getDate() + i);
    arr.push(d);
  }
  return arr;
}

// ==== Render Functions ====
function renderCalendar(month, year) {
  // Set month/year header
  monthYear.textContent = `${months[month]} ${year}`;
  // First day of month (0=Sun)
  const firstDay = new Date(year, month, 1).getDay();
  // Days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let html = "";
  let date = 1;
  for (let i = 0; i < 6; i++) {
    // 6 weeks
    html += "<tr>";
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        html += "<td class='empty'></td>";
      } else if (date > daysInMonth) {
        html += "<td class='empty'></td>";
      } else {
        // Today's highlight
        let isToday =
          date === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear();
        let cellDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          date
        ).padStart(2, "0")}`;
        html += `<td class="${
          isToday ? "today" : ""
        }" data-date="${cellDate}"><div>${date}</div>`;
        // Render events for this date
        events
          .filter((ev) => ev.date === cellDate)
          .forEach((ev, idx) => {
            let typeClass = ev.type || "";
            html += `<span class="event ${typeClass}" title="${ev.title}${
              ev.time ? " @ " + ev.time : ""
            }" data-idx="${cellDate}|${idx}">
                ${ev.title}${ev.time ? " @ " + ev.time : ""}
                <span style="margin-left:auto;cursor:pointer;font-size:1.1em;color:#b0b4c3;" class="del-event" title="Delete">&#x2715;</span>
              </span>`;
          });
        html += "</td>";
        date++;
      }
    }
    html += "</tr>";
    if (date > daysInMonth) break;
  }
  calendarBody.innerHTML = html;

  // Add delete event listeners
  document.querySelectorAll(".del-event").forEach((btn) => {
    btn.onclick = function (e) {
      e.stopPropagation();
      const key = btn.parentElement.getAttribute("data-idx");
      const [cellDate, idx] = key.split("|");
      let evs = events.filter((ev) => ev.date === cellDate);
      let globalIdx = events.indexOf(evs[parseInt(idx)]);
      if (globalIdx > -1) {
        events.splice(globalIdx, 1);
        renderCurrentView();
      }
    };
  });

  // Day/Week cell click for switching view
  document.querySelectorAll(".calendar-table td").forEach((td) => {
    td.onclick = function () {
      const d = td.getAttribute("data-date");
      if (!d) return;
      const [y, m, da] = d.split("-");
      selectedDay = parseInt(da);
      selectedMonth = parseInt(m) - 1;
      selectedYear = parseInt(y);
      if (currentView === "month") {
        renderDayView(selectedYear, selectedMonth, selectedDay);
        setView("day");
      }
    };
  });
}

function renderWeekView(year, month, day) {
  // Get week dates
  let refDate = new Date(year, month, day);
  let weekDates = getWeekDates(refDate);
  let html = "<tr>";
  weekDates.forEach((d) => {
    let isToday =
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();
    let cellDate = formatDate(d);
    html += `<td class="${
      isToday ? "today" : ""
    }" data-date="${cellDate}"><div>${d.getDate()}</div>`;
    events
      .filter((ev) => ev.date === cellDate)
      .forEach((ev, idx) => {
        let typeClass = ev.type || "";
        html += `<span class="event ${typeClass}" title="${ev.title}${
          ev.time ? " @ " + ev.time : ""
        }" data-idx="${cellDate}|${idx}">
            ${ev.title}${ev.time ? " @ " + ev.time : ""}
            <span style="margin-left:auto;cursor:pointer;font-size:1.1em;color:#b0b4c3;" class="del-event" title="Delete">&#x2715;</span>
          </span>`;
      });
    html += "</td>";
  });
  html += "</tr>";
  weekBody.innerHTML = html;

  // Header
  let weekStart = weekDates[0];
  let weekEnd = weekDates[6];
  monthYear.textContent = `${
    months[weekStart.getMonth()]
  } ${weekStart.getDate()}, ${weekStart.getFullYear()} - ${
    months[weekEnd.getMonth()]
  } ${weekEnd.getDate()}, ${weekEnd.getFullYear()}`;

  // Delete event listeners
  document.querySelectorAll(".del-event").forEach((btn) => {
    btn.onclick = function (e) {
      e.stopPropagation();
      const key = btn.parentElement.getAttribute("data-idx");
      const [cellDate, idx] = key.split("|");
      let evs = events.filter((ev) => ev.date === cellDate);
      let globalIdx = events.indexOf(evs[parseInt(idx)]);
      if (globalIdx > -1) {
        events.splice(globalIdx, 1);
        renderCurrentView();
      }
    };
  });

  // Day cell click for switching to day view
  document.querySelectorAll(".week-view-table td").forEach((td) => {
    td.onclick = function () {
      const d = td.getAttribute("data-date");
      if (!d) return;
      const [y, m, da] = d.split("-");
      selectedDay = parseInt(da);
      selectedMonth = parseInt(m) - 1;
      selectedYear = parseInt(y);
      renderDayView(selectedYear, selectedMonth, selectedDay);
      setView("day");
    };
  });
}

function renderDayView(year, month, day) {
  let d = new Date(year, month, day);
  dayHead.textContent = `${months[month]} ${day}, ${year}`;
  let cellDate = formatDate(d);
  let html = "";
  events
    .filter((ev) => ev.date === cellDate)
    .forEach((ev, idx) => {
      let typeClass = ev.type || "";
      html += `<span class="event ${typeClass}" title="${ev.title}${
        ev.time ? " @ " + ev.time : ""
      }" data-idx="${cellDate}|${idx}">
          ${ev.title}${ev.time ? " @ " + ev.time : ""}
          <span style="margin-left:auto;cursor:pointer;font-size:1.1em;color:#b0b4c3;" class="del-event" title="Delete">&#x2715;</span>
        </span>`;
    });
  if (!html) html = "<div style='color:#b0b4c3;'>No events for this day.</div>";
  dayBody.innerHTML = html;
  monthYear.textContent = `${months[month]} ${day}, ${year}`;

  // Delete event listeners
  document.querySelectorAll(".del-event").forEach((btn) => {
    btn.onclick = function (e) {
      e.stopPropagation();
      const key = btn.parentElement.getAttribute("data-idx");
      const [cellDate, idx] = key.split("|");
      let evs = events.filter((ev) => ev.date === cellDate);
      let globalIdx = events.indexOf(evs[parseInt(idx)]);
      if (globalIdx > -1) {
        events.splice(globalIdx, 1);
        renderCurrentView();
      }
    };
  });
}

function renderCurrentView() {
  if (currentView === "month") {
    renderCalendar(currentMonth, currentYear);
    monthTable.style.display = "";
    weekTable.style.display = "none";
    dayTable.style.display = "none";
  } else if (currentView === "week") {
    renderWeekView(selectedYear, selectedMonth, selectedDay);
    monthTable.style.display = "none";
    weekTable.style.display = "";
    dayTable.style.display = "none";
  } else if (currentView === "day") {
    renderDayView(selectedYear, selectedMonth, selectedDay);
    monthTable.style.display = "none";
    weekTable.style.display = "none";
    dayTable.style.display = "";
  }
}

function setView(view) {
  currentView = view;
  // Toggle buttons
  monthViewBtn.classList.toggle("active", view === "month");
  weekViewBtn.classList.toggle("active", view === "week");
  dayViewBtn.classList.toggle("active", view === "day");
  renderCurrentView();
}

// ==== Event Listeners ====
prevBtn.onclick = () => {
  if (currentView === "month") {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
  } else if (currentView === "week" || currentView === "day") {
    let d = new Date(selectedYear, selectedMonth, selectedDay);
    d.setDate(d.getDate() - (currentView === "week" ? 7 : 1));
    selectedYear = d.getFullYear();
    selectedMonth = d.getMonth();
    selectedDay = d.getDate();
    if (currentView === "week")
      renderWeekView(selectedYear, selectedMonth, selectedDay);
    else renderDayView(selectedYear, selectedMonth, selectedDay);
  }
};
nextBtn.onclick = () => {
  if (currentView === "month") {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
  } else if (currentView === "week" || currentView === "day") {
    let d = new Date(selectedYear, selectedMonth, selectedDay);
    d.setDate(d.getDate() + (currentView === "week" ? 7 : 1));
    selectedYear = d.getFullYear();
    selectedMonth = d.getMonth();
    selectedDay = d.getDate();
    if (currentView === "week")
      renderWeekView(selectedYear, selectedMonth, selectedDay);
    else renderDayView(selectedYear, selectedMonth, selectedDay);
  }
};
addEventBtn.onclick = () => {
  eventModal.style.display = "block";
  eventForm.reset();
  let d =
    currentView === "month"
      ? new Date(currentYear, currentMonth, today.getDate())
      : new Date(selectedYear, selectedMonth, selectedDay);
  eventDate.value = formatDate(d);
};
closeModal.onclick = () => {
  eventModal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target === eventModal) eventModal.style.display = "none";
};
eventForm.onsubmit = function (e) {
  e.preventDefault();
  let title = eventTitle.value.trim();
  let date = eventDate.value;
  let time = eventTime.value;
  let type = "meeting";
  if (title.toLowerCase().includes("seminar")) type = "seminar";
  else if (title.toLowerCase().includes("conf")) type = "conf";
  else if (
    title.toLowerCase().includes("submission") ||
    title.toLowerCase().includes("submissi")
  )
    type = "time";
  else if (title.toLowerCase().includes("project")) type = "project";
  events.push({ title, date, time: time || undefined, type });
  eventModal.style.display = "none";
  renderCurrentView();
};

monthViewBtn.onclick = () => {
  setView("month");
};
weekViewBtn.onclick = () => {
  // week of selected day
  setView("week");
};
dayViewBtn.onclick = () => {
  setView("day");
};

// ==== Initialize ====
renderCalendar(currentMonth, currentYear);
