import "../../pages/region.html";

import Dropdown from "../plugins/dropdown";
const drop = new Dropdown("1");

class Slide {
  constructor() {
    drop.select();
    this.dropdown = drop.dropdown;
    this.el = drop.choisEl;
    // this.dropd = drop.dropdown;
    console.log(drop.dropdown);
    let idName = drop.choisEl.getAttribute("data-slider");
    document.getElementById(idName).style.display = "flex";
    Array.from(drop.listItems).forEach((item) => {
      item.addEventListener(
        "click",
        () => {
          const oldSlider = document.getElementById(idName);
          oldSlider.style.display = "none";
          this.el = drop.choisEl;
          idName = this.el.getAttribute("data-slider");
          const newSlider = document.getElementById(idName);
          newSlider.style.display = "flex";
        },
        false
      );
    });
  }
  get el() {
    return this._el;
  }
  set el(_this) {
    if (document.querySelector(".region__home-img"))
      document.querySelector(".region__home-img").remove();
    const img = _this.querySelector("img").cloneNode(true);
    img.removeAttribute("class");
    img.classList.add("region__home-img");
    console.log(this.dropdown);
    this.dropdown.after(img);
    console.log(_this);
    this._el = _this;
  }
}
new Slide();
document.addEventListener("DOMContentLoaded", () => {});
