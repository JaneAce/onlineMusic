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

router.get('/',(req,res)=>{
  res.render('LoginReg')
});
//注册
router.post('/LoginReg',(req,res,next)=>{
  var param=req.body;
  var sesql ='SELECT user_name from tab_user';
  var insql='INSERT into tab_user(user_name,user_email,user_phone,user_pw) VALUES(?,?,?,?)';
    if(param.user_name==''){
      responseData.code=1;
      responseData.message='用户名不能为空';
      res.json(responseData);
      console.log(req.body.user_name)
      return false
    }
    if(param.user_email==''){
      responseData.code=2;
      responseData.message='邮箱不能为空';
      res.json(responseData);
      return false
    }
    if(param.user_phone==''){
      responseData.code=3;
      responseData.message='电话号码不能为空';
      res.json(responseData);
      return false
    }
    if(param.user_pw==''){
      responseData.code=4;
      responseData.message='密码不能为空';
      res.json(responseData);
      return false
    }
    if(pool.query(sesql,[param.user_name],function(result){
      if(result==req.body.user_name){
        responseData.code=5;
        responseData.message='该用户被注册';
        res.json(responseData);
        return false
      }
    }))
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
router.post('/LoginReg',(req,res)=>{
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


