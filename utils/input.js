// const { departments } = require('company.db');
const { connection } = require('../server');

const initialQuestion = [
     {
         type: 'list',
         name: 'initial_question',
         message: 'What would you like to do?',
         choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', "Update an employee's role"]
     }   
    ];


const addDepartmentQuestion = [
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
        ];

const addRoleQuestions = [
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
        choices: function () {
            connection.connect(err => {
                if(err) throw err;
                // console.log('connected as id ' + connection.threadId + '\n');
            //    showDepartmentNames();
            
           connection.query(`SELECT department_name FROM departments`, function (err, res) {
if (err) throw err;
// console.log(res);
        let departmentArray = [];
            for (i=0; i < res.length; i++) {
                departmentArray.push(res[i].department_name)
            }
            return departmentArray;
            // console.log(departmentArray);
            });
        });
        }
        
    }
];


const addEmployeeQuestions = [
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
    // },
    //need questions that include existing arrays as choices
    // {
    //     type: 'list',
    //     name: 'newEmployeeRole',
    //     message: `Please select the new employee's role.`,
    //     choices: displayRoles()
    // },
    // {
    //     type: 'list',
    //     name: 'newEmployeeManager',
    //     message: `Please select the new employee's manager.`,
    //     choices: displayEmployeeNames()
    }
];

module.exports = { initialQuestion, addDepartmentQuestion, addRoleQuestions, addEmployeeQuestions };



