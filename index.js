const inquirer = require('inquirer');
const db = require('./db/connection');


db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    startApp();
});

const startApp = () => {
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
    .then(response => {
        switch (response.options) {
            // case 'View all Departments':

            //     break;
            // case 'View all Roles':
            //     break;
            // case 'View all Employees':
            //     break;
            // case 'Add a Department':
            //     break;
            // case 'Add a Role':
            //     break;
            // case 'Add an Employee':
            //     break;
            // case 'Update an Employee Role':
            //     break;
            case 'Exit':
                break;
        }
    })
};