const cTable = require('console.table');
const inquirer = require('inquirer');
const db = require('./config/connection');
const {
    main_menu, 
    menuQuestions, 
    addEmployeeQuestions,  
    addRoleQuestions,
    updateEmployeeRoleQuestions, 
    addDepartmentQuestions,
    } = require('./src/question_helper');

function init() {
    console.clear();
    inquirer
    .prompt(menuQuestions)
    .then(data => {
        switch (data.menu){
            case main_menu.viewAllDB:
                viewAllDB();
                break;
            case main_menu.addEmployee:
                addEmployee();                
                break;
            case main_menu.updateEmployeeRole:
                updateEmployeeRole();
                break;
            case main_menu.viewAllEmployees:
                viewAllEmployees();
                break;
            case main_menu.viewAllRoles:
                viewAllRoles();
                break;
            case main_menu.addRole:
                addRole();
                break;
            case main_menu.viewAllDepartments:
                viewAllDepartments();
                break;
            case main_menu.addDepartment:
                addDepartment();
                break;                
            default:
                process.exit();    
        }
    });
}

let employee = {
    id: 0,
    first_name: "",
    last_name: "",
    role_id: 0,
    manager_id: 0,
    department_id: 0
}

function viewAllEmployees(){

    db.query (`SELECT * FROM employee`,(err,result)=>{
        if (err) { console.log(err); }
        console.table(result);
        });
    init();
}

function viewAllRoles(){

    db.query (`SELECT * FROM role`,(err,result)=>{
        if (err) { console.log(err); }
        console.table(result);
        });
    init();
}

function viewAllDepartments(){

    db.query (`SELECT * FROM department`,(err,result)=>{
        if (err) { console.log(err); }
        console.table(result);
        });
    init();
}



function updateEmployeeRole(){

    let allEmployees, allRoles = "";

    db.query (`SELECT * FROM employee`,(err,result)=>{
        if (err) { console.log(err);
                    return;}
        const allEmployees = result.map(row => {
            return {name: row.first_name + " " +row.last_name, value: row.id}
        });
        inquirer
        .prompt(updateEmployeeRoleQuestions(allEmployees,allRoles).slice(0,1))
        .then(data => {
            employee.id = data.employee_id;
            //console.table(data);
        });
    });

    db.query (`SELECT r.id, r.title FROM role as r`,(err,result)=>{
            if (err) { console.log(err);
                return;}
                const allRoles = result.map(row => {
                    return {name: row.title, value: row.id}
                });
            inquirer
            .prompt(updateEmployeeRoleQuestions(allEmployees,allRoles).slice(1))
            .then(data => { 
                    employee.role_id = data.id;
                    //console.log('data :>> ', data);
            });
    });

    db.query(`UPDATE employee
                SET role = ? WHERE CustomerID = ?;`, 
                [employee.role_id,employee.id], 
                (err,result)=>{
                    if (err) { console.log(err);
                            }
                        console.table(result);                        
                });
    init();
}

function addEmployee(){

db.query (`SELECT * FROM department`,(err,result)=>{
    
    if (err) { console.log(err);
        return;
    }

    let roleOptions, managerOptions = "";
    const departmentOptions = result.map(row => {
        return {name: row.name, value: row.id}
    });
    // ask for first name, last name, and department
    inquirer
    .prompt(addEmployeeQuestions(departmentOptions,roleOptions,managerOptions)
    .slice(0,3))
    .then(data => {
                
        employee.first_name = data.first_name;
        employee.last_name = data.last_name;
        employee.department_id = data.department;
                
        db.query(`SELECT r.id, r.title \
                FROM role AS r \
                INNER JOIN department AS d \
                ON r.department_id = d.id \
                WHERE d.id = ?`, employee.department_id, 
                (err, result) => {
                    if (err) { console.log(err);
                        }
                    else{
                        const roleOptions = result.map(row => {
                            return {name: row.title, value: row.id}
                            });
                            //ask for role
                            inquirer
                            .prompt(addEmployeeQuestions(departmentOptions,roleOptions,managerOptions)
                            .slice(3,4))
                            .then(data => {
                                //console.log('data :>> ', data);
                                employee.role_id = data.id;
                                db.query (`SELECT e.id, e.first_name, e.last_name \
                                    FROM employee AS e INNER JOIN \
                                    role AS r \
                                    ON e.role_id = r.id \
                                    INNER JOIN department AS d \
                                    ON r.department_id = d.id \
                                    WHERE d.id = ?`, employee.department_id, 
                                    (err, result) => {
                                        if (err) { console.log(err);
                                            }
                                        else{
                                            const managerOptions = result.map(row => {
                                            return {name: row.first_name + " " + row.last_name, 
                                                    value: row.id
                                                    }
                                        });
                                        // ask for manager
                                        inquirer
                                        .prompt(addEmployeeQuestions(departmentOptions,roleOptions,managerOptions)
                                        .slice(4))
                                        .then(data => {
                                        employee.manager_id = data.id;
                                        db.query(`INSERT INTO employee \
                                                (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, 
                                                    [employee.first_name, 
                                                    employee.last_name, 
                                                    employee.role_id, 
                                                    employee.manager_id], 
                                                (err,res) => {
                                                    if (err) { console.log(err);
                                                            }
                                                    else{
                                                        console.log(`Employee id: ${res.insertId} added`);                                                        
                                                        init();
                                                        }
                                                });
                                        });
                                }});
                            });
                        }});
                });
        });
}



function addRole() {
    db.query (`SELECT * FROM department`,(err,data)=>{
        
        const departmentOptions = data.map(row => {
            return {name: row.name, value: row.id}
        });

        inquirer
        .prompt(addRoleQuestions(departmentOptions))
        .then(data => {            
            db.query(`INSERT INTO role \
            (title, salary, department_id) VALUES (?,?,?)`, 
            [data.title, data.salary, data.department_id], 
            (err,res) => {
                if (err) { return (err);
                }
                else {
                    console.log(`Role id: ${res.insertId} added`);
                    init();
                    }
                });        
        });
    });
}

init();


