const {prompt} = require("inquirer");
const mysqlFunction = require("./utils/mysqlfunctions");
const validateChars = require("./utils/validations");
const newRoute = require("./utils/routes");

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

function newFunction(selectedFunction) {
    eval(`newRoute.` + viewFunctions[selectedFunction] + `();`);
};

function initApp() {
    console.log(functionList);
    prompt({type: "list", name: "function", choices: functionList, pageSize: 8})
    .then((response) => {
        newFunction(response.function);
    });
};

initApp();

module.exports = {
initApp
}