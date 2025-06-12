function downloadPDF() {
  const element = document.querySelector(".card");
  html2pdf().from(element).save("leave-management.pdf");
}

document.getElementById("searchInput").addEventListener("input", filterTable);
document.getElementById("filterType").addEventListener("change", filterTable);

function filterTable() {
  const name = document.getElementById("searchInput").value.toLowerCase();
  const type = document.getElementById("filterType").value;
  const rows = document.querySelectorAll("#leaveTable tbody tr");

  rows.forEach((row) => {
    const nameCell = row.children[0].textContent.toLowerCase();
    const typeCell = row.children[1].textContent;
    const match = nameCell.includes(name) && (type === "" || type === typeCell);
    row.style.display = match ? "" : "none";
  });
}

document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const employee = form.employee.value.trim();
    const type = form.type.value;
    const from = form.from.value;
    const to = form.to.value;
    const status = form.status.value;
    const balance = form.balance.value;

    if (!employee || !type || !from || !to || !status || balance === "") return;

    let badgeClass =
      status === "approved"
        ? "approved"
        : status === "pending"
        ? "pending"
        : "rejected";
    let badgeLabel = status.charAt(0).toUpperCase() + status.slice(1);

    const tbody = document.querySelector("#leaveTable tbody");
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${employee}</td>
      <td>${type}</td>
      <td>${from}</td>
      <td>${to}</td>
      <td><span class="badge ${badgeClass}">${badgeLabel}</span></td>
      <td>${balance}</td>
      <td><button class="btn btn-sm btn-primary edit-btn">Edit</button></td>
    `;
    tbody.appendChild(newRow);

    const addModal = bootstrap.Modal.getInstance(
      document.getElementById("addModal")
    );
    addModal.hide();
    form.reset();
    filterTable();
  });

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("edit-btn")) {
    const row = e.target.closest("tr");
    const cells = row.querySelectorAll("td");
    for (let i = 0; i < cells.length - 2; i++) {
      const text = cells[i].textContent.trim();
      cells[
        i
      ].innerHTML = `<input class="form-control form-control-sm" value="${text}">`;
    }
    const badge = row.querySelector(".badge");
    const statusVal = badge ? badge.textContent.trim().toLowerCase() : "";
    const select = `<select class="form-select form-select-sm">
                        <option value="approved" ${
                          statusVal === "approved" ? "selected" : ""
                        }>Approved</option>
                        <option value="pending" ${
                          statusVal === "pending" ? "selected" : ""
                        }>Pending</option>
                        <option value="rejected" ${
                          statusVal === "rejected" ? "selected" : ""
                        }>Rejected</option>
                      </select>`;
    cells[4].innerHTML = select;
    e.target.textContent = "Save";
    e.target.classList.remove("edit-btn");
    e.target.classList.add("save-btn");
  } else if (e.target.classList.contains("save-btn")) {
    const row = e.target.closest("tr");
    const cells = row.querySelectorAll("td");
    const values = [];
    for (let i = 0; i < cells.length - 2; i++) {
      const input = cells[i].querySelector("input");
      values.push(input ? input.value : "");
    }
    const statusVal = cells[4].querySelector("select").value;
    const badgeClass =
      statusVal === "approved"
        ? "approved"
        : statusVal === "pending"
        ? "pending"
        : "rejected";
    const badgeLabel = statusVal.charAt(0).toUpperCase() + statusVal.slice(1);
    cells[0].innerHTML = values[0];
    cells[1].innerHTML = values[1];
    cells[2].innerHTML = values[2];
    cells[3].innerHTML = values[3];
    cells[4].innerHTML = `<span class="badge ${badgeClass}">${badgeLabel}</span>`;
    cells[5].innerHTML = values[5];
    e.target.textContent = "Edit";
    e.target.classList.remove("save-btn");
    e.target.classList.add("edit-btn");
  }
});
