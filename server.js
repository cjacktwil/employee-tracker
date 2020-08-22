// const express = require('express');
const mysql = require('mysql2');

const cTable = require('console.table');


// const PORT = process.env.PORT || 3001;
// const app = express();

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
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

displayDepartments = () => {
    connection.query('SELECT department_name, id FROM departments', function(err, res) {
        if(err) throw err;
        console.table(res);
    });

    connection.end();
};

displayRoles = () => {
    connection.query(
        `SELECT title, id, department_name, salary 
        FROM roles RIGHT JOIN departments ON roles.department_id = departments.id`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
        });
        connection.end();
}; 

displayEmployees = () => {
    connection.query(
        //still need to add in manager_name - not sure how to populat name based on id
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, manager_id
        FROM roles 
        RIGHT JOIN employees ON employees.role_id = roles.id 
        LEFT JOIN departments ON roles.department_id = departments.id`,
        function (err, res) {
            if(err) throw err;
            console.table(res);
        });
        connection.end();
};

addDepartment = () => {
    const sql = `INSERT INTO departments SET ?`;
    const params = {};
    connection.query(sql, params, function(err, res) {
        if (err) throw err;
        console.log('The ' + this.departments.department_name + ' department has been added.');

    });
    connection.end();
};

addRole = () => {
    const sql = 'INSERT INTO roles SET ?';
    const params = {};
    connection.query(sql, params, function (err, res) {
        if(err) throw err;
        console.log('The ' + this.roles.title + ' position has been added.');
    });
    connection.end();
};

addEmployee = () => {
    const sql = 'INSERT INTO employees SET ?';
    const params = {};
    connection.query(sql, params, function(err, res) {
        if(err) throw err; 
            console.log(this.employees.first_name + ' ' + this.employees.last_name + ' has been added.');
    });
    connection.end();
};

updateRole = () => {
    const sql = 'UPDATE employees.role_id SET employees.role_id = ? WHERE employees.id = ?';
    const params = {};
    connection.query(sql, params, function(err, res) {
        if (err) throw err;
        console.log(this.employees.first_name + " " + this.employees.last_name + "'s role has been updated.");
    });
    connection.end();
};

    