var mysql = require('mysql');
var inquirer = require('inquirer');
const { async } = require('rxjs');

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "mydb"

});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    var sql1 = "CREATE TABLE department (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
    var sql2 = "CREATE TABLE role (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255),salary DECIMAL(10,2),department_id INT,FOREIGN KEY (department_id) REFERENCES department(id))";
    var sql3 = "CREATE TABLE employee (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255),last_name VARCHAR(255),role_id INT,manager_id INT,FOREIGN KEY (role_id) REFERENCES role(id))";

    con.query(sql1, function (err, result) {
        if (err) throw err;
        console.log("Departmentt Table created");
    });


    con.query(sql2, function (err, result) {
        if (err) throw err;
        console.log("Role Table created");
    });

    con.query(sql3, function (err, result) {
        if (err) throw err;
        console.log("Emplyee Table created");
    });