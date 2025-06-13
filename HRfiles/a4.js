// Helper: Get CSS variable value
function getCSSVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

// Helper: Get color array from CSS variables (for pie/donut charts)
function getColorArray(length, ...vars) {
  const colors = [];
  for (let i = 0; i < length; i++) {
    colors.push(getCSSVar(vars[i % vars.length]));
  }
  return colors;
}

// Helper: Get single color from CSS variable
function getColor(varName) {
  return getCSSVar(varName);
}

// 1. Department-wise Employee Count (Bar Chart)
const deptCountCtx = document.getElementById("deptCountChart");
const deptCountChart = new Chart(deptCountCtx, {
  type: "bar",
  data: {
    labels: ["Sales", "HR", "Tech", "Ops", "Finance"],
    datasets: [
      {
        label: "Employee Count",
        data: [45, 20, 30, 15, 18],
        backgroundColor: getColor("--primary-color"),
        borderColor: getColor("--border-color"),
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: getColor("--text-secondary") },
        grid: { color: getColor("--border-color") },
      },
      x: {
        ticks: { color: getColor("--text-secondary") },
        grid: { color: getColor("--border-color") },
      },
    },
  },
});

// 2. Attrition Rate (Donut Chart)
const attritionCtx = document.getElementById("attritionChart");
const attritionChart = new Chart(attritionCtx, {
  type: "doughnut",
  data: {
    labels: ["Attrition", "Retained"],
    datasets: [
      {
        data: [18, 82],
        backgroundColor: [
          getColor("--danger-color"),
          getColor("--success-color"),
        ],
        borderColor: getColor("--border-color"),
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: getColor("--text-secondary") },
      },
      title: { display: false },
    },
  },
});

// 3. Gender Diversity (Pie Chart)
const genderCtx = document.getElementById("genderChart");
const genderChart = new Chart(genderCtx, {
  type: "pie",
  data: {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        data: [60, 35, 5],
        backgroundColor: [
          getColor("--primary-color"),
          getColor("--secondary-color"),
          getColor("--accent-color"),
        ],
        borderColor: getColor("--border-color"),
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: getColor("--text-secondary") },
      },
      title: { display: false },
    },
  },
});

// 4. Hiring Cost vs Performance ROI (Bubble Chart)
const bubbleCtx = document.getElementById("bubbleChart");
const bubbleChart = new Chart(bubbleCtx, {
  type: "bubble",
  data: {
    datasets: [
      {
        label: "High ROI",
        data: [
          { x: 8000, y: 8.5, r: 20 },
          { x: 12000, y: 9.0, r: 18 },
        ],
        backgroundColor: getColor("--success-color"),
        borderColor: getColor("--border-color"),
        borderWidth: 1,
      },
      {
        label: "Medium ROI",
        data: [
          { x: 10000, y: 7.0, r: 15 },
          { x: 9000, y: 6.5, r: 12 },
        ],
        backgroundColor: getColor("--warning-color"),
        borderColor: getColor("--border-color"),
        borderWidth: 1,
      },
      {
        label: "Low ROI",
        data: [
          { x: 15000, y: 5.0, r: 10 },
          { x: 14000, y: 4.5, r: 8 },
        ],
        backgroundColor: getColor("--danger-color"),
        borderColor: getColor("--border-color"),
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: getColor("--text-secondary") },
      },
      title: { display: false },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hiring Cost",
          color: getColor("--text-secondary"),
        },
        ticks: { color: getColor("--text-secondary") },
        grid: { color: getColor("--border-color") },
      },
      y: {
        title: {
          display: true,
          text: "Performance Score",
          color: getColor("--text-secondary"),
        },
        ticks: { color: getColor("--text-secondary") },
        grid: { color: getColor("--border-color") },
      },
    },
  },
});

// 5. Top Skills vs Department Needs (Radar Chart)
const radarCtx = document.getElementById("radarChart");
const radarChart = new Chart(radarCtx, {
  type: "radar",
  data: {
    labels: [
      "JavaScript",
      "Python",
      "SQL",
      "React",
      "Project Mgmt",
      "Data Analysis",
    ],
    datasets: [
      {
        label: "Current Skills",
        data: [7, 8, 6, 5, 4, 6],
        backgroundColor: getColor("--accent-color") + "40",
        borderColor: getColor("--accent-color"),
        borderWidth: 2,
        pointBackgroundColor: getColor("--accent-color"),
        pointBorderColor: getColor("--card-bg"),
        pointHoverRadius: 6,
      },
      {
        label: "Department Needs",
        data: [9, 8, 7, 8, 7, 8],
        backgroundColor: getColor("--primary-color") + "40",
        borderColor: getColor("--primary-color"),
        borderWidth: 2,
        pointBackgroundColor: getColor("--primary-color"),
        pointBorderColor: getColor("--card-bg"),
        pointHoverRadius: 6,
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: getColor("--text-secondary") },
      },
      title: { display: false },
    },
    scales: {
      r: {
        angleLines: { color: getColor("--border-color") },
        pointLabels: { color: getColor("--text-secondary") },
        ticks: {
          color: getColor("--text-secondary"),
          backdropColor: getColor("--card-bg"),
        },
        grid: { color: getColor("--border-color") },
      },
    },
  },
});

// Helper: Get CSS variable value
function getCSSVar(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function getColor(varName) {
  return getCSSVar(varName);
}

// Sample data: each series is a day of the week, each data point is a week number and absenteeism count
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];

function generateAbsenteeismData() {
  return days.map((day) => {
    return {
      name: day,
      data: weeks.map((week) => {
        return {
          x: week,
          y: Math.floor(Math.random() * 11), // Random value 0-10
        };
      }),
    };
  });
}

const options = {
  chart: {
    type: "heatmap",
    height: 350,
    toolbar: { show: false },
    foreColor: getColor("--text-secondary"), // Set chart text color to match other charts
  },
  plotOptions: {
    heatmap: {
      shadeIntensity: 0.5,
      colorScale: {
        // Use your own color variables for ranges if you want, or keep the original for clarity
        ranges: [
          { from: 0, to: 2, color: "#00A100", name: "Low" },
          { from: 3, to: 5, color: "#128FD9", name: "Medium" },
          { from: 6, to: 8, color: "#FFB200", name: "High" },
          { from: 9, to: 10, color: "#FF0000", name: "Extreme" },
        ],
      },
    },
  },
  dataLabels: { enabled: false },
  series: generateAbsenteeismData(),
  xaxis: {
    type: "category",
    labels: { style: { colors: getColor("--text-secondary") } }, // Match other chart labels
  },
  yaxis: {
    labels: { style: { colors: getColor("--text-secondary") } }, // Match other chart labels
  },
  tooltip: {
    enabled: true,
    y: { formatter: (val) => `${val} absentees` },
    x: { show: true },
    theme: "dark", // Optional: for contrast, or set custom background/foreground
    // To fully match your theme, you can use your own background and text color
    // but ApexCharts does not directly support CSS vars in the theme object
    // So, for best results, set "dark" or "light" as needed
  },
  grid: {
    borderColor: getColor("--border-color"), // Match other chart borders
  },
};

const chart = new ApexCharts(document.querySelector("#heatmapChart"), options);
chart.render();
