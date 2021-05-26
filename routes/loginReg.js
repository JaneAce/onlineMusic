var express = require('express');
var router =express.Router();
var mysql = require('mysql');
var pool = require('../pool');


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
router.post('/LoginReg',(req,res,next)=>{
  var param=req.body;
  var sesql ='SELECT user_name from tab_user';
  var insql='INSERT into tab_user(user_name,user_email,user_phone,user_pw) VALUES(?,?,?,?)';
    // if(pool.query(sesql,[param.user_name],function(result){
    //   if(result==req.body.user_name){
    //     responseData.code=5;
    //     responseData.message='该用户被注册';
    //     res.send(responseData);
    //     return false
    //   }
    // }))
    pool.query(insql,[req.body.user_name,req.body.user_email,req.body.user_phone,req.body.user_pw],function(err,result){
      if(err){
        console.log(err)
      }
      if(result){
        res.render('LoginReg')
        return true
      }
    });
});


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


