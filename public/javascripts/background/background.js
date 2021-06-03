
      //删除按钮的点击事件
Array.from(document.getElementsByClassName("delete")).forEach(i=>{
    i.onclick=function(){
    let id=this.getAttribute("data-id")
    window.location.href='/background/delete'
          }
      });
$(function(){
      //新增按钮的点击事件
      $("#newadd").click(function(){
        window.location.href = '/background/addpage';
    });
    //分页实现
    $(".page").click(function(){
        $.ajax({
            type:'get',
            url:'/background/page',
            data:{
                i:($(".page").text().replace(/'/g, ''))/3,//传给后端的值（url）截取传输中的“”
            },
            dataType:'json',
            success:function(data){
                document.getElementById("newData").innerHTML=data.map(i=>
                        `
                        <tr>
                    <td>${i.user_id}</td>
                    <td>${i.user_name}</td>
                    <td>${i.user_email}</td>
                    <td>${i.user_phone}</td>
                    <td>${i.user_pw}</td>
                    <td>${i.user_isAdmin}</td>
                    <td><a href="/background/update/${i.user_id}">修改</a>|<a href="/background/delete/${i.user_id}">删除</a></td>
                  </tr>
                        `).join("");
            }
        })
    })
})

    
