# Employee Tracker System

## Description

This is command-line application to manage the employees of a company.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Tests](#testing)

## Features

There are three objects in the system: employee, role, and department.
Users can add and view employees, roles, and departments of the company. They can also add an instance of each of the objects. Additionally, they can update the role of a user in case they are promoted, for example.

## Installation

Download or clone this project, open it in your local, and run ```npm start```

## Usage

Follow the instructions of the main menu to review the existing data in the database.
There are also options to add an Employee, Role, and Department.

Notes: 
When adding an employee, make sure the corresponding Deparment and Role already exist, otherwise, the system will ask you to add a first Role for the selected Department. 
To select a manager for a new employee, you can choose from all the employees in the Department. If it is a new Department, and there are no employees in the deparment yet, the system will default the manager to be employee id = 1.

## License

![license](https://img.shields.io/badge/license-MIT-green)

## Tests

- Enter an employee in an existing role and department 
- Enter an employee in a department without roles
- Enter an employee in a department without employees
- Enter a role 
- Enter a department