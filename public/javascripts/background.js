// $(function(){
//     Array.from(document.getElementsByClassName("delete")).forEach(i =>{
//         i.onclick = function(){
//             let index = this.getAttribute("data_id");
//             $.ajax({
//                 type:'post',
//                 url:'/background',
//                 data:{id:index},
//                 success:function(data){
//                     console.log(data)
//                     window.location.href='/background'
//                 }
//             })
    
//         }
//       });
      //删除按钮的点击事件
Array.from(document.getElementsByClassName("delete")).forEach(i=>{
    i.onclick=function(){
    let id=this.getAttribute("data-id")
    window.location.href='/background/delete'
          }
      })
      //新增按钮的点击事件
    $("#newadd").click(function(){
        window.location.href = '/background/addpage';
    })
//修改的点击事件 
Array.from(document.getElementsByClassName("update")).forEach(i =>{
    i.onclick=function(){
        let index=this.getAttribute("data-id")
        window.location.href='/background/update'
        console.log(index)
    }
})
    
