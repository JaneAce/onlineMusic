var express = require('express');
const session = require('express-session');
var router = express.Router();

router.get('/',(req,res)=>{
    var username=req.session.username
    if(username==undefined){
        res.send('请先登入！')
    }
    res.render('user',{username:req.session.username});
    console.log("session的"+req.session.username)
});

module.exports=router;