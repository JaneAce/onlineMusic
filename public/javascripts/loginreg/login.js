$(function(){
    $("#regin").click(function(){
        $("#log").hide();
        $("#reg").show();
        
    });
    $("#login").click(function(){
        $("#log").show();
        $("#reg").hide();
    });
    //登入
    $("#Login").click(function(){
        $.ajax({
            type:'post',
            url:'/user',
            data:{
                uname:$("#uname").val(),
                upw:$("#upw").val()
            },
            dataType:'text',
            success:function(data){
                alert(data);
                if(data=="登入成功"){
                    setTimeout(function(){
                        window.location.href='/user'
                    },1000)
                }
                  }
            
        })
    })
    
    $(".four").mouseover(function(){
        $("body").css( "background-image" ,"url('/images/5.gif')");
    });
});
//验证注册名
function checkName(){
    var username=document.getElementById("username").value;
    var reg=/^[\u4e00-\u9fa5]+$/;
    if(reg.test(username)){
        return ture
    }
    else if(!reg.test(username)){
        document.getElementById("errName").innerHTML="用户名不能含非中文！";
        return false
    }
    else if(username==''||username==undefined){
        document.getElementById("errName").innerHTML="用户名不能为空";
        return false
    }
}
function checkEmail(){
    var useremail = document.getElementById("useremail").value;
    var qqemail=/[1-9]\d{7,10}@qq\.com/;
    if(qqemail.test(useremail)){
        return ture
    }
    else if(!qqemail.test(useremail)){
        document.getElementById("errEmail").innerHTML="请输入正确的邮箱格式！";
    }
    else if(useremail==''||useremail==undefined){
        
        document.getElementById("errEmail").innerHTML="邮箱不能为空";
        return false
    }
    else{
        return false
    }
}
function checkPhone(){
    var userphone=document.getElementById("userphoneno").value;
    if (userphone.length==11) {
        return ture
    }
    if(userphone.length!=11){
        document.getElementById("errPhone").innerHTML="请输入长度为11位的正确电话号码";
        return false 
    }
    if( userphone ==''|| userphone==undefined){
        document.getElementById("errPhone").innerHTML="电话号码不能为空";
        return false
    }
    else{
        return false
    }
}
function checkPw(){
    var userpw=document.getElementById("userpw").value;
    var pw=/^[0-9]{6,18}$/;//6~18位数字
    if(pw.test(userpw)){
        return ture
    }
    else if(!pw.text(userpw)){
        document.getElementById("errPw").innerHTML="请输入6~18位的数字密码";
        return false
    }
    else if(userpw==''||userpw==undefined){
        
        document.getElementById("errPw").innerHTML="密码不能为空";
        return false
    }
    else{
        document.getElementById("errPw").innerHTML="请输入正确的密码格式";
        return false
    }
}
function checkAll(){
    var uname=checkName();
    var uphone=checkPhone();
    var upw=checkPw();
    var uem=checkEmail();
    if(uname||uphone||upw||uem==false){
        document.getElementById("errAll").innerHTML="不能为空";
        console.log("全部为false")
        return false
        
    }
    else{
        console.log("全部为ture")
        return ture
        
    }
}

