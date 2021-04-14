const mysql = require('mysql')
require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
var app = express()

// jsonwebtoken for agent auth:


// node mailer
var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.GMAIL_USER,
        pass : process.env.GMAIL_PASSWORD
    }
})

// mysql config
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

// midlleware for agent auth
function auth (req, res, next) {
    const autHeader = req.headers['authorization']
    const token = autHeader && autHeader.split(' ')[1]
    if(token == null){
        return res.sendStatus(403)
    }
    const code = jwt.verify(token, process.env.ACCESS_TOKEN)
    const agent = mysqlConnection.query(`SELECT * FROM agents WHERE id LIKE = ${code.id} `)

    req.agent = agent
    next()
}

// post token for agent
app.post('/auth', auth, (req, res, next) => {
    const email = req.body
    mysqlConnection.query(`SELECT * FROM agents WHERE email LIKE = '${email}' `).then(partici => {
        if(!partici) {
            res.json({message : "You re Not Allowed"})
        } else {
            const email = req.body.email
            const parti = {parti_name : email}
            const accessToken = jwt.sign(parti, process.env.ACCESS_TOKEN)
            res.json({accessToken : accessToken})
            res.parti = parti
            next()
        }
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