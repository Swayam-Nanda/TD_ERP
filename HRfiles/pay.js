function toggleAddForm() {
  const form = document.getElementById("addForm");
  form.style.display = form.style.display === "flex" ? "none" : "flex";
  form.style.flexWrap = "wrap";
}

function addRow(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const month = document.getElementById("month").value;
  const gross = document.getElementById("gross").value;
  const deductions = document.getElementById("deductions").value;
  const net = document.getElementById("net").value;

  const tbody = document.getElementById("payrollBody");
  const tr = document.createElement("tr");

  tr.innerHTML = `
        <td>${name}</td>
        <td>${month}</td>
        <td>${gross}</td>
        <td>${deductions}</td>
        <td>${net}</td>
        <td><span class="status-paid">Paid</span></td>
        <td><button class="edit-btn" onclick="editRow(this)">Edit</button></td>
      `;

  tbody.appendChild(tr);
  document.getElementById("addForm").reset();
}

function editRow(btn) {
  const row = btn.parentElement.parentElement;
  for (let i = 0; i < 5; i++) {
    const td = row.children[i];
    const oldValue = td.innerText;
    td.innerHTML = `<input type="text" value="${oldValue}" style="width: 100%; padding: 4px;" />`;
  }
  btn.innerText = "Save";
  btn.onclick = function () {
    for (let i = 0; i < 5; i++) {
      const input = row.children[i].querySelector("input");
      row.children[i].innerText = input.value;
    }
    btn.innerText = "Edit";
    btn.onclick = function () {
      editRow(btn);
    };
  };
}
