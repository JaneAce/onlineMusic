var express = require('express');
var router = express.Router();
var pool = require('../pool');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    port: '3306',
    database: 'music',
    //同时使用多条查询语句：
    multipleStatements: true
});
var usersql = 'SELECT * FROM `tab_user` limit 1,6;SELECT * FROM `tab_mc_lib`'

router.get('/',(req,res)=>{
       connection.query(usersql,function(err,result){
           if(err){
               console.log(err)
           }
           if(result){
               res.render('background',{
                   detail:result[0],
                    data:result[1]})
           }
       })

});
//删除数据
// router.post('/',(req,res)=>{
//     var desql='delete from tab_user where user_id=?'+data
//     pool.query(desql,[req.body.user_name,req.body.user_email,req.body.user_phone,req.body.user_pw],(err,result)=>{
//         if(err){
//             console.log(err+"删除数据失败！")
//             return
//         }
//         if(result){
//             res.redirect('/background')
//             return
//         }
//     })
   
//   });
//新增页面的路由
router.get('/addpage',(req,res)=>{
    res.render('add');
  })
//修改页面路由
router.get('/update',(req,res)=>{
    console.log(req.query.id)
    var upsql='select*from tab_user where user_id =79'
        pool.query(upsql,[req.query.id],function(err,result){
            if(err){
                console.log("查询失败");
            }
            if(result){
                res.render('update',{result:result[0]});
                console.log(result);
            }
        })       
});
//提交修改数据
router.post('/update',(req,res)=>{
    var param=req.body
    var updsql='UPDATE tab_user SET user_name=?,user_email=?,user_phone=?,user_pw=? WHERE user_id=2'
    pool.query(upsql,[param.uname,param.uemail,param.phoneno,param.pw],function(err,result){
        if(err){
            console.log(err+"修改数据失败！")
        }
        if(result){
            res.redirect('/background')
        }
    })
})
//提交新增数据
router.post('/',(req,res)=>{
    var param=req.body
    var addsql='INSERT into tab_user(user_name,user_email,user_phone,user_pw,isAdmin) VALUES(?,?,?,?,?)';
    pool.query(addsql,[param.username,param.useremail,param.userphoneno,param.userpw,param.isAdmin],function(err,result){
        if(err){
            console.log(err+"新增数据失败")
        }
        if(result){       
    res.redirect('/background')
        }
    })
})
module.exports=router;