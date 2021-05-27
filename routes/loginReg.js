var express = require('express');
var router =express.Router();
var mysql = require('mysql');
var pool = require('../pool');
var bodyParser = require('body-parser');


var responseData;
router.use(function(req,res,next){
  responseData={
    code:0,
    message:''
  }
  next();
})

router.get('/LoginReg',(req,res)=>{
  res.render('LoginReg')
});
//注册
router.post('/LoginReg',(req,res)=>{
  var param=req.body;
  var inputname=req.body.user_name;
  var sesql ='SELECT user_name FROM `tab_user` WHERE user_name = '+uname;
  var insql='INSERT into tab_user(user_name,user_email,user_phone,user_pw) VALUES(?,?,?,?)';
    pool.getConnection(function(err,conn){
      if(err){
        console.log("连接池出错："+err)
      }
      conn.query(sesql,[inputname],function(err,result){
        if(err){
            console.log(err)
          }
          if(result.length){
            responseData.code=1;
            responseData.message='该用户已被注册'
            res.json(responseData)
            return
           }
           else{
             conn.query(insql,[param.user_name,param.user_email,param.user_phone,param.user_pw],function(err,result){
               if (err){
                 console.log(err)
               }
               else{
                 responseData.code=0;         
                 res.render('LoginReg')
               }
             })
           }
          }
      )
      pool.releaseConnection(conn);//释放连接池
    })
    console.log(req.body);
  })

//登入验证
router.post('/index',(req,res)=>{
  var un = req.body.uname;
  var pw = req.body.upassword;
  connection.query('SELECT user_name,user_pw FROM `tab_user`',[un,pw],(err,result)=>{
    if(err){
      console.log(err);
    }
    if(result.user_name!=un || result.user_pw !=pw){
      responseData.code=6;
      responseData.message='用户名或密码错误';
      alert(responseData.message)
      return false
    }
    if(result.user_name==un && result.user_pw ==pw){
      responseData.code=0;
      res.render('index')
    }
  });
});


module.exports=router;


