const mysql = require("mysql2/promise");
const { printTable } = require("console-table-printer");

async function getDept() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] = await conn.execute(`SELECT * FROM departments`);
  await conn.end();
  printTable(rows);
}
async function getRoles() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] =
    await conn.execute(`SELECT r.id, r.title, r.salary, d.name as dept
  from roles r 
  left join departments d  
  ON r.department_id = d.id;`);
  await conn.end();
  printTable(rows);
}
async function getEmployees() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] =
    await conn.execute(`SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name as dept, CONCAT(m.first_name,' ',m.last_name) as Manager
  from employees e 
  left join roles r 
  ON e.role_id = r.id 
  left join departments d 
  on r.department_id = d.id 
  left join employees m
  ON e.manager_id = m.id;`);
  await conn.end();
  printTable(rows);
}
async function addDept(deptToBeAdded) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] = await conn.execute(
    `SELECT name FROM departments WHERE name = ?`,
    [deptToBeAdded]
  );
  await conn.end();
  if (rows.length > 0) return console.log("invalid input");
  const connUpdate = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  await connUpdate.execute(`INSERT INTO departments (name) VALUES (?)`, [
    deptToBeAdded,
  ]);
  await connUpdate.end();
  console.log(`${deptToBeAdded} created`);
}
async function getDeptId() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] = await conn.execute(`Select * FROM departments`);
  await conn.end();
  return rows;
}
async function addRoleDb(selectedDept, newRole, roleSalary) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] = await conn.execute(
    `SELECT title FROM roles WHERE title = ?`,
    [newRole]
  );
  await conn.end();
  if (rows.length > 0) return console.log("invalid Role");
  const connUpdate = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  await connUpdate.execute(
    `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,
    [newRole, roleSalary, selectedDept]
  );
  await connUpdate.end();
  console.log(`${newRole} created`);
}
async function getRoleId() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] = await conn.execute(
    `Select id, title as name FROM roles`
  );
  await conn.end();
  return rows;
}
async function addEmployeeDb(selectedRole, firstName, lastName, selectedManager) {
  const connUpdate = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });

  if (selectedManager) {
    await connUpdate.execute(
      `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
      [firstName, lastName, selectedRole, selectedManager]
    );
  } else {
    await connUpdate.execute(
      `INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?)`,
      [firstName, lastName, selectedRole]
    );
  }
  await connUpdate.end();
  console.log(`${firstName} ${lastName} added to employees`);
}

async function getEmpId() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] = await conn.execute(
    `Select id, concat(first_name,' ',last_name) as name FROM employees`
  );
  await conn.end();
  return rows;
}

async function updateEmpRole(selectedRole, selectedEmp) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  await conn.execute(`UPDATE employees SET role_id = ? WHERE id = ?`, [
    selectedRole[0].id,
    selectedEmp[0].id,
  ]);
  await conn.end();
  console.log(`Updated ${selectedEmp[0].name}'s role to ${selectedRole[0].name}`);
}

async function updateEmpManager(selectedManager, selectedEmp) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  await conn.execute(`UPDATE employees SET manager_id = ? WHERE id = ?`, [
    selectedManager[0].id,
    selectedEmp[0].id,
  ]);
  await conn.end();
  console.log(
    `Updated ${selectedEmp[0].name}'s manager to ${selectedManager[0].name}`
  );
}

async function getManagers() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] = await conn.execute(
    `Select m.id, concat(m.first_name,' ',m.last_name) as name FROM employees e JOIN employees m ON e.manager_id= m.id`
  );
  await conn.end();
  return rows;
}

async function getByManager(selectedManager) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] = await conn.execute(
    `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name as dept
    from employees e 
    join roles r 
    ON e.role_id = r.id 
    join departments d 
    on r.department_id = d.id 
    WHERE manager_id = ?
    ;`,
    [selectedManager[0].id]
  );
  await conn.end();
  printTable(rows);
}

async function getByDept(selectedDept) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] = await conn.execute(
    `SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name as dept
  from employees e 
  join roles r 
  ON e.role_id = r.id 
  join departments d 
  on r.department_id = d.id 
  WHERE r.department_id = ?
  ;`,
    [selectedDept[0].id]
  );
  await conn.end();
  printTable(rows);
}

async function getBudget() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  const [rows, fields] = await conn.execute(
    `SELECT d.name, sum(salary) from employees e JOIN roles r ON e.role_id=r.id
    JOIN departments d ON r.department_id = d.id
    GROUP BY d.name;`
  );
  await conn.end();
  printTable(rows);
}

async function deleteDept(selectedDept) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  await conn.execute(`DELETE FROM departments WHERE id=?`, [selectedDept[0].id]);
  await conn.end();
  console.log(`${selectedDept[0].name} deleted`);
}

async function deleteRole(selectedRole) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  await conn.execute(`DELETE FROM roles WHERE id=?`, [selectedRole[0].id]);
  await conn.end();
  console.log(`${selectedRole[0].name} deleted`);
}

async function deleteEmp(selectedEmp) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  await conn.execute(`DELETE FROM employees WHERE id=?`, [selectedEmp[0].id]);
  await conn.end();
  console.log(`${selectedEmp[0].name} deleted`);
}

async function changeDept(selectedRole, selectedDept) {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "shadygoodsinc",
  });
  await conn.execute(`UPDATE roles SET department_id = ? WHERE id = ?`, [
    selectedDept[0].id,
    selectedRole[0].id,
  ]);
  await conn.end();
  console.log(
    `${selectedRole[0].name}'s department changed to ${selectedDept[0].name}`
  );
}

module.exports = {
  getDept,
  getRoles,
  getEmployees,
  addDept,
  getDeptId,
  addRoleDb,
  getRoleId,
  addEmployeeDb,
  getEmpId,
  updateEmpRole,
  updateEmpManager,
  getManagers,
  getByManager,
  getByDept,
  getBudget,
  deleteDept,
  deleteRole,
  deleteEmp,
  changeDept,
};