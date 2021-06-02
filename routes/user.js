var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('user',{username:req.session.username});
    console.log("session的"+req.session.username)
});

module.exports=router;