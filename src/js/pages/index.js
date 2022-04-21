import "../../index.html";

import "../plugins/animateNumber";
import "../plugins/telmask";
import "../plugins/validateform";
import Cards from "../plugins/cards";
import Dropdown from "../plugins/dropdown";
new Dropdown("1");
new Dropdown("2");
new Dropdown("3");

class Survey {
  constructor(name) {
    this.name = document.querySelector(`#${name}`);
    if (this.name) {
      const popup = this.name.parentNode.querySelector(".popup");
      if (this.name.children.length > 0 && !this.getActiveClass) {
        Array.from(this.name.children).forEach((el) => {
          el.addEventListener("click", () => {
            // document.querySelectorAll('.card-survey').forEach(item=>item.classList.add('card-survey_opacity'))
            // el.classList.toggle('card-survey_opacity')
            // if(this.getActiveClass){
            //   if(el.getAttribute('class').indexOf('card-survey_active') == -1){
            //     el.classList.add('card-survey_active')
            //     this.updateWithProgress()
            //     console.log(el)
            //     popup.classList.add('popup_active')
            //     setTimeout(()=>{
            //       popup.classList.remove('popup_active')
            //     }, 1500)
            //   }
            // }
            if (!this.getActiveClass) {
              if (!el.classList.contains("card-survey_first")) {
                document.querySelectorAll(".card-survey").forEach((item) => {
                  if (item.classList.contains("card-survey_first")) {
                    item.classList.remove("card-survey_first");
                  }
                  item.classList.add("card-survey_opacity");
                });
                el.classList.add("card-survey_first");
                el.classList.remove("card-survey_opacity");
              } else {
                if (el.classList.contains("card-survey_first")) {
                  document
                    .querySelectorAll(".card-survey")
                    .forEach((item) =>
                      item.classList.remove("card-survey_opacity")
                    );
                  el.classList.remove("card-survey_first");
                  el.classList.add("card-survey_active");
                  this.updateWithProgress();

                  popup.classList.add("popup_active");
                  setTimeout(() => {
                    popup.classList.remove("popup_active");
                  }, 1500);
                }
              }
            }
          });
        });
      }
    }
  }
  get getActiveClass() {
    let isActive = false;
    Array.from(this.name.children).forEach((el) => {
      // console.log(el.getAttribute('class').indexOf('card-survey_active') !== -1)
      if (el.getAttribute("class").indexOf("card-survey_active") !== -1) {
        isActive =
          el.getAttribute("class").indexOf("card-survey_active") !== -1;
      }
    });
    return isActive;
  }

  get firstClick() {
    let isActive = false;
    Array.from(this.name.children).forEach((el) => {
      if (el.getAttribute("class").indexOf("card-survey_first") !== -1) {
        isActive = el.getAttribute("class").indexOf("card-survey_first") !== -1;
      }
    });
    return !isActive;
  }

  updateWithProgress() {
    Array.from(this.name.querySelectorAll(".card-survey")).forEach((el) => {
      const w = el
        .querySelector(".card-survey__progress")
        .getAttribute("data-w");
      el.querySelector(".card-survey__progress").style.width = `${w}%`;
    });
  }
}
new Cards("new");
new Survey("survey");
// import '../../index.html'
// new Dropdown("1");
// new Dropdown("2");
// new Dropdown("3");

// new Cards('new')
// new Survey('survey')
