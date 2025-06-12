function addNewRow() {
  const tbody = document.getElementById("table-body");
  const row = document.createElement("tr");
  row.innerHTML = `
        <td><input class="inline-input" placeholder="Position"></td>
        <td><input class="inline-input" type="number" min="0"></td>
        <td><input class="inline-input" type="number" min="0"></td>
        <td><input class="inline-input" placeholder="Status"></td>
        <td><input class="inline-input" placeholder="Onboarding"></td>
        <td><input class="inline-input" placeholder="HR"></td>
        <td>
          <button class="save-btn" onclick="saveRow(this)">Save</button>
          <button class="cancel-btn" onclick="this.closest('tr').remove()">Cancel</button>
        </td>
      `;
  tbody.appendChild(row);
}

function editRow(btn) {
  const row = btn.closest("tr");
  const cells = row.querySelectorAll("td");

  const data = [...cells]
    .slice(0, 6)
    .map((td) => td.innerText || td.textContent.trim());
  const badgeTexts = [
    cells[3].querySelector("span")?.innerText || "",
    cells[4].querySelector("span")?.innerText || "",
  ];

  cells[0].innerHTML = `<input class="inline-input" value="${data[0]}">`;
  cells[1].innerHTML = `<input class="inline-input" type="number" value="${data[1]}">`;
  cells[2].innerHTML = `<input class="inline-input" type="number" value="${data[2]}">`;
  cells[3].innerHTML = `<input class="inline-input" value="${badgeTexts[0]}">`;
  cells[4].innerHTML = `<input class="inline-input" value="${badgeTexts[1]}">`;
  cells[5].innerHTML = `<input class="inline-input" value="${data[5]}">`;
  cells[6].innerHTML = `
        <button class="save-btn" onclick="saveRow(this)">Save</button>
        <button class="cancel-btn" onclick="location.reload()">Cancel</button>
      `;
}

function saveRow(btn) {
  const row = btn.closest("tr");
  const inputs = row.querySelectorAll("input");

  const values = [...inputs].map((input) => input.value.trim());

  row.innerHTML = `
        <td>${values[0]}</td>
        <td>${values[1]}</td>
        <td>${values[2]}</td>
        <td><span class="badge badge-open">${values[3]}</span></td>
        <td><span class="badge badge-ongoing">${values[4]}</span></td>
        <td>${values[5]}</td>
        <td><button class="edit-btn" onclick="editRow(this)">Edit</button></td>
      `;
}
