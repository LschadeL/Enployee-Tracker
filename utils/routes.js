const mysqlFunction = require("./mysqlfunctions");
const {initApp} = require("../index");
const {prompt} = require("inquirer");
const validateChars = require("./validations");

async function viewDepartments() {
    await mysqlFunction.getDept();
    initApp();
};

async function viewRoles() {
    await mysqlFunction.getRoles();
    initApp();
};

async function viewEmployees() {
    await mysqlFunction.getEmployees();
    initApp();
};

async function addDepartment() {
    await 
    prompt({
        type: "input",
        name: "newDept",
        message: "Name the new department",
        validate: validateChars.validateText,
    })
    .then((response) => {
        mysqlFunction.addDept(response.addedDept)
        .then(
            setTimeout(() => {
                initApp();
            }, 50)
        );
    })
};

async function addRole() {
    const deptId = await mysqlFunction.getDeptId()
    await 
        prompt([
            {
                type: "list",
                name: "roleDept",
                message: "Which department is this role in?",
                choices: deptId
            },
            {
                type: "input",
                name: "newRole",
                message: "name this role",
                validate: validateChars.validateText
            },
            {
                type: "input",
                name: "roleSalary",
                validate: validateChars.validateNum
            }
        ])
        .then((response) => {
            const selectedDept = deptId.filter((element) => element.name == response.roleDept);
              mysqlFunction.addRoleDb(selectedDept[0].id, response.newRole, response.roleSalary)
              .then(
                setTimeout(() => {
                  initApp()
            }, 50));
        })
};

async function addEmployee() {
    const roleId = await mysqlFunction.getRoleId();
    const managerId = await mysqlFunction.getEmpId();
    const noMgr = { name: "None" };
    managerId.push (noMgr);
    await 
      prompt([
        {
          type: "list",
          name: "employeeRole",
          message: "select a role",
          choices: roleId,
        },
        {
          type: "input",
          name: "firstName",
          message: "What is the employee's first name?",
          validate: validateChars.validateText,
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
          validate: validateChars.validateText,
        },
        {
          type: "list",
          name: "newManager",
          message: "select a manager",
          choices: managerId,
        },
      ])
      .then((response) => {
        const selectedRole = roleId.filter(
          (element) => element.name == response.employeeRole
        );
        const selectedManager = managerId.filter(
          (element) => element.name == response.newManager
        );
        mysqlFunction.addEmployeeDb(
          selectedRole[0].id,
          response.firstName,
          response.lastName,
          selectedManager[0].id
        ).then(
          setTimeout(() => {
            initApp();
          }, 50)
        );
      });
};

async function updateRole() {
    const EmpId = await mysqlFunction.mysqlFunction.getEmpId();
    const roleId = await mysqlFunction.getRoleId();
    await
      prompt([
        {
          type: "list",
          name: "name",
          message: "select employee to update",
          choices: EmpId,
        },
        {
          type: "list",
          name: "newRole",
          message: "select a new role",
          choices: roleId,
        },
      ])
      .then((response) => {
        const pickedRole = roleId.filter(
          (element) => element.name == response.newRole
        );
        const pickedEmp = EmpId.filter(
          (element) => element.name == response.name
        );
        updateEmpRole(pickedRole, pickedEmp).then(
          setTimeout(() => {
            initApp();
          }, 50)
        );
      });
};

function exitApp() {
    console.log("Exiting Now")
};

module.exports = {
    viewDepartments,
    viewRoles,
    viewEmployees,
    addDepartment,
    addRole,
    addEmployee,
    updateRole,
    exitApp
};