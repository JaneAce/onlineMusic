$(function(){
    $("#regin").click(function(){
        $("#log").hide();
        $("#reg").show();
        
    });
    $("#login").click(function(){
        $("#log").show();
        $("#reg").hide();
    });
    
    $(".four").mouseover(function(){
        $("body").css( "background-image" ,"url('/images/5.gif')");
    });
    
    


    
    
    


    var countdown=60; 
    function settime(val) { 
    if (countdown == 0) { 
    val.removeAttribute("disabled"); 
    val.value="免费获取验证码"; 
    countdown = 60; 
    } else { 
    val.setAttribute("disabled", true); 
    val.value="重新发送(" + countdown + ")"; 
    countdown--; 
    } 
    setTimeout(function() { 
    settime(val) 
    },1000) 
    }
});

