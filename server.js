// const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
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
})

// connection.get('/', (req, res) => {
//     res.json({
//         message: "Hello World"
//     });
// });

//Connect to database
// const db = new mysql2.Database('./db/company.db', err => {
//     if(err) {
//         return console.error(err.message);
//     }
//     console.log('Connected to the company database.');
// });

//Catch-all default response
// connection.use((req, res) => {
//     res.status(404).end();
// });





// connection.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// })