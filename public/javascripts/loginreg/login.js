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
    // $("#Reg").click(function(){
    //     $.ajax({
    //         type:'post',
    //         url:'/LoginReg',
    //         data:{
    //             user_name:$("#user_name").val(),
    //             user_email:$("#user_email").val(),
    //             user_phone:$("#user_phone").val(),
    //             user_pw:$("#user_pw").val()
    //         },
    //         dataType:'json',
    //         success:function(data){
    //             alert(data)
    //         }
    //     })
    // })
    
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
    var rephoneno = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$/;
    if (rephoneno.test(userphone)) {
        return ture
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
    // if(pw.test(userpw)){
    //     alert("请输入6~18位的数字")
    //     return ture
    // }
    if(userpw==''||userpw==undefined){
        
        document.getElementById("errPw").innerHTML="密码不能为空";
        return false
    }
    else{
        return false
    }
}
function checkAll(){
    var uname=checkName();
    var uphone=checkPhone();
    var upw=checkPw();
    var uem=checkEmail();
    if(uname&&uphone&&upw&&uem!=false){
        document.getElementById("errAll").innerHTML="不能为空";
        console.log("全部为false")
        return false
        
    }
    else{
        console.log("全部为ture")
        return ture
        
    }
}

