const mysql = require('mysql')
require('dotenv').config()
const express = require('express')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
var app = express()

// for parsing application/json
app.use(express.json())


// node mailer
var transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.GMAIL_USER,
        pass : process.env.GMAIL_PASSWORD
    }
})

const app = express();
app.use(...);

const db = require("./app/models");
db.sequelize.sync();

app.listen(3000, () => console.log('Server is Running on Port : 3000'))