const db = require('../db/connection');
const cTable = require('console.table');
const inquirer = require('inquirer');


class Departments {
    constructor () {}

    static async getTable (startApp) {
        db.query(`SELECT department.id, department.name AS department_name FROM department`, (err, rows) => {
            if (err) {
                console.log(err.message);
                return;                
            }
            console.table('\n', rows , '\n');
            startApp();
        });        
    }

    static async addToTable (startApp) {

        inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'What is the name of the department you want to add?',
                validate: departmentName => {
                    if (departmentName) {
                        return true;
                    } else {
                        console.log("Please enter the department's name!");
                        return false;
                    }
                }            
            }

        ]).then(response => {
            
            const sql = `INSERT INTO department (name) VALUES (?)`;

            const params = [response.departmentName];

            db.query(sql, params, (err, rows) => {
                if (err) {
                    console.log(err.message);
                    return;                
                }
                console.log(`\n ${response.departmentName} successfully added to database! \n`);
                startApp();
            }); 
        
        });
      
    }
}

module.exports = Departments;