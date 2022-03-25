import "../scss/main.scss";
//pages
// import "./pages/index"
// import "./pages/requisites"
// import '../index.html'
//plugins
import Accordion from  './plugins/accardion'
import "./plugins/swiper";
class SideBar {
  constructor(){
    const menuSideBar = document.querySelector("#menu-sidebar");
    const menuHeader = document.querySelector("#menu-header");
    const sidebar = document.querySelector(".sidebar")
    menuSideBar.onclick = ()=>{
      if(sidebar.classList.contains('sidebar_active')){
        menuSideBar.classList.remove('active')
        sidebar.classList.remove('sidebar_active')
      }
    }
    menuHeader.onclick = ()=>{
      if(!sidebar.classList.contains('sidebar_active')){
        menuSideBar.classList.add('active')
         sidebar.classList.add('sidebar_active')
      }
    }
  }
}
class Drop{
  constructor(){
    const drop = document.querySelector('#drop')
    drop.onclick = ()=>{
      const childrens = document.querySelectorAll(".drop__children");

      
      if(drop.classList.contains('drop_active')){
        drop.classList.remove('drop_active')
        Array.from(childrens).forEach(item=>{
          if(item.classList.contains('children_active'))item.classList.remove('children_active')
          item.classList.add('children_close')
        })        
      }else{
        drop.classList.add('drop_active')
      Array.from(childrens).forEach(item=>{
        if(!item.classList.contains('children_active'))item.classList.add('children_active')
        item.classList.remove('children_close')
      })
      }
    }
  }
}
//sidebar
new SideBar()
new Accordion('sidebar-accordion');
//header
new Drop()
//footer    
new Accordion('accordion')







