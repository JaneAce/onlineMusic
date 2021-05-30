var express = require('express');
var router = express.Router();
var pool =require('../pool');

router.get('/',(req,res)=>{
    pool.getConnection(function(err,conn){
        if (err) {
            console.log(err)
        }
        if(conn){
            conn.query('SELECT * FROM `tab_mc_lib`',function(err,result){
                if(err){
                    console.log(err)
                }
                if(result){
                    res.render('songList',{detail:result})
                }
            })
        }
    })
});
module.exports = router;