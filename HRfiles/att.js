const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById("attendanceTable");

searchInput.addEventListener("keyup", function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll("#attendanceTable tr").forEach((row) => {
    row.style.display = row.innerText.toLowerCase().includes(query)
      ? ""
      : "none";
  });
});

function editRow(icon) {
  const row = icon.closest("tr");
  Array.from(row.children).forEach((cell, index) => {
    if (index < 6) {
      const value = cell.innerText.trim();
      cell.innerHTML = `<input type="text" class="form-control form-control-sm" value="${value}">`;
    }
  });
  icon.classList.remove("bi-pencil-square");
  icon.classList.add("bi-check2-square", "text-success");
  icon.setAttribute("onclick", "saveRow(this)");
}

function saveRow(icon) {
  const row = icon.closest("tr");
  const cells = row.querySelectorAll("td input");
  const [name, date, status, timeIn, timeOut, hours] = Array.from(cells).map(
    (input) => input.value
  );

  row.innerHTML = `
        <td>${name}</td>
        <td>${date}</td>
        <td><span class="badge ${
          status.toLowerCase() === "present" ? "badge-success" : "badge-danger"
        }">${status}</span></td>
        <td>${timeIn}</td>
        <td>${timeOut}</td>
        <td>
          ${hours}
          <div class="progress mt-1">
            <div class="progress-bar ${
              hours >= 9 ? "bg-success" : hours >= 8 ? "bg-info" : "bg-warning"
            }" style="width: ${parseFloat(hours) * 10}%;"></div>
          </div>
        </td>
        <td class="action-icons">
          <i class="bi bi-pencil-square text-primary" onclick="editRow(this)"></i>
        </td>
      `;
}

function addRow() {
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
        <td><input type="text" class="form-control form-control-sm" placeholder="Employee"></td>
        <td><input type="date" class="form-control form-control-sm"></td>
        <td><input type="text" class="form-control form-control-sm" placeholder="Present/Absent"></td>
        <td><input type="time" class="form-control form-control-sm"></td>
        <td><input type="time" class="form-control form-control-sm"></td>
        <td><input type="number" class="form-control form-control-sm" placeholder="Hours"></td>
        <td class="action-icons"><i class="bi bi-check2-square text-success" onclick="saveRow(this)"></i></td>
      `;
  tableBody.prepend(newRow);
}
