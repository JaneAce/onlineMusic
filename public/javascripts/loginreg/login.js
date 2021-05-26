
$(function(){
    $("#regin").click(function(){
        $("#log").hide();
        $("#reg").show();
        
    });
    $("#login").click(function(){
        $("#log").show();
        $("#reg").hide();
    });
    //注册
    // $("#Reg").click(function(){
    //     $.ajax({
    //         type:'post',
    //         url:'/LoginReg',
    //         data:{
    //             user_name:$("#user_name").val(),
    //             user_pw:$Reg.$("#user_pw").val(),
    //         },
    //         dataType:'json',
    //         success:function(result){
    //             if (result.code == 0) {
    //                 alert('注册成功')
    //                 window.location.href ='LoginReg';
    //               } else {
    //                 alert(result.message);
    //               }
    //         }
    //     })
    // });
    //登入
    $("#Login").click(function(){
        $.ajax({
            type:'post',
            url:'/index',
            dataType:'json',
            data:{
                user_name:$("#user_name").val(),
                user_pw:$Reg.$("#user_pw").val(),
            },
            dataType:'json',
            success:function(result){
                if(result.code==0){
                    alert("登入成功")
                    window.location.href='index';
                }else{
                    alert(result.message)
                }
                  }
            
        })
    })
    
    $(".four").mouseover(function(){
        $("body").css( "background-image" ,"url('/images/5.gif')");
    });
});
function checkName(){
    var username=document.getElementById("username").value;
    var reg=/^[\u4e00-\u9fa5]+$/;
    if(reg.test(username)){
        return ture
    }
    else if(username==''||username==undefined){
        document.getElementById("errmg1").innerHTML="用户名不能为空";
        return false
    }
}
function checkEmail(){
    var useremail = document.getElementById("username").value;
    var qqemail=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    // if(qqemail.test(useremail)){
    //     return ture
    // }
     if(useremail==''||useremail==undefined){
        
        document.getElementById("errmg1").innerHTML="邮箱不能为空";
        return false
    }
    else{
        return ture
    }
}
function checkPhone(){
    var userphone=document.getElementById("userphoneno").value;
    var pmun=/^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
    // if(pmun.test(userphone)){
    //     return true
    // }
    if(userphone==''||userphone==undefined){
        
        document.getElementById("errmg2").innerHTML="电话号码不能为空";
        return false
    }
    else{
        return ture
    }
}
function checkPw(){
    var userpw=document.getElementById("userpw").value;
    var pw=/^[0-9]{6,18}$/;//6~18位数字
    // if(pw.test(userpw)){
    //     alert("请输入6~18位的数字")
    //     return ture
    // }
    if(userpw==''||userpw==undefined){
        
        document.getElementById("errmg3").innerHTML="密码不能为空";
        return false
    }
    else{
        return ture
    }
}
function checkAll(){
    var uname=checkName();
    var uphone=checkphone();
    var upw=checkPw();
    var uem=checkEmail();
    if(uname&&uphone&&upw&&uem){
        return true
    }
    else{
        document.getElementById("errmg4").innerHTML="不能为空";
        return false
        
    }
}

