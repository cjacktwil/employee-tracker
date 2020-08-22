const inquirer = require('inquirer');

inquirer
.prompt([
     {
         type: 'list',
         name: 'initial_question',
         message: 'What would you like to do?',
         choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', "Update an employee's role"]
     }   
    ])
    .then(({ initial_question }) => {
        if (initial_question === 'View all departments') {
            // displayDepartments();
            console.log('View all departments');
        }
        else if (initial_question === 'View all roles') {
            //displayRoles();
            console.log('View all roles');
        }
        else if (initial_question === 'View all employees') {
            //displayEmployees();
            console.log('View all employees');
        }
        else if (initial_question === 'Add a department') {
            console.log('Add a department');
        }
        else if (initial_question === 'Add a role') {
            console.log('Add a role');
        }
        else if (initial_question === 'Add an employee') {
            console.log('Add an employee');
        }
        else if (initial_question === "Update an employee's role") {
            console.log('Updated employee');
        }
    });