const mysql =require("mysql");

const db = mysql.createConnection({
    host : "mysql-test-jaeju.cfhhbejfh7s0.ap-northeast-2.rds.amazonaws.com",
    user : "admin",
    password : "tkarnrdbtk1",
    database : "mysql_test"
});

db.connect();



module.exports = db;