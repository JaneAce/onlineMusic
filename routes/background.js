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
var usersql = 'SELECT * FROM `tab_user` limit 0,6;SELECT * FROM `tab_mc_lib`;SElECT isAdmin FROM `tab_user`'
//后台管理的路由
router.get('/',(req,res)=>{
       connection.query(usersql,function(err,result){
           if(err){
               console.log(err)
           }
           if(result){
               res.render('background',{
                   detail:result[0],
                    data:result[1]})
                    console.log("get的数据"+result[0])
           }
       })

});
//查询提交
router.post('/',(req,res)=>{
    var param=req.body
    var sesql='SELECT*FROM `tab_user` WHERE user_name=? AND user_email=?;SElECT isAdmin FROM `tab_user`'
    connection.query(sesql,[param.sname,param.semail],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.render('background',{
                detail:result[0],
                 data:result[1]})
                 console.log("查询结果"+result[0])
        }
    })
});
//删除数据
router.get('/delete/:id',function(req,res){
    var id=req.params.id
    console.log(id)
    var desql='DELETE FROM`tab_user` WHERE user_id=?'
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }if(conn){
            conn.query(desql,[id],function(err,result){
                if(err){
                    console.log(err)
                }
                if(result){
                    res.redirect('/background')
                }
            })
        }
        pool.releaseConnection(conn);
    })
})

//修改页面路由
router.get('/update/:id',(req,res)=>{
    var id=req.params.id
    console.log(req.params.id)
    var upsql='select*from tab_user where user_id=?'
        pool.query(upsql,[id],function(err,result){
            if(err){
                console.log("删除失败");
            }
            if(result){
                res.render('update',{detail:result});
                console.log(result);
            }
        })       
});
//提交修改数据
router.post('/update',(req,res)=>{
    var param=req.body
    var updsql='UPDATE tab_user SET user_name=?,user_email=?,user_phone=?,user_pw=? WHERE user_id=?'
    pool.query(updsql,[param.uname,param.uemail,param.phoneno,param.pw,param.id],function(err,result){
        if(err){
            console.log(err+"修改数据失败！")
        }
        if(result){
            res.redirect('/background')
        }
    })
})
//新增页面的路由
router.get('/addpage',(req,res)=>{
    res.render('add');
  });

//提交新增数据
router.post('/update',(req,res)=>{
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
});

module.exports=router;