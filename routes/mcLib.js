var express = require('express');
const pool = require('../pool');
var router =express.Router();

  pool.getConnection(function(err,conn){
    if(err){
      console.log("连接池"+err)
    }
    if(conn){
      conn.query('SELECT * FROM `tab_mc_lib`',function(err,result){
        if(err){
          console.log("连接错误"+err)
        }
        if(result){
          router.get('/mcLib',function(req,res){
            res.render('mcLib',{detail:result})
          });
        }
      })
    }
    pool.releaseConnection(conn);
  })



module.exports=router;