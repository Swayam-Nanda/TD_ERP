document.addEventListener("DOMContentLoaded", () => {
  function getCssVar(name, fallback = "#333") {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return value || fallback;
  }

  const primaryColor = getCssVar("--primary-color", "#5B7CFA");
  const textPrimaryColor = getCssVar("--text-primary", "#333333");
  const graphColor = getCssVar("--graph-color", "#8A2BE2");
  const accentColor = getCssVar("--accent-color", "#FF4081");
  const successColor = getCssVar("--success-color", "#4CAF50");
  const textSecondaryColor = getCssVar("--text-secondary", "#888888");

  let dashboardType = "E"; // or "HR"

  function renderDashboard() {
    if (dashboardType === "E") {
      document.getElementById("employee").style.display = "block";
      document.getElementById("hr").style.display = "none";
      renderEmployeeCharts();
    } else if (dashboardType === "HR") {
      document.getElementById("hr").style.display = "block";
      document.getElementById("employee").style.display = "none";
      renderHRCharts();
    }
  }

  function renderEmployeeCharts() {
    // Attendance Gauge
    const attendanceValue = 75.55;
    new Chart(document.getElementById("attendanceGauge"), {
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

    // Sales Data
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

    let salesChart;
    function renderSalesChart(type = "year") {
      const ctx = document.getElementById("monthlySalesChart").getContext("2d");
      if (salesChart) salesChart.destroy();
      salesChart = new Chart(ctx, {
        type: "bar",
        data: type === "year" ? salesYearData : salesWeekData,
        options: {
          plugins: {
            legend: {
              display: false,
              labels: {
                color: textPrimaryColor,
              },
            },
          },
          scales: {
            x: {
              grid: {
                display: false,
                color: textPrimaryColor,
              },
              ticks: {
                color: textPrimaryColor,
              },
            },
            y: {
              grid: {
                color: textPrimaryColor,
              },
              beginAtZero: true,
              ticks: {
                color: textPrimaryColor,
              },
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

  function renderHRCharts() {
    new Chart(document.getElementById("monthlySalesBarHR"), {
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
            grid: {
              display: false,
              color: textPrimaryColor,
            },
            ticks: { color: textPrimaryColor },
          },
          y: {
            grid: {
              color: textPrimaryColor,
            },
            beginAtZero: true,
            ticks: { color: textPrimaryColor },
          },
        },
      },
    });

    new Chart(document.getElementById("attendanceLine"), {
      type: "line",
      data: {
        labels: Array.from({ length: 30 }, (_, i) => `${i + 1}`),
        datasets: [
          {
            label: "% Present",
            data: [
              98, 97, 99, 97, 95, 90, 93, 95, 98, 99, 98, 95, 97, 96, 99, 98,
              95, 96, 97, 99, 98, 99, 97, 98, 99, 98, 97, 98, 99, 98,
            ],
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
            grid: {
              display: false,
              color: textPrimaryColor,
            },
            ticks: { color: textPrimaryColor },
          },
          y: {
            grid: {
              color: textPrimaryColor,
            },
            beginAtZero: true,
            max: 100,
            ticks: { color: textPrimaryColor },
          },
        },
      },
    });

    new Chart(document.getElementById("joiningBar"), {
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
            grid: {
              display: false,
              color: textPrimaryColor,
            },
            ticks: { color: textPrimaryColor },
          },
          y: {
            grid: {
              color: textPrimaryColor,
            },
            beginAtZero: true,
            ticks: { color: textPrimaryColor },
          },
        },
      },
    });
  }

  renderDashboard();
});
document.addEventListener("DOMContentLoaded", () => {
  function getCssVar(name, fallback = "red") {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    console.log(`${name} = ${value}`); // 👈 Debug
    return value || fallback;
  }

  const textPrimaryColor = getCssVar("--text-primary", "#000");

  // just a test
  document.body.style.color = textPrimaryColor;
});
