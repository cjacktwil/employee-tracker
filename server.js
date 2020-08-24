const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');

const cTable = require('console.table');

//connecting to server
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Cjtw2453!1006$',
    database: 'company'
});

connection.connect(err => {
    if (err) throw err;
    // console.log('connected as id ' + connection.threadId + '\n');
});

init();

//function to initiate program
function init() {

    const logoText = logo({ name: "Employee Manager" }).render();
    console.log(logoText);
    initialQuestions();
};

//function to prompt initial question
function initialQuestions() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'initial_question',
            message: 'What would you like to do?',
            choices: ['Quit', 'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', "Update an employee's role"]
        }
    ])
        //based on response, additional functions are called
        .then(choice => {
            if (choice.initial_question === 'Quit') {
                console.log("Exiting application.");
                connection.end();
            }
            else if (choice.initial_question === 'View all departments') {
                displayDepartments()
            }
            else if (choice.initial_question === 'View all roles') {
                displayRoles();
            }
            else if (choice.initial_question === 'View all employees') {
                displayEmployees();
            }
            else if (choice.initial_question === 'Add a department') {
                addDepartment();
            }
            else if (choice.initial_question === 'Add a role') {
                addRole();
            }
            else if (choice.initial_question === 'Add an employee') {
                addEmployee();
            }
            else if (choice.initial_question === "Update an employee's role") {
                updateRole();
            }
        });
};

//function to display all departments, with name and department id
function displayDepartments() {
    connection.query('SELECT department_name AS "Department Name", departments.id AS "ID" FROM departments', function (err, res) {
        if (err) throw err;
        console.log('\n');
        console.table(res);
        initialQuestions();
    })
};

//function to display all roles, with titles, role ID, department name and salary
function displayRoles() {
    connection.query(
        `SELECT title AS "Role Title", roles.id AS "Role ID", department_name AS "Department Name", salary AS "Salary" 
        FROM roles LEFT JOIN departments ON roles.department_id = departments.id`,
        function (err, res) {
            if (err) throw err;
            console.log('\n');
            console.table(res);
            initialQuestions();
        });
};

//function to display all employees, with employee ID, first name, last name, role, department, salary and manager last name
function displayEmployees() {
    connection.promise().query(
        `SELECT employees.id AS "ID", 
        employees.first_name AS "First Name", 
        employees.last_name AS "Last Name", 
        roles.title AS "Role", 
        departments.department_name AS "Department", 
        roles.salary AS "Salary", 
        manager.last_name AS "Manager"
        FROM employees 
        LEFT JOIN roles ON roles.id = employees.role_id 
        LEFT JOIN departments ON departments.id = roles.department_id
        LEFT JOIN employees manager ON employees.manager_id = manager.id
        ORDER BY employees.id ASC `,
        function (err, res) {
            if (err) throw err;
            console.log('\n');
            console.table(res);
            initialQuestions();
        });
};

//Function prompts question to add a department and adds the new department to the server
function addDepartment() {
    console.log("adding a department");
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartmentName',
            message: 'What department would you like to add?',
            validate: newDepartmentNameInput => {
                if (newDepartmentNameInput) {
                    return true;
                } else {
                    console.log("Please enter a department name.");
                    return false;
                }
            }
        }
    ])
        .then(data => {
            connection.query(
                `INSERT INTO departments SET ?`,
                {
                    department_name: data.newDepartmentName
                },
                function (err, res) {
                    if (err) throw err;
                });
            initialQuestions();
        });
};

