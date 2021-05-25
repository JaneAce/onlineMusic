var  mysql = require('mysql');
创建连接池
const pool = mysql.createPool({
	host:'localhost',
	port:'3306',
	user:'root',
	password:'password',
	database:'music',
	// connectionLimit:20  //连接池数量（意思不准确）
});
//导出模块
module.exports=pool;
