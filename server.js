const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const logo = require('asciiart-logo');

const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Cjtw2453!1006$',
    database: 'company'
});

connection.connect(err => {
    if(err) throw err;
    console.log('connected as id ' + connection.threadId + '\n');
});

init();

function init() {
    
    const logoText = logo({ name: "Employee Manager" }).render();

    console.log(logoText);
    
// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
initialQuestions();
};

function initialQuestions() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'initial_question',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', "Update an employee's role"]
        }   
    ])
    .then(choice => {
        if (choice.initial_question === 'View all departments') {
            console.log('View all departments');
            displayDepartments()
        }
        else if (choice.initial_question === 'View all roles') {
            displayRoles();
            console.log('View all roles');
        }
        else if (choice.initial_question === 'View all employees') {
            displayEmployees();
            console.log('View all employees');
        }
        else if (choice.initial_question === 'Add a department') {
            console.log('Add a department');
            addDepartment();
        }
        else if (choice.initial_question === 'Add a role') {
            console.log('Add a role');
            addRole();
        }
        else if (choice.initial_question === 'Add an employee') {
            console.log('Add an employee');
            addEmployee();
        }
        else if (choice.initial_question === "Update an employee's role") {
            console.log('Updated employee');
            updateRole();
        }
    });
};
    
function displayDepartments() {
    connection.promise().query('SELECT department_name AS Department_Name, departments.id FROM departments', function(err, res) {
        if(err) throw err;
        console.log('\n');
        console.table(res);
    
    // .then(() => 
    initialQuestions();  
})  
};

// showDepartmentNames = () => {
    // let departmentArray = [];
//     connection.query(`SELECT department_name FROM departments`, function (err, res) {
// if (err) throw err;
// // console.log(res);
//         let departmentArray = [];
//             for (i=0; i < res.length; i++) {
//                 departmentArray.push(res[i].department_name)
//             }
//             return departmentArray;
//             // console.log(departmentArray);
//             });
//         };

function displayRoles() {
    connection.query(
        `SELECT title AS Position, roles.id, department_name AS Department_Name, salary 
        FROM roles LEFT JOIN departments ON roles.department_id = departments.id`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
            initialQuestions();
        });
}; 

function displayEmployees() {
    // connection.promise().query('SELECT first_name, last_name, employees.id FROM employees', 
    // function (err, rows)  {
    //     if (err) throw err;
    //      let employees = rows;
    //     // console.log(departments);
    //     const managerNames = employees.map(employee => (
    //         {
    //     name: manager.first_name + " " + manager.last_name,
    //     value: manager.id,
    //     }

    //     ))

    connection.query(
        //still need to add in manager_name - not sure how to populat name based on id
        `SELECT employees.id AS "ID", 
        employees.first_name AS "First Name", 
        employees.last_name AS "Last Name", 
        roles.title AS "Role", 
        departments.department_name AS "Department", 
        roles.salary AS "Salary", 
        manager.last_name AS "Manager"
        FROM employees 
        LEFT JOIN roles ON roles.id = employees.role_id 
        INNER JOIN departments ON departments.id = employees.role_id
        INNER JOIN employees manager ON employees.manager_id = manager.id
        ORDER BY employees.id ASC `,
        function (err, res) {
            if(err) throw err;
            // return (res);
            console.table(res);
            initialQuestions();
        });
};

// function displayEmployeeNames() {
//     connection.query(
//         `SELECT employees.first_name, employees.last_name
//         FROM employees`,
//         function (err, res) {
//             if (err) throw err;
//             // return (res);
//             console.table(res);
//         });
// };

//Function prompts question to add a department, adds the new department to the server, and logs addition for user
function addDepartment() {
    console.log("adding a department");
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartmentName',
            message: 'What department would you like to add?',
            validate: newDepartmentNameInput => {
                if(newDepartmentNameInput) {
                    return true;
                } else {
                    console.log("Please enter a department name.");
                    return false;
                }
            }
        }
    ])
    .then(data => {
    connection.promise().query(
        `INSERT INTO departments SET ?`,  
        {
            department_name: data.newDepartmentName
        },
        function(err, res) {
        if (err) throw err;
        // console.log(data.newDepartmentName + ' added');
       
    });
    initialQuestions();
});
};

//Function prompts user to add a role title and salary - still need to work on choices for department options, and conversion to id
function addRole() {
    connection.promise().query('SELECT department_name, departments.id FROM departments', 
    function (err, rows)  {
        if (err) throw err;
         let departments = rows;
        // console.log(departments);
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
                if(newRoleSalary) {
                    return true;
                } else {
                    console.log('Please enter a salary.');
                    return false;
                }
            }
        },
        // need to add question that pulls existing array of roles as choices
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
        if(err) throw err;
        // console.log(data.newRoleName + ' has been added.');
    });
    initialQuestions();
});
})
};

function addEmployee() {
    connection.promise().query('SELECT title, roles.id FROM roles', 
    function (err, rows)  {
        if (err) throw err;
         let roles = rows;
        // console.log(departments);
        const roleChoices = roles.map(role => ({
        name: role.title,
        value: role.id,
        }))
        connection.promise().query('SELECT first_name, last_name, employees.id FROM employees', 
    function (err, rows)  {
        if (err) throw err;
         let managers = rows;
        // console.log(departments);
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
          
        function(err, res) {
        if(err) throw err; 
            // console.log(data.newEmployeeFirstName + " " + data.newEmployeeLastName + ' has been added.');
    });
    initialQuestions();
});
})
})
};

function updateRole() {
    connection.promise().query('SELECT first_name, last_name, employees.id FROM employees', 
    function (err, rows)  {
        if (err) throw err;
         let employees = rows;
        const employeeChoices = employees.map(employee => ({
        name: employee.first_name + " " + employee.last_name,
        value: employee.id,
        }));
        connection.promise().query('SELECT title, roles.id FROM roles', 
    function (err, rows)  {
        if (err) throw err;
         let roles = rows;
        // console.log(departments);
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
    .then(data =>{
        // console.log(data));
    connection.query('UPDATE employees SET ? WHERE ?',
    [{
        role_id: data.updatedRole
    }, 
    {
        id: data.employeeToUpdate
    }],
    function(err, res) {
        if (err) throw err;
        console.log(res);
        initialQuestions();
    })
}); 
})
})
};


// module.exports = { connection, displayEmployeeNames, displayDepartments, displayEmployees, displayRoles, addDepartment, addEmployee, addRole, updateRole };

    