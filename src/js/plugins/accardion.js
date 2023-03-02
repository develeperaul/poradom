export default class Accordion {
  constructor(name) {
    const accordion = document.getElementById(name);
    if (accordion) {
      accordion.addEventListener("click", change);
      function change(event) {
        var targ = event.target;
        let currentElem = targ;
        while (currentElem) {
          if (currentElem.classList.contains("accordion-header")) {
            console.log(currentElem);
            break;
          } else if (currentElem == document.querySelector("html")) break;
          else currentElem = currentElem.parentElement;
        }
        const btn = currentElem.querySelector(".accordion-button");
        // if (!targ.classList.contains("accordion-button")) return;
        if (btn && btn.classList.contains("select")) {
          if (targ.classList.contains("accordion-sidebar")) {
            console.log("close");
            targ.classList.remove("select");
            targ.parentNode.nextElementSibling.style.height = "0";
          } else {
            console.log(1);
            hideAll();
          }
        } else {
          if (!targ.classList.contains("accordion-sidebar")) {
            console.log(2);
            hideAll();
          }
          btn.classList.add("select");
          showText(btn.parentNode.nextElementSibling);
        }
      }
      function hideAll() {
        var h3El = accordion.querySelectorAll(".accordion-button");
        var divEl = accordion.querySelectorAll(".accordion-body");
        for (var i = 0; i < h3El.length; i++) {
          h3El[i].classList.remove("select");
        }
        for (var i = 0; i < divEl.length; i++) {
          divEl[i].style.height = "0";
          // divEl[i].classList.remove('tabs__text_s')
        }
      }
      function showText(textEl) {
        textEl.style.height = textEl.scrollHeight + "px";
        // textEl.classList.add('tabs__text_s')
      }
    }
  }
}
