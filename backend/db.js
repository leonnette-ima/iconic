const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'shop_db'
});

db.connect(err => {
    if(err) throw err;
    console.log('Connexion DB réussie');
});

module.exports = db;
