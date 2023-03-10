const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'hr_db'
    },
    console.log(`Connected to the hr_db database.`)
);

module.exports = db;