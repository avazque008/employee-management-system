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

    static async addToTable (startApp) {
        db.query(`SELECT * FROM role`, (err, res) => {
            if (err) throw err;
            let roles = res.map(role => ({name: role.title, value: role.id }));
            db.query(`SELECT * FROM employee`, (err, res) => {
                if (err) throw err;
                let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id}));
                employees.push({name: 'No Manager', value: null })
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'employeeFirstName',
                        message: 'What is the new employee\'s first name?'
                    },
                    {
                        type: 'input',
                        name: 'employeeLastName',
                        message: 'What is the new employee\'s last name?'
                    },
                    {
                        type: 'list',
                        name: 'employeeRole',
                        message: 'What is the new employee\'s role?',
                        choices: roles
                    },
                    {
                        type: 'list',
                        name: 'employeeManager',
                        message: 'Who is the new employee\'s manager?',
                        choices: employees
                    }
                ]).then((response) => {
                    db.query(`INSERT INTO employee SET ?`, 
                    {
                        first_name: response.employeeFirstName,
                        last_name: response.employeeLastName,
                        role_id: response.employeeRole,
                        manager_id: response.employeeManager,
                    }, 
                    (err, res) => {
                        if (err) throw err;
                        console.log(`\n ${response.employeeFirstName} ${response.employeeLastName} successfully added to database! \n`);
                        startApp();
                    })
                })
            })
        })
    }

    static async updateTable (startApp) {
        db.query(`SELECT * FROM role`, (err, res) => {
            if (err) throw err;
            let roles = res.map(role => ({name: role.title, value: role.id }));

            db.query(`SELECT * FROM employee`, (err, res) => {
                if (err) throw err;
                let employees = res.map(employee => ({name: employee.first_name + ' ' + employee.last_name, value: employee.id }));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'employee',
                        message: 'Which employee would you like to update the role for?',
                        choices: employees
                    },
                    {
                        type: 'list',
                        name: 'employeeNewRole',
                        message: 'What should the employee\'s new role be?',
                        choices: roles
                    },
                ]).then((response) => {
                    db.query(`UPDATE employee SET ? WHERE ?`, 
                    [
                        {
                            role_id: response.employeeNewRole,
                        },
                        {
                            id: response.employee,
                        },
                    ], 
                    (err, res) => {
                        if (err) throw err;
                        console.log(`\n Successfully updated employee's role in the database! \n`);
                        startApp();
                    })
                })
            })
        })
    }
}

module.exports = Employees;