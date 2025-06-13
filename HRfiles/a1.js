function addNewRow() {
  const tbody = document.querySelector("#appraisalTable tbody");
  const newRow = document.createElement("tr");

  newRow.innerHTML = `
        <td><input type="text" placeholder="Employee Name"></td>
        <td><input type="date"></td>
        <td><input type="number" min="0" max="100"></td>
        <td><input type="text" placeholder="Rating"></td>
        <td><input type="text" placeholder="Yes/No"></td>
        <td><input type="text" placeholder="Remarks"></td>
        <td>
          <button class="btn btn-sm btn-success" onclick="saveRow(this)">💾 Save</button>
          <button class="btn btn-sm btn-danger" onclick="cancelRow(this)">✖ Cancel</button>
        </td>
      `;
  tbody.prepend(newRow);
}

function editRow(button) {
  const row = button.closest("tr");
  const cells = row.querySelectorAll("td");
  const values = Array.from(cells)
    .slice(0, 6)
    .map((cell) => cell.innerText.trim());

  const ratingBadge = cells[3].querySelector("span")?.innerText || values[3];
  const promotionBadge = cells[4].querySelector("span")?.innerText || values[4];

  row.innerHTML = `
        <td><input type="text" value="${values[0]}"></td>
        <td><input type="date" value="${values[1]}"></td>
        <td><input type="number" value="${values[2]}" min="0" max="100"></td>
        <td><input type="text" value="${ratingBadge}"></td>
        <td><input type="text" value="${promotionBadge}"></td>
        <td><input type="text" value="${values[5]}"></td>
        <td>
          <button class="btn btn-sm btn-success" onclick="saveRow(this)">💾 Save</button>
          <button class="btn btn-sm btn-secondary" onclick="location.reload()">↩ Cancel</button>
        </td>
      `;
}

function saveRow(button) {
  const row = button.closest("tr");
  const inputs = row.querySelectorAll("input");
  const values = Array.from(inputs).map((input) => input.value.trim());

  const ratingClass =
    values[3].toLowerCase() === "excellent"
      ? "badge-excellent"
      : values[3].toLowerCase() === "good"
      ? "badge-good"
      : "badge-average";

  const promoClass =
    values[4].toLowerCase() === "yes"
      ? "badge-promotion-yes"
      : "badge-promotion-no";

  row.innerHTML = `
        <td>${values[0]}</td>
        <td>${values[1]}</td>
        <td>${values[2]}</td>
        <td><span class="badge rounded-pill ${ratingClass}">${values[3]}</span></td>
        <td><span class="badge rounded-pill ${promoClass}">${values[4]}</span></td>
        <td>${values[5]}</td>
        <td><button class="btn btn-sm btn-warning" onclick="editRow(this)">✏️ Edit</button></td>
      `;
}

function cancelRow(button) {
  const row = button.closest("tr");
  row.remove();
}