//Function prompts user to add a role title and salary, and provides existing department options to select from
function addRole() {
    connection.promise().query('SELECT department_name, departments.id FROM departments',
        function (err, rows) {
            if (err) throw err;
            let departments = rows;
            const departmentChoices = departments.map(department => ({
                name: department.department_name,
                value: department.id,
            }))
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'newRoleName',
                    message: 'What role would you like to add?',
                    validate: newRoleNameInput => {
                        if (newRoleNameInput) {
                            return true;
                        } else {
                            console.log('Please add a new role.');
                            return false;
                        }
                    }
                },
                {
                    type: 'input',
                    name: 'newRoleSalary',
                    message: `What is the salary for this postion?`,
                    validate: newRoleSalary => {
                        if (newRoleSalary) {
                            return true;
                        } else {
                            console.log('Please enter a salary.');
                            return false;
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'newRoleDepartment',
                    message: `What department does this position belong to?`,
                    choices: departmentChoices
                }
            ])
                .then(data => {
                    connection.query(
                        `INSERT INTO roles SET ?`,
                        {
                            title: data.newRoleName,
                            salary: data.newRoleSalary,
                            department_id: data.newRoleDepartment
                        },
                        function (err, res) {
                            if (err) throw err;
                        });
                    initialQuestions();
                });
        })
};

//function to add a new employee, inputing first name and last name, and selecting from options for role and manager
function addEmployee() {
    connection.promise().query('SELECT title, roles.id FROM roles',
        function (err, rows) {
            if (err) throw err;
            let roles = rows;
            const roleChoices = roles.map(role => ({
                name: role.title,
                value: role.id,
            }))
            connection.promise().query('SELECT first_name, last_name, employees.id FROM employees',
                function (err, rows) {
                    if (err) throw err;
                    let managers = rows;
                    const managerChoices = managers.map(manager => ({
                        name: manager.first_name + " " + manager.last_name,
                        value: manager.id,
                    }))
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'newEmployeeFirstName',
                            message: "What is the new employee's first name?",
                            validate: newEmployeeFirstName => {
                                if (newEmployeeFirstName) {
                                    return true;
                                } else {
                                    console.log("Please enter the new employee's first name.");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'newEmployeeLastName',
                            message: `What is the new employee's last name?`,
                            validate: newEmployeeLastName => {
                                if (newEmployeeLastName) {
                                    return true;
                                } else {
                                    console.log("Please enter the new employee's last name.");
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'list',
                            name: 'newEmployeeRole',
                            message: `Please select the new employee's role.`,
                            choices: roleChoices
                        },
                        {
                            type: 'list',
                            name: 'newEmployeeManager',
                            message: `Please select the new employee's manager.`,
                            choices: managerChoices
                        }
                    ])
                        .then(data => {
                            connection.query(
                                `INSERT INTO employees SET ?`,
                                {
                                    first_name: data.newEmployeeFirstName,
                                    last_name: data.newEmployeeLastName,
                                    role_id: data.newEmployeeRole,
                                    manager_id: data.newEmployeeManager
                                },

                                function (err, res) {
                                    if (err) throw err;
                                });
                            initialQuestions();
                        });
                })
        })
};

//function to update an employee's role, by prompting user to select from list of employees and list of
function updateRole() {
    connection.promise().query('SELECT first_name, last_name, employees.id FROM employees',
        function (err, rows) {
            if (err) throw err;
            let employees = rows;
            const employeeChoices = employees.map(employee => ({
                name: employee.first_name + " " + employee.last_name,
                value: employee.id,
            }));
            connection.promise().query('SELECT title, roles.id FROM roles',
                function (err, rows) {
                    if (err) throw err;
                    let roles = rows;
                    const roleChoices = roles.map(role => ({
                        name: role.title,
                        value: role.id,
                    }))
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'employeeToUpdate',
                            message: 'Which employee would you like to update?',
                            choices: employeeChoices
                        },
                        {
                            type: 'list',
                            name: 'updatedRole',
                            message: "Please select this employee's new role",
                            choices: roleChoices
                        }
                    ])
                        .then(data => {
                            connection.query('UPDATE employees SET ? WHERE ?',
                                [{
                                    role_id: data.updatedRole
                                },
                                {
                                    id: data.employeeToUpdate
                                }],
                                function (err, res) {
                                    if (err) throw err;
                                    initialQuestions();
                                })
                        });
                })
        })
};
