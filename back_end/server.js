const mysql = require('mysql')
const express = require('express')
var app = express()

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cnss',
    multipleStatements: true
})

mysqlConnection.connect()

// afficher tous les agents
app.get('/agents', (req, res) => {
    mysqlConnection.query('SELECT * FROM agents', (err, rows, fields) => {
        if (!err)
            res.send(rows)
        else
            console.log(err)
    })
})

// ajouter un employee
app.post('/add', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

app.listen(3000, () => console.log('Server is Running on Port : 3000'))