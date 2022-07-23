export default class Accordion {
  constructor(name) {
    const accordion = document.getElementById(name);
    if (accordion) {
      accordion.addEventListener("click", change);
      function change(event) {
        var targ = event.target;
        if (targ.tagName !== "H3") return;
        if (targ.classList.contains("select")) {
          console.log(targ.tagName !== "H3");
          hideAll();
        } else {
          hideAll();

          targ.classList.add("select");

          showText(targ.nextElementSibling);
        }
      }
      function hideAll() {
        var h3El = accordion.querySelectorAll(".accordion-header");
        var divEl = accordion.querySelectorAll(".accordion-body");
        console.log(accordion);
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
