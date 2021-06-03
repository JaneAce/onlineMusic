var express = require('express');
var router = express.Router();
var pool = require('../pool');
var mysql = require('mysql');
const session = require('express-session');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    port: '3306',
    database: 'music',
    //同时使用多条查询语句：
    multipleStatements: true
});
var datanum=3;//每页数据条数为3
var page=1;//初始化页数
var pagesql='SELECT * FROM tab_user limit'+page*datanum+','+(page+1)*datanum//分页查询数据的语句
var usersql = 'SELECT * FROM `tab_user` limit 3;SELECT * FROM `tab_mc_lib`;SELECT COUNT(user_id) AS pagetotal FROM `tab_user`'
//后台管理的路由
router.get('/',(req,res)=>{
    var username=req.session.username
    console.log(username);
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }
        if(conn){
            conn.query('SELECT isAdmin FROM `tab_user` where user_name=?',[username],function(err,result){
                if(err){
                    console.log(err)
                }
                if(result){
                    var baseData=JSON.stringify(result);
                    console.log("4"+baseData[13]);
                    if(baseData[13]==null||baseData[13]=='n'){
                        res.send('您不是管理员无法进入管理')
                    }
                    if(baseData[13]=='y'){
                        connection.query(usersql,function(err,rows){
                            if(err){
                                console.log(err)
                            }
                            if(rows){
                                res.render('background',{
                                    detail:rows[0],
                                     data:rows[1],
                                    totalPage:JSON.stringify(rows[2][0].pagetotal)},
                                     )
                            }
                        })
                    }
                }
            })
        }
    })
       

});
//用户表查询提交
router.post('/',(req,res)=>{
    var param=req.body
    var sesql='SELECT*FROM `tab_user` WHERE user_name=? AND user_email=?;SELECT * FROM `tab_mc_lib`'
    connection.query(sesql,[param.sname,param.semail],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.render('background',{
                detail:result[0],
                 data:result[1]})
                 console.log("用户表查询结果"+result[0])
        }
    })
});
//曲库表查询提交
router.post('/mc',(req,res)=>{
    var param=req.body
    var sesql='SELECT*FROM `tab_mc_lib` WHERE music_name=?;SELECT * FROM `tab_user`'
    connection.query(sesql,[param.musicName],function(err,result){
        if(err){
            console.log(err)
        }
        if(result){
            res.render('background',{
                data:result[0],
                 detail:result[1]})
                 console.log("曲库表查询查询结果"+result[0])
        }
    })
});

//删除用户数据
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
//删除曲库表数据
router.get('del/:id',function(req,res){
    var id=req.params.id 
    res.send('success')
    // var id=req.params.id
    // console.log(id)
    // var desql='DELETE FROM `tab_mc_lib` WHERE music_id=?'
    // pool.getConnection(function(err,conn){
    //     if(err){
    //         console.log(err)
    //     }if(conn){
    //         conn.query(desql,[id],function(err,result){
    //             if(err){
    //                 console.log(err)
    //             }if(result){
    //                 res.redirect('/background')
    //             }
    //         })
    //     }
    // })
})
//修改用户页面路由
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

//提交用户修改数据
router.post('/update',(req,res)=>{
    var param=req.body
    var updsql='UPDATE tab_user SET user_name=?,user_email=?,user_phone=?,user_pw=?,isAdmin=? WHERE user_id=?'
    pool.query(updsql,[param.uname,param.uemail,param.phoneno,param.pw,param.isAdmin,param.id],function(err,result){
        if(err){
            console.log(err+"修改数据失败！")
        }
        if(result){
            res.redirect('/background')
        }
    })
})
//新增用户页面的路由
router.get('/addpage',(req,res)=>{
    res.render('add');
  });

//提交新增数据
router.post('/add',(req,res)=>{
    var param=req.body
    var addsql='INSERT into tab_user(user_name,user_email,user_phone,user_pw,isAdmin) VALUES(?,?,?,?,?)';
    pool.query(addsql,[param.username,param.useremail,param.userphoneno,param.userpw,param.isAdmin],function(err,result){
        if(err){
            console.log(err+"新增数据失败")
        }
        if(result){       
            res.redirect('/background')
            console.log("新增数据"+err)
        }
    })
});
//分页
var pagesql='SELECT * FROM tab_user limit ?,?'//分页查询数据的语句
router.get('/page',(req,res)=>{
    var i = req.query.i
    pool.getConnection(function(err,conn){
        if(err){
            console.log(err)
        }
        if(conn){
            conn.query(pagesql,[i,3],function(err,result){
                if(err){
                    console.log(err)
                }
                if(result){
                    res.json(result)
                    console.log(result)
                }
            })
        }
        pool.releaseConnection(conn);
    })
})
module.exports=router;