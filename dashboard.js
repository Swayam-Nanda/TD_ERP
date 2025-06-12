let dashboardType = "HR"; // "E" for Employee, "HR" for HR

let textPrimaryColor = "#2e2e2e";
let graphColor = "rgb(70, 95, 255)";
let accentColor = "#FF6B6B";
let successColor = "#28a745";

// Keep global chart references
let attendanceGaugeChart = null;
let salesChart = null;
let salesHRChart = null;
let attendanceLineChart = null;
let joiningBarChart = null;

function toggleGraphColor() {
  textPrimaryColor =
    localStorage.getItem("darkMode") === "true" ? "#e0e0e0" : "#2e2e2e";
  console.log("textPrimaryColor:", textPrimaryColor);
}

function destroyAllCharts() {
  attendanceGaugeChart?.destroy();
  salesChart?.destroy();
  salesHRChart?.destroy();
  attendanceLineChart?.destroy();
  joiningBarChart?.destroy();
}

function renderDashboard() {
  toggleGraphColor();
  destroyAllCharts();

  document.getElementById("employee").style.display =
    dashboardType === "E" ? "block" : "none";
  document.getElementById("hr").style.display =
    dashboardType === "HR" ? "block" : "none";

  if (dashboardType === "E") {
    renderEmployeeCharts();
  } else {
    renderHRCharts();
  }
}

// ===== Employee Charts =====
function renderEmployeeCharts() {
  const attendanceValue = 75.55;

  attendanceGaugeChart = new Chart(document.getElementById("attendanceGauge"), {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [attendanceValue, 100 - attendanceValue],
          backgroundColor: ["#5B7CFA", "#E0E4F7"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      rotation: -90,
      circumference: 180,
      cutout: "80%",
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
    },
  });

  const salesYearData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Sales",
        data: [
          5400, 7200, 6900, 8300, 9100, 7800, 8600, 9000, 9500, 9800, 10200,
          11000,
        ],
        backgroundColor: graphColor,
        borderRadius: 8,
        barThickness: 24,
      },
    ],
  };

  const salesWeekData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Sales",
        data: [2400, 3200, 3100, 4000],
        backgroundColor: graphColor,
        borderRadius: 8,
        barThickness: 48,
      },
    ],
  };

  function renderSalesChart(type = "year") {
    if (salesChart) salesChart.destroy();

    const ctx = document.getElementById("monthlySalesChart").getContext("2d");
    const chartData = type === "year" ? salesYearData : salesWeekData;
    chartData.datasets[0].backgroundColor = graphColor;

    salesChart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        plugins: {
          legend: {
            display: false,
            labels: { color: textPrimaryColor },
          },
        },
        scales: {
          x: {
            grid: { display: false, color: textPrimaryColor },
            ticks: { color: textPrimaryColor },
          },
          y: {
            grid: { color: textPrimaryColor },
            ticks: { color: textPrimaryColor },
            beginAtZero: true,
          },
        },
      },
    });
  }

  renderSalesChart("year");

  document
    .getElementById("salesToggleYear")
    .addEventListener("click", function () {
      renderSalesChart("year");
      this.classList.add("active");
      document.getElementById("salesToggleWeek").classList.remove("active");
    });

  document
    .getElementById("salesToggleWeek")
    .addEventListener("click", function () {
      renderSalesChart("week");
      this.classList.add("active");
      document.getElementById("salesToggleYear").classList.remove("active");
    });
}

// ===== HR Charts =====
function renderHRCharts() {
  salesHRChart = new Chart(document.getElementById("monthlySalesBarHR"), {
    type: "bar",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Sales",
          data: [4500, 5700, 4800, 6200],
          backgroundColor: graphColor,
          borderRadius: 6,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { display: false, color: textPrimaryColor },
          ticks: { color: textPrimaryColor },
        },
        y: {
          grid: { color: textPrimaryColor },
          beginAtZero: true,
          ticks: { color: textPrimaryColor },
        },
      },
    },
  });

  attendanceLineChart = new Chart(document.getElementById("attendanceLine"), {
    type: "line",
    data: {
      labels: Array.from({ length: 30 }, (_, i) => i + 1),
      datasets: [
        {
          label: "% Present",
          data: Array(30)
            .fill(0)
            .map(() => Math.floor(Math.random() * 10) + 90),
          borderColor: successColor,
          backgroundColor: "rgba(40, 167, 69, 0.1)",
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { display: false, color: textPrimaryColor },
          ticks: { color: textPrimaryColor },
        },
        y: {
          grid: { color: textPrimaryColor },
          beginAtZero: true,
          max: 100,
          ticks: { color: textPrimaryColor },
        },
      },
    },
  });

  joiningBarChart = new Chart(document.getElementById("joiningBar"), {
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Joinings",
          data: [3, 5, 2, 4, 6, 8, 7, 9, 6, 5, 4, 7],
          backgroundColor: accentColor,
          borderRadius: 6,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        x: {
          grid: { display: false, color: textPrimaryColor },
          ticks: { color: textPrimaryColor },
        },
        y: {
          grid: { color: textPrimaryColor },
          beginAtZero: true,
          ticks: { color: textPrimaryColor },
        },
      },
    },
  });
}

// Initial call
renderDashboard();
window.addEventListener("themeChanged", () => {
  renderDashboard(); // re-render with updated theme
});
