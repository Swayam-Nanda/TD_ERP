const trainingTable = document
  .getElementById("trainingTable")
  .getElementsByTagName("tbody")[0];

// Add row logic
document
  .getElementById("addTrainingForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("employeeName").value;
    const training = document.getElementById("trainingType").value;
    const date = document.getElementById("trainingDate").value;
    const status = document.getElementById("trainingStatus").value;
    const score = document.getElementById("trainingScore").value || "–";
    const remarks = document.getElementById("trainingRemarks").value;

    const badgeClass =
      status === "Completed"
        ? "badge-completed"
        : status === "Ongoing"
        ? "badge-ongoing"
        : "badge-planned";

    const newRow = trainingTable.insertRow();
    newRow.innerHTML = `
        <td>${name}</td>
        <td>${training}</td>
        <td>${date}</td>
        <td><span class="badge ${badgeClass}">${status}</span></td>
        <td>${score}</td>
        <td>${remarks}</td>
        <td><button class="btn btn-sm btn-warning action-btn edit-btn">Edit</button></td>
      `;
    addEditListeners();
    bootstrap.Modal.getInstance(
      document.getElementById("addTrainingModal")
    ).hide();
    this.reset();
  });

// Edit row logic
function addEditListeners() {
  document.querySelectorAll(".edit-btn").forEach((btn, index) => {
    btn.onclick = function () {
      const row = trainingTable.rows[index];
      document.getElementById("editRowIndex").value = index;
      document.getElementById("editEmployeeName").value =
        row.cells[0].innerText;
      document.getElementById("editTrainingType").value =
        row.cells[1].innerText;
      document.getElementById("editTrainingDate").value =
        row.cells[2].innerText;
      document.getElementById("editTrainingStatus").value =
        row.cells[3].innerText.trim();
      document.getElementById("editTrainingScore").value =
        row.cells[4].innerText === "–" ? "" : row.cells[4].innerText;
      document.getElementById("editTrainingRemarks").value =
        row.cells[5].innerText;

      new bootstrap.Modal(document.getElementById("editTrainingModal")).show();
    };
  });
}
addEditListeners();

document
  .getElementById("editTrainingForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const index = document.getElementById("editRowIndex").value;
    const row = trainingTable.rows[index];
    const status = document.getElementById("editTrainingStatus").value;
    const badgeClass =
      status === "Completed"
        ? "badge-completed"
        : status === "Ongoing"
        ? "badge-ongoing"
        : "badge-planned";

    row.cells[0].innerText = document.getElementById("editEmployeeName").value;
    row.cells[1].innerText = document.getElementById("editTrainingType").value;
    row.cells[2].innerText = document.getElementById("editTrainingDate").value;
    row.cells[3].innerHTML = `<span class="badge ${badgeClass}">${status}</span>`;
    row.cells[4].innerText =
      document.getElementById("editTrainingScore").value || "–";
    row.cells[5].innerText = document.getElementById(
      "editTrainingRemarks"
    ).value;

    bootstrap.Modal.getInstance(
      document.getElementById("editTrainingModal")
    ).hide();
  });
