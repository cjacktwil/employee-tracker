class db {
    constructor () {
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
            startQuestions();
        //    showDepartmentNames();
        });
        

        displayDepartments = () => {
            return this.connection.promise().query('SELECT department_name, departments.id FROM departments'
            // , function(err, res) 
                // if(err) throw err;
                // console.table(res);
           );
        };

        displayRoles = () => {
            return this.connection.promise().query(
                `SELECT title, roles.id, department_name, salary 
                FROM roles LEFT JOIN departments ON roles.department_id = departments.id`
                // function (err, res) {
                //     if (err) throw err;
                //     console.table(res);
            );
        };

        displayEmployees = () => {
            return this.connection.promise().query(
                //still need to add in manager_name - not sure how to populat name based on id
                `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, manager_id
                FROM roles 
                RIGHT JOIN employees ON employees.role_id = roles.id 
                LEFT JOIN departments ON roles.department_id = departments.id`,
                // function (err, res) {
                //     if(err) throw err;
                //     // return (res);
                //     console.table(res);
                );
        };

        //Function prompts question to add a department, adds the new department to the server, and logs addition for user
// addDepartment() {
    // console.log("adding a department");
    // return inquirer.prompt(addDepartmentQuestion)
    // .then(data => {
//     return this.connection.promise().query(
//         `INSERT INTO departments SET ?`,  
//         {
//             department_name: data.newDepartmentName
//         },
//         function(err, res) {
//         if (err) throw err;
//         console.log(params + ' added');
//     });
// });
// };

// //Function prompts user to add a role title and salary - still need to work on choices for department options, and conversion to id
// addRole = () => {
//     console.log("Adding a new role.")
//     return inquirer.prompt(addRoleQuestions)
//     .then(data => {
    
//     connection.query(
//         `INSERT INTO roles SET ?`, 
//         {
//             title: data.newRoleName,
//             salary: data.newRoleSalary,
//             department_id: data.newRoleDepartment
//         },
//         function (err, res) {
//         if(err) throw err;
//         console.log(data.newRoleName + ' has been added.');
//     });
// });
// };

// addEmployee = () => {
//     console.log("adding a new employee");
//     return inquirer.prompt(addEmployeeQuestions)
//     .then(data => {
    
//     connection.query(
//         `INSERT INTO employees SET ?`,
//         {
//             first_name: data.newEmployeeFirstName,
//             last_name: data.newEmployeeLastName,
//             role_id: data.newEmployeeRoleId,
//             manager_id: data.newEmployeeManagerId
//         },
          
//         function(err, res) {
//         if(err) throw err; 
//             console.log(data.newEmployeeFirstName + " " + data.newEmployeeLastName + ' has been added.');
//     });
// });
// };
    };
};

// module.exports =  db;
 module.exports = { db };
