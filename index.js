const inquirer = require('inquirer');
const Departments = require('./lib/Departments');
const Roles = require('./lib/Roles');
const Employees = require('./lib/Employees');

function startApp () {

    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ['View all Departments', 'View all Roles', 'View all Employees',
                'Add a Department', 'Add a Role', 'Add an Employee',
                'Update an Employee Role', new inquirer.Separator(), 'Exit', new inquirer.Separator()
            ]
        }
    ])    
    .then(choice => {
        switch (choice.options) {
            case 'View all Departments':
                Departments.getTable(startApp);
                break;
            case 'View all Roles':
                Roles.getTable(startApp);
                break;
            case 'View all Employees':
                Employees.getTable(startApp);
                break;
            case 'Add a Department':
                Departments.addToTable(startApp);
                break;
            case 'Add a Role':
                Roles.addToTable(startApp);
                break;
            case 'Add an Employee':
                Employees.addToTable(startApp);
                break;
            case 'Update an Employee Role':
                Employees.updateTable(startApp);
                break;
            case 'Exit':
                break;
        }
    });
};

startApp();
