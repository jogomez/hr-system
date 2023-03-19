
const main_menu = {
    viewAllDB: 'View Employees, Roles, and Departments',
    addEmployee: 'Add an Employee',
    updateEmployeeRole: 'Update an Employee\'s Role',
    viewAllRoles: 'View all Roles',
    viewAllEmployees : "View all Employees",
    addRole: "Add a Role",
    viewAllDepartments: "View all Departments",
    addDepartment: "Add a Department",
    quit: 'Quit'
}

const menuQuestions = {
    type: 'list',
    name: 'menu',
    message: 'Select an option:',
    choices: [
        main_menu.viewAllDB,
        main_menu.viewAllEmployees,
        main_menu.viewAllRoles, 
        main_menu.viewAllDepartments, 
        main_menu.addEmployee, 
        main_menu.addRole,
        main_menu.addDepartment,  
        main_menu.updateEmployeeRole, 
        main_menu.quit
        ]
}

const addEmployeeQuestions = (allDepartments, allRolesInDepartment, allEmployeesInDepartment) => [
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
        name: 'department',
        message: 'Select department:',
        choices: allDepartments
    },
    {
        type: 'list',
        name: 'role',
        message: 'Select role:',
        choices: allRolesInDepartment
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Select the manager:',
        choices: allEmployeesInDepartment
    }
]

const addRoleQuestions = (allDepartments) => [
    {
        type: 'input',
        name: 'title',
        message: 'Enter the title of the role',
    },
    {
        type: 'input',
        name: 'salary',
        message: 'Enter the salary for the role',
    },
    {
        type: 'list',
        name: 'department_id',
        message: 'Select the role\'s department:',
        choices: allDepartments
    },
]

const updateEmployeeRoleQuestions = (allEmployees, allRoles) => [
    {
        type: 'list',
        name: 'employee_id',
        message: 'Select the employee to update:',
        choices: allEmployees
    },
    {
        type: 'list',
        name: 'role',
        message: 'Select the new role:',
        choices: allRoles
    }

]

const addDepartmentQuestions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter the name of the department',
    },
]

module.exports = {
    main_menu, 
    menuQuestions, 
    addEmployeeQuestions,  
    addRoleQuestions,
    updateEmployeeRoleQuestions, 
    addDepartmentQuestions
};