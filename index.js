const inquirer = require("inquirer");
const mysqlFunction = require("./utils/mysqlfunctions");

const functionList = [
    "View Departments",
    "View Roles",
    "View Employees",
    "Add Department",
    "Add Role",
    "Add Employee",
    "Update Employee Role",
    "Exit"
];

const viewFunctions = {
    "View Departments" : "viewDepartments",
    "View Roles" : "viewRoles",
    "View Employees" : "viewEmployees",
    "Add Department" : "addDepartment",
    "Add Role" : "addRole",
    "Add Employee" : "addEmployee",
    "Update Employee Role" : "updateRole",
    "Exit" : "exitApp"
};

const validateText = async (input) => {
    if (input.length < 1) {
        return "Please input 1 or more characters"
    }
    return true;
};

const validateNum = async (input) => {
    if (!(input % 1 == 0)) {
        return "Please enter a number";
};

function newFunction(selectedFunction) {
    eval(viewFunctions[selectedFunction] + `();`);
};

function initApp() {
    inquirer
    .prompt({type: "list", name: "function", choices: funcList, pageSize: 8})
    .then((response) => {
        newFunction(response.function);
    });
};

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
    await inquirer
    .prompt({
        type: "input",
        name: "newDept",
        message: "Name the new department",
        validate: validateText,
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
    await inquirer
        .prompt([
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
                validate: validateText
            },
            {
                type: "input",
                name: "roleSalary",
                validate: validateNum
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
    }
};

async function addEmployee() {
    const roleId = await mysqlFunction.getRoleId();
    const managerId = await getEmpId();
    const noMgr = { name: "None" };
    managerId.push (noMgr);
    await inquirer
      .prompt([
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
          validate: validateText,
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the employee's last name?",
          validate: validateText,
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
    const EmpId = await mysqlFunction.getEmpId();
    const roleId = await mysqlFunction.getRoleId();
    await inquirer
      .prompt([
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

function exit() {
    console.log("Exiting Now")
};

initApp()