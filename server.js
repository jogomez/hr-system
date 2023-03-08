const express = require('express');
const inquirer = require('inquirer');
const routes = require('./routes');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'hr_db'
    },
    console.log(`Connected to the hr_db database.`)
);

const main_menu = {
    addEmployee: 'Add an employee',
    updateEmployee: 'Update an employee',
    viewAllRoles: 'View all roles',
    addRole: "Add a role",
    viewAllDepartments: "View all Departments",
    addDepartment: "Add a department",
    quit: 'Quit'
}

const menuQuestions = {
    type: 'list',
    name: 'menu',
    message: 'Select an option:',
    choices: [
        main_menu.addEmployee, 
        main_menu.updateEmployeeRole, 
        main_menu.viewAllRoles, 
        main_menu.addRole, 
        main_menu.viewAllDepartments, 
        main_menu.addDepartment, 
        main_menu.quit
        ]
}

const addEmployeeQuestions = [
    {
        type: 'input',
        name: 'first_name',
        message: 'Enter the first name:',
    },
    {
        type: 'input',
        name: 'last_name',
        message: 'Enter the last name:',
    },
    {
        type: 'list',
        name: 'office',
        message: 'Select department:',
        chioces:[allDepartments]
    },
    {
        type: 'list',
        name: 'office',
        message: 'Select Manager:',
        chioces:[allEmployeesInDepartment]
    },
]

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the engineer',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the email of the engineer',
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter the number of github repository of the engineer',
    },
]

const intern_questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the intern',
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter the email of the intern',
    },
    {
        type: 'input',
        name: 'school',
        message: 'Enter the name of the school of the intern',
    },
]




