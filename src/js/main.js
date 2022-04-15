import "../scss/main.scss";
import "./plugins/swiper";
//pages
// import "./pages/index"
// import "./pages/requisites"
// import '../index.html'
//plugins
import Accordion from "./plugins/accardion";
import "./plugins/swiper";
console.log(Accordion);
const scrollTop = () => window.scrollTo(pageYOffset, 0);
const arrow = document.querySelector("#arrow");
arrow.onclick = scrollTop;
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 20) {
    if (arrow?.classList.contains("hidden-arrow"))
      arrow?.classList.remove("hidden-arrow");
    if (!arrow?.classList.contains("show-arrow")) {
      arrow.style.display = "block";
      arrow?.classList.add("show-arrow");
      scroll.value = true;
    }

    arrow?.classList.add("article");
  } else {
    if (arrow?.classList.contains("show-arrow"))
      arrow?.classList.remove("show-arrow");
    if (!arrow?.classList.contains("hidden-arrow")) {
      arrow?.classList.add("hidden-arrow");
      console.log(window.pageYOffset);
      setTimeout(() => {
        if (arrow?.classList.contains("hidden-arrow"))
          arrow.style.display = "none";
      }, 1100);
    }
  }
});
class SideBar {
  constructor() {
    const menuSideBar = document.querySelector("#menu-sidebar");
    const menuHeader = document.querySelector("#menu-header");
    const sidebar = document.querySelector(".sidebar");
    menuSideBar.onclick = () => {
      if (sidebar.classList.contains("sidebar_active")) {
        menuSideBar.classList.remove("active");
        sidebar.classList.remove("sidebar_active");
      }
    };
    menuHeader.onclick = () => {
      if (!sidebar.classList.contains("sidebar_active")) {
        menuSideBar.classList.add("active");
        sidebar.classList.add("sidebar_active");
      }
    };
  }
}
class Drop {
  constructor() {
    const drop = document.querySelector("#drop");
    drop.onclick = () => {
      const childrens = document.querySelectorAll(".drop__children");

      if (drop.classList.contains("drop_active")) {
        drop.classList.remove("drop_active");
        Array.from(childrens).forEach((item) => {
          if (item.classList.contains("children_active"))
            item.classList.remove("children_active");
          item.classList.add("children_close");
        });
      } else {
        drop.classList.add("drop_active");
        Array.from(childrens).forEach((item) => {
          if (!item.classList.contains("children_active"))
            item.classList.add("children_active");
          item.classList.remove("children_close");
        });
      }
    };
  }
}
//sidebar
new SideBar();
new Accordion("sidebar-accordion");
//header
new Drop();
//footer
new Accordion("accordion");
