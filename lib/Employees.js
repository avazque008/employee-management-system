const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');

class Employees {
    constructor () {}

    static async getTable (startApp) {
        db.query(`SELECT e.id, e.first_name, e.last_name, role.title, department.name as department_name, role.salary, CONCAT(m.first_name, ' ', m.last_name) manager FROM employee m RIGHT JOIN employee e ON e.manager_id = m.id JOIN role ON e.role_id = role.id JOIN department ON department.id = role.department_id ORDER BY e.id`, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;                
            }
            console.table('\n', rows, '\n');
            startApp();
        }); 
    }
}

module.exports = Employees;