var express = require('express');
var router =express.Router();
var mysql = require('mysql');


router.get('/',(req,res)=>{
  res.render('LoginReg')
});
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'music',
  port:'3306'
});
connection.connect();

router.post('/',(req,res)=>{
  var params = req.body;
  console.log(params);
  connection.query('INSERT into `tab_user`(user_name,user_f_pw,user_l_pw,user_email) VALUES(?,?,?,?)',[params.user_name,params.user_email,params.user_f_pw,params.user_l_pw],function(err,result){
    if(err){
      console.log(err)
    }
    if(result){
    }
    res.render('index')
  })
});
router.post('/Reg',(req,res)=>{
  var un = req.params.uname;
  var pw = req.params.upassword;
  connection.query('SELECT * FROM `tab_user`',[un,pw],(err,result)=>{
    if(err){
      console.log(err);
    }
    if(result.user_name==un && result.user_l_pw==pw){
      res.render('index');
    }
  })
  connection.end();
});


module.exports=router;


