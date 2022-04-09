let mysql = require('mysql');


let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database : 'menrel_shopp'

});

db.connect((err)=>{
    if(err) throw err

    console.log('connexions etablie sur menrel_shopp');
})

module.exports = db;