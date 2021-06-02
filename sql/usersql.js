var mysql =require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    port: '3306',
    database: 'music',
    //同时使用多条查询语句：
    multipleStatements: true
});
module.exports=connection;