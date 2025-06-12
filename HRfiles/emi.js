function editRow(btn) {
  const row = btn.closest("tr");
  const cells = row.querySelectorAll("td");
  const newValues = prompt(
    "Edit details in this format:\nName, Role, Email, Status, Date of Joining",
    `${cells[1].innerText}, ${cells[1].querySelector(".emp-role").innerText}, ${
      cells[2].innerText
    }, ${cells[3].innerText}, ${cells[4].innerText}`
  );
  if (!newValues) return;
  const [name, role, email, status, doj] = newValues
    .split(",")
    .map((s) => s.trim());

  row.querySelector(".emp-name").textContent = name;
  row.querySelector(".emp-role").textContent = role;
  cells[2].textContent = email;
  cells[3].innerHTML = `<span class="status-badge status-${status.toLowerCase()}">${status}</span>`;
  cells[4].textContent = doj;
}

document
  .getElementById("addEmployeeForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("empId").value;
    const name = document.getElementById("empName").value;
    const role = document.getElementById("empRole").value;
    const email = document.getElementById("empEmail").value;
    const status = document.getElementById("empStatus").value;
    const doj = document.getElementById("empDOJ").value;
    const image = document.getElementById("empImage").value;

    const statusClass = `status-${status.toLowerCase()}`;

    const row = `
        <tr>
          <td>${id}</td>
          <td>
            <div class="avatar-name">
              <img class="avatar" src="${image}" alt="${name}">
              <div class="emp-details">
                <span class="emp-name">${name}</span>
                <span class="emp-role">${role}</span>
              </div>
            </div>
          </td>
          <td>${email}</td>
          <td><span class="status-badge ${statusClass}">${status}</span></td>
          <td>${doj}</td>
          <td><button class="btn btn-sm btn-warning edit-btn" onclick="editRow(this)">Edit</button></td>
        </tr>`;
    document
      .getElementById("employeeBody")
      .insertAdjacentHTML("beforeend", row);
    document.getElementById("addEmployeeForm").reset();
    bootstrap.Modal.getInstance(
      document.getElementById("addEmployeeModal")
    ).hide();
  });
