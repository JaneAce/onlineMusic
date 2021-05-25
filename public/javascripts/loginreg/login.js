
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
    $("#Reg").click(function(){
        $.ajax({
            type:'post',
            url:'/LoginReg',
            data:{
                user_name:$("#user_name").val(),
                user_pw:$Reg.$("#user_pw").val(),
            },
            dataType:'json',
            success:function(result){
                if (result.code == 0) {
                    window.location.href ='LoginReg';
                  } else {
                    alert(result.message);
                  }
            }
        })
    });
    //登入
    $("#Login").click(function(){
        $.ajax({
            type:'post',
            url:'/LoginReg/reg',
            dataType:'json',
            data:{
                user_name:$("#user_name").val(),
                user_pw:$Reg.$("#user_pw").val(),
            },
            dataType:'json',
            success:function(result){
                if(result.code==0){
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

