$(function(){
    $("#user").click(function(){
        $.ajax({
            type:'get',
            url:'/user',
            data:{

            },
            dataType:'html',
            success:function(data){
                if(data=='请先登入！'){
                    alert(data)
                }
                if(data!='请先登入！'){
                    window.location.href='/user'
                }
                
            }
        })
    })
})