var express = require('express');
var router =express.Router();
var pool = require('../pool');

router.get('/LoginReg',(req,res)=>{
  res.render('LoginReg')
});
//注册
router.post('/LoginReg',(req,res)=>{
  var inputname=req.body.user_name;
  var param=req.body;
  var sesql ='SELECT user_name FROM `tab_user` WHERE user_name =?';
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
            res.json('该用户已被注册')
            return
           }
           else{
             conn.query(insql,[param.user_name,param.user_email,param.user_phone,param.user_pw],function(err,result){
               if (err){
                 console.log(err)
               }
               if(result){      
                 res.render('LoginReg')
               }
             })
           }
          }
      )
      pool.releaseConnection(conn);//释放连接池
    })
  })
//登入验证
router.post('/user',(req,res)=>{
 var user={
   "name":req.body.uname,
   "pw":req.body.upw
 }
  var sesql='SELECT user_name,user_pw FROM `tab_user` where user_name=? AND user_pw=?'
  console.log(user)
  pool.getConnection(function(err,conn){
    if(err){
      console.log(err)
    }
    if(conn){
      conn.query(sesql,[user.name,user.pw],function(err,result){
        if(err){
          console.log(err)
        }
        if(user.name==undefined||user.name==''){
          res.send("用户名不能空!")
          return
        }
        if(user.pw==undefined||user.pw==''){
          res.send("密码不能为空！")
          return
        }
        if(!result.length){
          res.send("用户名或密码错误")
        }
        if(result.length){
          req.session.username=user.name;
         res.send("登入成功")
        }
    }
       )}
  })
  
});

module.exports=router;


