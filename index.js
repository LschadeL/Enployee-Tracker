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
    "Update Employee Manager",
    "Update Department for Role",
    "View Employees by Manager",
    "View Employees by Department",
    "View Budget",
    "Delete Items",
    "Exit"
];

const functionObj = {
    "View Departments" : "viewDepartments",
    "View Roles" : "viewRoles",
    "View Employees" : "viewEmployees",
    "Add Department" : "addDepartment",
    "Add Role" : "addRole",
    "Add Employee" : "addEmployee",
    "Update Employee Role" : "updateRole",
    "Update Employee Manager" : "updateManager",
    "Update Department for Role" : "updateDeptRole",
    "View Employees by Manager" : "viewByManager",
    "View Employees by Department" : "viewByDept",
    "View Budget" : "viewBudget",
    "Delete Item" : "deleteItem",
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
    eval(functionObj[selectedFunction] + `();`);
};

function initApp() {
    inquirer
    .prompt({type: "list", name: "function", choices: funcList, pageSize: 14})
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
                
            }
        ])
}