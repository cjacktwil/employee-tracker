const inquirer = require('inquirer');
const [displayDepartments, displayEmployees, displayRoles, addDepartment, addEmployee, addRole, updateRole] = require('../server.js');

let myCompany = [];

const init = () => {
    return inquirer.prompt([
     {
         type: 'list',
         name: 'initial_question',
         message: 'What would you like to do?',
         choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', "Update an employee's role"]
     }   
    ])
    .then(({ initial_question }) => {
        if (initial_question === 'View all departments') {
            displayDepartments();
            console.log('View all departments');
        }
        else if (initial_question === 'View all roles') {
            displayRoles();
            console.log('View all roles');
        }
        else if (initial_question === 'View all employees') {
            displayEmployees();
            console.log('View all employees');
        }
        else if (initial_question === 'Add a department') {
            console.log('Add a department');
            insertDepartment();
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
};

    const insertDepartment = () => {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What department would you like to add?',
                validate: departmentNameInput => {
                    if(departmentNameInput) {
                        return true;
                    } else {
                        consol.log("Please enter a department name.");
                        return false;
                    }
                }
            }
        ])
        .then(({ data }) => {
            this.department_name = 
            {
                "department_name": data.departmentName
            };
            myCompany.push(this.department_name)
            console.log(myCompany);
        })
          .then(addDepartment);

    };
   


    module.exports = myCompany;

    init();

    {
        name: "choice",
        type: "rawlist",
        message: "what is the employee's role?",
        choices: function() {
            let choiceArray = [];
            for (var i=0; i < roles.length; i++) {
                choiceArray.push(roles[i].title)
            }
            return choiceArray;
        }
    },
    {
        type: "rawlist",
        name: "manager",
        message: "who is they employee's manager?",
        choices: function() {
            let choiceArray = [];
            for (var i=0; i < employees.length; i++) {
                choiceArray.push(employees[i].last_name)
            }
            return choiceArray;
        }

    },
]) .then(function(response) {
    for (var i=0; i < roles.length; i++) {
        if(roles[i].title === response.choice) {
            response.role_id = roles[i].id;
        }
    }
    for (var i=0; i < employees.length; i++) {
        if(employees[i].last_name === response.choice) {
            response.manager_id = employees[i].id;
        }
    }

    function addDep() {
        inquirer.prompt([ 
            {
                name: "newDep",
                type: "input",
                message: ["what department would you like to add?"]
            },
        ]).then(function (answer){
            var query = "INSERT INTO department SET ?"
            var addDep = connection.query(query, [{department_name: answer.newDep}], function(err) {
                if(err) throw err;
                console.table("department created!");
                start()
            })
        })
