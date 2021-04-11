var mysql = require('mysql');
var inquirer = require('inquirer');
const { async } = require('rxjs');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "mydb"

});

