
      //删除按钮的点击事件
Array.from(document.getElementsByClassName("delete")).forEach(i=>{
    i.onclick=function(){
    let id=this.getAttribute("data-id")
    window.location.href='/background/delete'
          }
      });
      //新增按钮的点击事件
    $("#newadd").click(function(){
        window.location.href = '/background/addpage';
    });

    
