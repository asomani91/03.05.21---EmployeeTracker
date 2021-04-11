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
        console.log("Department Table Created");
    });


    con.query(sql2, function (err, result) {
        if (err) throw err;
        console.log("Role Table Created");
    });

    con.query(sql3, function (err, result) {
        if (err) throw err;
        console.log("Employee Table Created");
    });

    inquirer.prompt([
        {
            type: "list",
            name: "list",
            message: "Add to Department, Role or Employee",
            choices: ["Add Employee, Role & Department", "View Employee, Role & Department", "Update Employee Roles"],
        },
        {
            type: "list",
            name: "which",
            message: "Select Where You'd Like To Add",
            choices: ["Department", "Employee", "Role"],
            when: (answers) => answers.list == "Add Employee, Role, & Department"
        },
        {
            type: "input",
            name: "which",
            message: "Enter Employee ID & Role ID To Update",
            when: (answers) => answers.list == "Update Employee Roles",

            validate: function (input) {
                // DECLARE FUNCTION AS ASYNCHRONOUS & SAVE THE CALLBACK //
                var done = this.async();
                setTimeout(function () {
                    const l = input.split(" ");
                    var sql = "UPDATE employee SET role_id = " + l[1] + " WHERE id = " + l[0];
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("1 Record Updated");
                    });
                    done(null, true);
                    return;
                }, 100);
            }
        },

        {
            type: "list",
            name: "View",
            message: "Select Where You Want To Add",
            choices: ["Department", "Employee", "Role"],
            when: (answers) => answers.list == "View Employee, Role & Department"
        },
        {

            name: "Department",
            message: "Enter Name Of Department",
            when: (answers) => answers.View_What == "Department",
            validate: function (input) {
                // DECLARE FUNCTION AS ASYNCHRONOUS & SAVE THE CALLBACK //
                var done = this.async();

                setTimeout(function () {
                    var sql = "SELECT * FROM department";
                    con.query(sql, function (err, result, fields) {
                        if (err) throw err;
                        console.log(result);
                    });
                    done(null, true);
                    return;
                }, 100);
            }
        },

        {
            name: "Role",
            message: "Enter Name Of Department",
            when: (answers) => answers.View_What == "Role",
            validate: function (input) {
                // DECLARE FUNCTION AS ASYNCHRONOUS & SAVE THE CALLBACK //
                var done = this.async();
                setTimeout(function () {
                    var sql = "SELECT * FROM role";
                    con.query(sql, function (err, result, fields) {
                        if (err) throw err;
                        console.log(result);
                    });
                    done(null, true);
                    return;
                }, 100);
            }
        },

        {
            type: "input",
            name: "Employee",
            message: "Enter first_name,last_name,role_id & department_id",
            when: (answers) => answers.which == "Employee",
            validate: function (input) {
                // DECLARE FUNCTION AS ASYNCHRONOUS & SAVE THE CALLBACK //
                var done = this.async();
                setTimeout(function () {
                    const l = input.split(" ");
                    var sql = "INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES ('" + l[0] + "','" + l[1] + "'," + l[2] + "," + l[3] + ")";
                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log("1 record inserted");
                    });
                    done(null, true);
                    return;
                }, 100);
            }
        },

    ])
        .then(answers => {
            console.info("Answer:", "Done");
        })
});
