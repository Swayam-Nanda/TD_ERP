const form = document.getElementById("addForm");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const values = Array.from(form.querySelectorAll("input, select")).map((i) =>
    i.value.trim()
  );
  const statusBadge =
    values[5] === "Enrolled"
      ? '<span class="badge bg-success">Enrolled</span>'
      : '<span class="badge bg-danger">Not Enrolled</span>';
  const row = `
        <tr>
          <td>${values[0]}</td>
          <td>${values[1]}</td>
          <td>${values[2]}</td>
          <td>${values[3]}</td>
          <td>${values[4] || "--"}</td>
          <td>${statusBadge}</td>
          <td><button class="btn btn-warning btn-sm" onclick="editRow(this)">Edit</button></td>
        </tr>`;
  document
    .querySelector("#benefitsTable tbody")
    .insertAdjacentHTML("beforeend", row);
  document.querySelector("#addModal .btn-close").click();
  form.reset();
});

function editRow(button) {
  const row = button.closest("tr");
  const cells = row.querySelectorAll("td");
  const inputs = Array.from(cells)
    .slice(0, 5)
    .map((td) =>
      prompt(
        `Edit ${td.previousElementSibling?.textContent || "Field"}`,
        td.textContent
      )
    );
  if (inputs.some((i) => i === null)) return;
  const status = prompt(
    "Edit Status (Enrolled/Not Enrolled)",
    cells[5].innerText.includes("Enrolled") ? "Enrolled" : "Not Enrolled"
  );
  cells[0].textContent = inputs[0];
  cells[1].textContent = inputs[1];
  cells[2].textContent = inputs[2];
  cells[3].textContent = inputs[3];
  cells[4].textContent = inputs[4];
  cells[5].innerHTML =
    status === "Enrolled"
      ? '<span class="badge bg-success">Enrolled</span>'
      : '<span class="badge bg-danger">Not Enrolled</span>';
}
