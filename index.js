var mysql = require("mysql");
var inquirer = require("inquirer");
const { async } = require("rxjs");

// var con = mysql.createConnection({
//   host: "us-cdbr-east-03.cleardb.com",
//   user: "b0e2c319f73269",
//   password: "63daf449",
//   database: "heroku_723b3053db3b507",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql1 =
//     "CREATE TABLE department (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255))";
//   var sql2 =
//     "CREATE TABLE role (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255),salary DECIMAL(10,2),department_id INT,FOREIGN KEY (department_id) REFERENCES department(id))";
//   var sql3 =
//     "CREATE TABLE employee (id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(255),last_name VARCHAR(255),role_id INT,manager_id INT,FOREIGN KEY (role_id) REFERENCES role(id))";

//   con.query(sql1, function (err, result) {
//     if (err) throw err;
//     console.log("Department Table Created");
//   });

//   con.query(sql2, function (err, result) {
//     if (err) throw err;
//     console.log("Role Table Created");
//   });

//   con.query(sql3, function (err, result) {
//     if (err) throw err;
//     console.log("Employee Table Created");
//   });
// });

var departments = [{ id: 5567, name: "mathematics" }];
var roles = [
    { id: 88891, title: "janitor", salary: 50000, department_id: 5567 },
];
var employees = [
    { id: 13, first_name: "jim", first_name: "smith", role_id: 88891 },
];

const askInput = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "list",
                message: "Add to Department, Role or Employee",
                choices: [
                    "Add Employee, Role & Department",
                    "View Employee, Role & Department",
                    "Update Employee Roles",
                ],
            },
            {
                type: "list",
                name: "category",
                message: "Select Where You'd Like To Add",
                choices: ["Department", "Employee", "Role"],
                when: (answers) => answers.list == "Add Employee, Role & Department",
            },
            {
                type: "input",
                name: "newDepartment",
                message: "Enter Name of Department",
                choices: ["Department", "Employee", "Role"],
                when: (answers) => answers.category == "Department",
            },
            {
                type: "input",
                name: "newRole",
                message: "Enter Name of New Role",
                choices: ["Department", "Employee", "Role"],
                when: (answers) => answers.category == "Role",
            },
            {
                type: "input",
                name: "newEmployee",
                message:
                    "Enter first_name,last_name,role_id & department_id of new employee",
                choices: ["Department", "Employee", "Role"],
                when: (answers) => answers.category == "Employee",
            },

            {
                type: "input",
                name: "updateEmployee",
                message: "Enter Employee ID & Role ID To Update",
                when: (answers) => answers.list == "Update Employee Roles",
            },

            {
                type: "list",
                name: "View",
                message: "Select what you want to view",
                choices: ["Department", "Employee", "Role"],
                when: (answers) => answers.list == "View Employee, Role & Department",
            },
        ])
        .then((answers) => {
            if (answers.newDepartment) {
                departments.push({
                    id: Math.floor(Math.random() * 9999),
                    name: answers.newDepartment,
                });
            }
            if (answers.newRole) {
                roles.push({
                    id: Math.floor(Math.random() * 9999),
                    title: answers.newRole,
                });
            }
            if (answers.newEmployee) {
                let params = answers.newEmployee.split(" ");
                employees.push({
                    id: Math.floor(Math.random() * 9999),
                    first_name: params[0],
                    last_name: params[1],
                    role_id: params[2],
                    department_id: params[3],
                });
            }
            if (answers.updateEmployee) {
                let params = answers.updateEmployee.split(" ");
                console.log("setting role of employee ", params);

                // find the employee by id
                for (const i in employees) {
                    let elem = employees[i];
                    if (elem.id == parseInt(params[0])) {
                        employees[i].role_id = parseInt(params[1]);
                    }
                }
            }

            if (answers.View == "Department") {
                console.log("\n Departments : \n ");
                console.table(departments);
            }
            if (answers.View == "Role") {
                console.log("\n Roles : \n ");
                console.table(roles);
            }
            if (answers.View == "Employee") {
                console.log("\n Employees : \n ");
                console.table(employees);
            }

            askInput();
        });
};

askInput();
