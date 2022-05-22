const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

class Roles {
    constructor () {}

    static async getTable (startApp) {
        db.query(`SELECT role.id, role.title, role.salary, department.name AS department_name FROM role LEFT JOIN department ON role.department_id = department.id`, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;                
            }
            console.table('\n', rows, '\n');
            startApp();
        }); 
    }

    static async addToTable (startApp) {

        db.query(`SELECT * FROM department`, (err, rows) => {
            if (err) throw err;
            let departments = rows.map(department => ({name: department.name, value: department.id }));
            inquirer.prompt([
                {
                    name: 'roleTitle',
                    type: 'input',
                    message: 'What is the name of the role you want to add?',
                    validate: roleName => {
                        if (roleName) {
                            return true;
                        } else {
                            console.log("Please enter the role's name!");
                            return false;
                        }
                    }   
                },
                {
                    name: 'roleSalary',
                    type: 'input',
                    message: 'What is the salary of the role you want to add?',
                    validate: roleSalary => {
                        if (roleSalary) {
                            return true;
                        } else {
                            console.log("Please enter the role's salary!");
                            return false;
                        }
                    }   
                },
                {
                    name: 'roleDepartment',
                    type: 'list',
                    message: 'Which department does the new role belong to?',
                    choices: departments
                },
            ]).then((response) => {
                db.query(`INSERT INTO role SET ?`, 
                {
                    title: response.roleTitle,
                    salary: response.roleSalary,
                    department_id: response.roleDepartment,
                },
                (err, res) => {
                    if (err) throw err;
                    console.log(`\n ${response.roleTitle} successfully added to database! \n`);
                    startApp();
                })
            });
        });
    }
}

module.exports = Roles;