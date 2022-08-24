import "../scss/main.scss";
// import 'swiper/css'
import { stories } from "./plugins/swiper";
import "./plugins/calc";
import GLightbox from "glightbox";
const lightbox = GLightbox({
  touchNavigation: false,
  keyboardNavigation: false,
  height: "auto",
  loop: true,
  autoplayVideos: true,
});

import Dropdown from "./plugins/dropdown";

import Accordion from "./plugins/accardion";
import "./plugins/telmask";
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    const topPos = document.querySelector("#scroll-el").offsetTop;
    if (topPos) (() => window.scrollTo(0, topPos))();
  }, 3000);
});

let startX, scrollLeft;
let isDown = false;
window.addEventListener("mousedown", (e) => {
  const slider = e.target.closest(".button__group");
  if (slider) {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }
});
window.addEventListener("mouseleave", () => {
  isDown = false;
  // slider.classList.remove("active");
});
window.addEventListener("mouseup", () => {
  isDown = false;
});
window.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const slider = e.target.closest(".button__group");
  if (slider) {
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    // console.log(walk);
  }
});
const forms = document.querySelectorAll("form");
const formReq = async (form) => {
  const url = "/bitrix/templates/poradom/ajax/form.php";
  const formData = new FormData();
  const fields = form.querySelectorAll("input");
  // console.log(form.getAttribute("data-theme"));
  const theme = form.getAttribute("data-theme");
  Array.from(fields).forEach((field) => {
    formData.append("theme", theme ? theme : "");
    if (field.name) {
      if (field.name === "file" && field.files.length > 0)
        formData.append(field.name, field.files[0], field.files[0].name);
      else formData.append(field.name, field.value);
    }
  });

  let success = false;
  const res = await fetch(url, {
    method: "POST",
    body: formData,
  })
    .then((responce) => {
      if (responce.status === 200) {
        success = true;
      }
    })
    .catch((e) => console.log(e));
  return success;
};

const togglePopupMessage = () => {
  const overlay = document.querySelector(".js-overlay-modal");
  const message = document.querySelector(".popup-message");
  overlay.classList.add("active");
  message.classList.add("active");
  setTimeout(() => {
    overlay.classList.remove("active");
    message.classList.remove("active");
  }, 1500);
};

forms.forEach((form) => {
  if (!form.classList.contains("form-popup")) {
    form.addEventListener("submit", async function (event) {
      // if (!validate.validate) formReq(this);
      event.preventDefault();
      this.validate = null;
      const fields = form.querySelectorAll("[data-special-offer]");
      for (var i = 0; i < fields.length; i++) {
        fields[i].classList.remove("text-field__input_invalid");
        fields[i].classList.remove("checkbox_invalid");
        if (fields[i].type == "checkbox" && !fields[i].checked) {
          fields[i].classList.add("checkbox_invalid");
          if (this.validate === null) this.validate = form;
        }

        if (
          fields[i].type !== "checkbox" &&
          fields[i].classList.contains("tel") &&
          (!fields[i].value || fields[i].value.length < 17)
        ) {
          {
            fields[i].classList.add("text-field__input_invalid");
            if (this.validate === null) this.validate = form;
          }
        }
        if (fields[i].type !== "checkbox" && !fields[i].value) {
          fields[i].classList.add("text-field__input_invalid");
          if (this.validate === null) this.validate = form;
        }
      }

      if (!this.validate) {
        const res = await formReq(this);
        if (res) {
          const input = document.createElement("input");
          input.type = "reset";
          input.setAttribute("hidden", "hidden"); // set the CSS class
          this.appendChild(input);
          input.click();
          this.validate = null;
          togglePopupMessage();
        }
      }
    });
  }
});

const scrollTop = () => window.scrollTo(pageYOffset, 0);
const arrow = document.querySelector("#arrow");
const header = document.querySelector("header");
const contactArrows = document.querySelector(".contact-arrow")
arrow.onclick = scrollTop;
window.addEventListener("scroll", () => {
  if (header) {
    const headerHeight = header?.offsetHeight
    if (header && headerHeight && window.pageYOffset > headerHeight) {
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

        setTimeout(() => {
          if (arrow?.classList.contains("hidden-arrow"))
            arrow.style.display = "none";
        }, 1100);
      }
    }

  } else if (window.pageYOffset > 20) {
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

      setTimeout(() => {
        if (arrow?.classList.contains("hidden-arrow"))
          arrow.style.display = "none";
      }, 1100);
    }
  }
  if (window.pageYOffset > 20) {
    if (contactArrows && !contactArrows.classList.contains('active')) {
      contactArrows.classList.add('active')
    }
  } else contactArrows.classList.remove('active')
});
class SideBar {
  constructor() {
    const menuSideBar = document.querySelector("#menu-sidebar");
    const menuHeader = document.querySelector("#menu-header");
    const menuHeaderFixed = document.querySelector("#menu-header_fixed");
    const sidebar = document.querySelector(".sidebar");
    if (menuSideBar) {
      menuSideBar.onclick = () => {
        if (sidebar.classList.contains("sidebar_active")) {
          menuSideBar.classList.remove("active");
          sidebar.classList.remove("sidebar_active");
        }
      };
    }
    if (menuHeader) {
      menuHeader.onclick = () => {
        if (!sidebar.classList.contains("sidebar_active")) {
          menuSideBar.classList.add("active");
          sidebar.classList.add("sidebar_active");
        }
      };
    }
    if (menuHeaderFixed) {
      menuHeaderFixed.onclick = () => {
        if (!sidebar.classList.contains("sidebar_active")) {
          menuSideBar.classList.add("active");
          sidebar.classList.add("sidebar_active");
        }
      };
    }
  }
}
class Drop {
  constructor() {
    const drop = document.querySelector("#drop");
    if (drop) {
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
}
//sidebar
new SideBar();
new Accordion("sidebar-accordion");
//header
new Drop();
//footer
new Accordion("accordion");
class Test {
  constructor(name) {
    const parent = document.querySelector(`#${name}`);
    if (parent) {
      const blocks = parent.querySelectorAll(".tab");
      const childrens = parent.querySelectorAll(".tab > .tab__top");

      Array.from(childrens).forEach((el, index) => {
        const parentEl = el.parentNode;
        const bottomBlock = blocks[index].querySelector(".tab__bottom");
        el.onclick = () => {
          if (parentEl.classList.contains("tab_active")) {
            parentEl.classList.remove("tab_active");
            bottomBlock.style.height = "0";
            // parentEl.style.height = "0";
          } else {
            parentEl.classList.add("tab_active");
            bottomBlock.style.height = bottomBlock.scrollHeight + "px";
            // el.nextElementSibling.style.height = textEl.scrollHeight + "px";
          }
        };
      });
    }
  }
}
new Test("test");

document.addEventListener("DOMContentLoaded", function () {
  class Popup {
    constructor() {
      !(function (e) {
        "function" != typeof e.matches &&
          (e.matches =
            e.msMatchesSelector ||
            e.mozMatchesSelector ||
            e.webkitMatchesSelector ||
            function (e) {
              for (
                var t = this,
                o = (t.document || t.ownerDocument).querySelectorAll(e),
                n = 0;
                o[n] && o[n] !== t;

              )
                ++n;
              return Boolean(o[n]);
            }),
          "function" != typeof e.closest &&
          (e.closest = function (e) {
            for (var t = this; t && 1 === t.nodeType;) {
              if (t.matches(e)) return t;
              t = t.parentNode;
            }
            return null;
          });
      })(window.Element.prototype);

      let that = this;
      that.close = false;
      /* Записываем в переменные массив элементов-кнопок и подложку.
          Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
      var modalButtons = document.querySelectorAll(".js-open-modal"),
        modalButtonsSlider = document.querySelectorAll(
          ".js-open-modal[data-slider-button]"
        ),
        overlay = document.querySelector(".js-overlay-modal"),
        closeButtons = document.querySelectorAll(".js-modal-close"),
        closeButtonsSlider = document.querySelectorAll(".js-modal-close");
      const toggleSwiper = (type, modalEl, index) => {
        if (modalEl.querySelector(".swiper")) {
          if (stories && Array.from(stories).length === 0) {
            stories[type]();
            stories.autoplay.start();
            stories.slideToLoop(0);
          }
          if (stories && Array.from(stories).length !== 0) {
            stories[index][type]();
            stories[index].autoplay.start();
            stories[index].slideToLoop(0);
          }
        }
      };
      let indexModal = null;
      let modalElem = null;
      if (overlay) {
        /* Перебираем массив кнопок */

        modalButtons.forEach(function (item, index) {
          /* Назначаем каждой кнопке обработчик клика */
          item.addEventListener("click", function (e) {
            e.preventDefault();

            /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
                    и будем искать модальное окно с таким же атрибутом. */
            var modalId = this.getAttribute("data-modal");
            modalElem = document.querySelector(
              '.modal[data-modal="' + modalId + '"]'
            );
            indexModal = index;
            /* После того как нашли нужное модальное окно, добавим классы
                    подложке и окну чтобы показать их. */
            modalElem.classList.add("active");
            overlay.classList.add("active");
          }); // end click
        }); // end foreach
        modalButtonsSlider.forEach(function (item, index) {
          // console.log(item);
          /* Назначаем каждой кнопке обработчик клика */
          item.addEventListener("click", function (e) {
            e.preventDefault();

            /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
                    и будем искать модальное окно с таким же атрибутом. */
            var modalId = this.getAttribute("data-modal");
            modalElem = document.querySelector(
              '.modal[data-modal="' + modalId + '"]'
            );
            indexModal = index;
            /* После того как нашли нужное модальное окно, добавим классы
                    подложке и окну чтобы показать их. */
            modalElem.classList.add("active");
            toggleSwiper("init", modalElem, index);
            toggleSwiper("enable", modalElem, index);
            overlay.classList.add("active");
          }); // end click
        }); // end foreach
        closeButtons.forEach(function (item) {
          item.addEventListener("click", function (e) {
            toggleSwiper("disable", modalElem, indexModal);

            var parentModal = this.closest(".modal");
            that.close = true;
            parentModal.classList.remove("active");
            overlay.classList.remove("active");
          });
        }); // end foreach

        document.body.addEventListener(
          "keyup",
          function (e) {
            var key = e.keyCode;

            if (key == 27) {
              that.close = true;
              document
                .querySelector(".modal.active")
                .classList.remove("active");
              document.querySelector(".overlay").classList.remove("active");
            }
          },
          false
        );

        overlay.addEventListener("click", function () {
          that.close = true;
          document.querySelector(".modal.active").classList.remove("active");
          this.classList.remove("active");
        });
      }

      //формы на попапах

      const modals = document.querySelectorAll(".modal");
      that.message = document.querySelector(".popup-message");
      that.formActive;

      Array.from(modals).forEach((modal) => {
        const form = modal.querySelector("form");
        if (form) {
          const submit = form.querySelector("button");

          form.addEventListener("submit", async function (e) {
            that.formActive = this;
            e.preventDefault();
            this.validate = null;
            const fields = form.querySelectorAll("[data-special-offer]");
            for (var i = 0; i < fields.length; i++) {
              fields[i].classList.remove("text-field__input_invalid");
              fields[i].classList.remove("checkbox_invalid");
              if (fields[i].type == "checkbox" && !fields[i].checked) {
                fields[i].classList.add("checkbox_invalid");
                if (this.validate === null) this.validate = form;
              }

              if (
                fields[i].type !== "checkbox" &&
                fields[i].classList.contains("tel") &&
                (!fields[i].value || fields[i].value.length < 17)
              ) {
                {
                  fields[i].classList.add("text-field__input_invalid");
                  if (this.validate === null) this.validate = form;
                }
              }
              if (fields[i].type !== "checkbox" && !fields[i].value) {
                fields[i].classList.add("text-field__input_invalid");
                if (this.validate === null) this.validate = form;
              }
            }
            if (!this.validate) {
              const res = await formReq(this);
              if (res) {
                form.classList.add("form-close");
                setTimeout(() => {
                  that.message.classList.add("active");
                }, 250);
                const input = document.createElement("input");
                input.type = "reset";
                input.setAttribute("hidden", "hidden"); // set the CSS class
                this.appendChild(input);
                input.click();
                this.validate = null;
                setTimeout(() => overlay.click(), 1500);
              }
            }
          });
        }
      });
    }
    set close (isClose) {
      if (isClose) {
        this.message.classList.remove("active");
        setTimeout(
          function () {
            if (this.formActive) {
              this.formActive.classList.remove("form-close");
            }
          }.bind(this),
          300
        );
      }
    }
  }
  new Popup();
});

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");
  const inputFile = document.querySelectorAll(".upload-file__input");

  const inputWrappers = document.querySelectorAll(".upload-file__wrapper");
  inputFile.forEach(function (el, index) {
    let fileList;

    // Событие выбора файла(ов)
    el.addEventListener("change", function (e) {
      // создаём массив файлов
      const parentWrapper = el.parentElement.getAttribute("id");

      fileList = [];
      for (let i = 0; i < el.files.length; i++) {
        fileList.push(el.files[i]);
      }

      fileList.forEach((file) => {
        uploadFile(file, parentWrapper);
      });
    });

    const uploadFile = (file, idWrapper) => {
      if (file.size > 5 * 1024 * 1024) {
        alert("Файл должен быть не более 5 МБ.");
        return;
      }
      let textBlock = document.querySelector(`#${idWrapper} > .files`);
      textBlock.insertAdjacentHTML("afterbegin", `<p>${file.name}</p>`);
      textBlock.classList.add("files_space");
      // Показ загружаемых файлов
      // if (file && file.length > 1) {
      //   if (file.length <= 4) {
      //     textSelector.textContent = `Выбрано ${file.length} файла`;
      //   }
      //   if (file.length > 4) {
      //     textSelector.textContent = `Выбрано ${file.length} файлов`;
      //   }
      // } else {
      //   textSelector.textContent = file.name;
      // }
    };
  });

  // Отправка формы на сервер
  // const postData = async (url, fData) => {
  //   // имеет асинхронные операции

  //   // начало отправки
  //   // здесь можно оповестить пользователя о начале отправки

  //   // ждём ответ, только тогда наш код пойдёт дальше
  //   let fetchResponse = await fetch(url, {
  //     method: "POST",
  //     body: fData,
  //   });

  //   // ждём окончания операции
  //   return await fetchResponse.text();
  // };

  // if (forms) {
  //   forms.forEach((el) => {
  //     el.addEventListener("submit", function (e) {
  //       e.preventDefault();

  //       // создание объекта FormData
  //       let fData = new FormData();

  //       // Добавление всех input, кроме type="file"
  //       el.querySelectorAll('input:not([type="file"])').forEach((input) => {
  //         fData.append(input.name, input.value);
  //       });

  //       // Добавление файлов input type file
  //       let file = el.querySelector(".upload-file__input");
  //       for (let i = 0; i < file.files.length; i++) {
  //         fData.append("files[]", file.files[i]); // добавляем файлы в объект FormData()
  //       }

  //       // Отправка на сервер
  //       postData("./mail.php", fData)
  //         .then((fetchResponse) => {
  //           console.log("Данные успешно отправлены!");
  //           console.log(fetchResponse);
  //         })
  //         .catch(function (error) {
  //           console.log("Ошибка!");
  //           console.log(error);
  //         });
  //     });
  //   });
  // }
});

class toggleGroup {
  constructor() {
    this.name = document.querySelector(`.toggle-btns`);
    const btns = document.querySelectorAll("[data-toggle]");

    if (btns) {
      Array.from(btns).forEach((button) => {
        button.onclick = (e) => {
          const id = button.getAttribute("data-toggle");
          const toggleEl = document.querySelector(`#${id}`);
          const buttonParent = button.parentNode.querySelectorAll("button");

          const toggleElParent =
            toggleEl.parentNode.querySelectorAll("[data-toggle_el]");
          if (
            toggleEl &&
            !toggleEl.classList.contains("toggle-element__active") &&
            toggleElParent
          ) {
            Array.from(buttonParent).forEach((btn) => {
              btn.classList.remove("button__round_active");
              button.classList.add("button__round_active");
            });
            Array.from(toggleElParent).forEach((el) => {
              el.classList.remove("toggle-element__active");
              toggleEl.classList.add("toggle-element__active");
            });
          }
        };
      });
    }
  }
}
new toggleGroup();

class toggleInfo {
  constructor() {
    this.open = false;
    const modalButtons = document.querySelectorAll(".info");

    document.onclick = (e) => {
      if (this.open && !e.target.className.includes("popup-open")) {
        this.open = false;
        Array.from(document.querySelectorAll(".popup")).forEach((item) => {
          item.classList.remove("popup-open");
          item.display = "none";
        });
      }
      //   this.card.classList.remove("card-filter_open");
      //   square.classList.remove("square_active");
      //   this.open = false;
      // }
    };
    document.onscroll = (e) => {
      Array.from(document.querySelectorAll(".popup")).forEach((item) => {
        item.classList.remove("popup-open");
        item.display = "none";
      });
    };
    modalButtons.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const popup = el.querySelector(".popup");
        if (popup.classList.contains("popup-open")) {
          popup.classList.remove("popup-open");
          this.open = false;
        } else {
          popup.style.display = "block";
          setTimeout(() => {
            popup.classList.add("popup-open");
            this.open = true;
          }, 0.5);
        }

      });
    });
  }
}
new toggleInfo();
document.addEventListener("DOMContentLoaded", () => {
  const setPosition = (e, plan, dataHoverEl) => {
    //получаем позицию курсора мышки относительно блока
    // planMap.offsetWidth + ":" + planMap.offsetHeight;
    let planMapCoords;
    let xCoord;
    let yCoord;
    if (plan) {
      planMapCoords = plan.getBoundingClientRect();
      xCoord = e.clientX - planMapCoords.left;
      yCoord = e.clientY - planMapCoords.top; //если planMapCoords.top отрицательный то значит некоторая область не видими
    }
    //размер родительского блока
    const planMapWidth = plan.offsetWidth;
    const planMapHeight = plan.offsetHeight;
    dataHoverEl.style.top = yCoord + "px";
    dataHoverEl.style.left = xCoord + "px";
    dataHoverEl.offsetWidth;
    dataHoverEl.offsetHeight;
    // console.log("Координаты по Y: " + yCoord);
    if (dataHoverEl.getBoundingClientRect().top < 0) {
      dataHoverEl.style.top =
        yCoord - (dataHoverEl.getBoundingClientRect().top - 30) + "px";
    }
    if (dataHoverEl.getBoundingClientRect().left < 0) {
      dataHoverEl.style.left =
        xCoord - (dataHoverEl.getBoundingClientRect().left - 30) + "px";
    }
    dataHoverEl.style.transform = "translate(-50%, -110%)";
  };
  // const planMap = document.querySelector(".plan__map");
  // const svg = document.querySelector(".plan__map svg");
  document.querySelectorAll(".plan__map").forEach((plan) => {
    let currentEl = null;
    const svg = plan.querySelector("svg");
    svg.onmouseover = (e) => {
      if (currentEl) return;
      let target = e.target.closest("polygon");
      let targetPath = e.target.closest("path");
      if (e.target.closest("polygon")?.getAttribute("data-hover")) {
        if (!target) return;
        if (!svg.contains(target)) return;
        const dataHover = target.getAttribute("data-hover");
        const dataHoverEl = document.querySelector(dataHover);
        let elDisplay = dataHoverEl.style.display;
        setPosition(e, plan, dataHoverEl);
        if (dataHoverEl.classList.contains("plan__bottom-count")) {
          if (elDisplay === "none") dataHoverEl.style.display = "flex";
        } else {
          if (elDisplay === "none") dataHoverEl.style.display = "block";
        }
        currentEl = target;
      } else if (target?.parentNode?.getAttribute("data-hover")) {
        target = target.parentNode;
        const dataHover = target.getAttribute("data-hover");
        const dataHoverEl = document.querySelector(dataHover);
        let elDisplay = dataHoverEl.style.display;
        if (dataHoverEl.classList.contains("plan__bottom-count")) {
          if (elDisplay === "none") dataHoverEl.style.display = "flex";
        } else {
          if (elDisplay === "none") dataHoverEl.style.display = "block";
        }
        if (!target) return;
        if (!svg.contains(target)) return;
        currentEl = target;
        target.style.background = "green";
      }

      if (targetPath?.getAttribute("data-hover")) {
        if (!targetPath) return;
        if (!svg.contains(targetPath)) return;
        const dataHover = targetPath.getAttribute("data-hover");
        const dataHoverEl = document.querySelector(dataHover);
        let elDisplay = dataHoverEl.style.display;
        setPosition(e, plan, dataHoverEl);
        if (dataHoverEl.classList.contains("plan__bottom-count")) {
          if (elDisplay === "none") dataHoverEl.style.display = "flex";
        } else {
          if (elDisplay === "none") dataHoverEl.style.display = "block";
        }
        currentEl = targetPath;
      } else if (targetPath?.parentNode?.getAttribute("data-hover")) {
        targetPath = targetPath.parentNode;
        const dataHover = targetPath.getAttribute("data-hover");
        const dataHoverEl = document.querySelector(dataHover);
        let elDisplay = dataHoverEl.style.display;
        if (dataHoverEl.classList.contains("plan__bottom-count")) {
          if (elDisplay === "none") dataHoverEl.style.display = "flex";
        } else {
          if (elDisplay === "none") dataHoverEl.style.display = "block";
        }
        if (!targetPath) return;
        if (!svg.contains(targetPath)) return;
        currentEl = targetPath;
        targetPath.style.background = "green";
      }
    };

    svg.onmouseout = (e) => {
      if (!currentEl) return;
      let relatedTarget = e.relatedTarget;
      while (relatedTarget) {
        if (relatedTarget == currentEl) return;
        relatedTarget = relatedTarget.parentNode;
      }
      if (currentEl.getAttribute("data-hover")) {
        const dataHover = currentEl.getAttribute("data-hover");
        if (dataHover[0] === "#") {
          const dataHoverEl = document.querySelector(dataHover);
          let elDisplay = dataHoverEl.style.display;
          if (dataHoverEl.classList.contains("plan__bottom-count")) {
            if (elDisplay === "flex") dataHoverEl.style.display = "none";
          } else {
            if (elDisplay === "block") dataHoverEl.style.display = "none";
          }
        }
      }
      currentEl = null;
    };

    svg.onmousemove = (e) => {
      let target = e.target.closest("polygon");
      let targetPath = e.target.closest("path");
      if (e.target.closest("polygon")?.getAttribute("data-hover")) {
        if (!target) return;
        if (!svg.contains(target)) return;
        const dataHover = target.getAttribute("data-hover");
        const dataHoverEl = document.querySelector(dataHover);
        let elDisplay = dataHoverEl.style.display;
        setPosition(e, plan, dataHoverEl);

        if (dataHoverEl.classList.contains("plan__bottom-count")) {
          if (elDisplay === "none") dataHoverEl.style.display = "flex";
        } else {
          if (elDisplay === "none") dataHoverEl.style.display = "block";
        }

        currentEl = target;
      }

      if (targetPath?.getAttribute("data-hover")) {
        if (!targetPath) return;
        if (!svg.contains(targetPath)) return;
        const dataHover = targetPath.getAttribute("data-hover");
        const dataHoverEl = document.querySelector(dataHover);
        let elDisplay = dataHoverEl.style.display;
        setPosition(e, plan, dataHoverEl);

        if (dataHoverEl.classList.contains("plan__bottom-count")) {
          if (elDisplay === "none") dataHoverEl.style.display = "flex";
        } else {
          if (elDisplay === "none") dataHoverEl.style.display = "block";
        }

        currentEl = targetPath;
      }
    };
  });
  // svg.onmouseover = (e) => {
  //   if (currentEl) return;
  //   let target = e.target.closest("polygon");
  //   if (e.target.closest("polygon")?.getAttribute("data-hover")) {
  //     if (!target) return;
  //     if (!svg.contains(target)) return;
  //     const dataHover = target.getAttribute("data-hover");
  //     const dataHoverEl = document.querySelector(dataHover);
  //     let elDisplay = dataHoverEl.style.display;
  //     if (dataHoverEl.classList.contains("plan__bottom-count")) {
  //       if (elDisplay === "none") dataHoverEl.style.display = "flex";
  //     } else {
  //       if (elDisplay === "none") dataHoverEl.style.display = "block";
  //     }
  //     currentEl = target;
  //   } else if (target?.parentNode?.getAttribute("data-hover")) {
  //     target = target.parentNode;
  //     const dataHover = target.getAttribute("data-hover");
  //     const dataHoverEl = document.querySelector(dataHover);
  //     let elDisplay = dataHoverEl.style.display;
  //     if (dataHoverEl.classList.contains("plan__bottom-count")) {
  //       if (elDisplay === "none") dataHoverEl.style.display = "flex";
  //     } else {
  //       if (elDisplay === "none") dataHoverEl.style.display = "block";
  //     }
  //     if (!target) return;
  //     if (!svg.contains(target)) return;
  //     currentEl = target;
  //     target.style.background = "green";
  //   }
  // };

  // svg.onmouseout = (e) => {
  //   if (!currentEl) return;
  //   let relatedTarget = e.relatedTarget;
  //   while (relatedTarget) {
  //     if (relatedTarget == currentEl) return;
  //     relatedTarget = relatedTarget.parentNode;
  //   }
  //   if (currentEl.getAttribute("data-hover")) {
  //     const dataHover = currentEl.getAttribute("data-hover");
  //     if (dataHover[0] === "#") {
  //       const dataHoverEl = document.querySelector(dataHover);
  //       let elDisplay = dataHoverEl.style.display;
  //       if (dataHoverEl.classList.contains("plan__bottom-count")) {
  //         if (elDisplay === "flex") dataHoverEl.style.display = "none";
  //       } else {
  //         if (elDisplay === "block") dataHoverEl.style.display = "none";
  //       }
  //     }
  //   }
  //   currentEl = null;
  // };

  // svg.onmousemove = (e) => {
  //   let target = e.target.closest("polygon");
  //   if (e.target.closest("polygon")?.getAttribute("data-hover")) {
  //     if (!target) return;
  //     if (!svg.contains(target)) return;
  //     const dataHover = target.getAttribute("data-hover");
  //     const dataHoverEl = document.querySelector(dataHover);
  //     let elDisplay = dataHoverEl.style.display;
  //     if (dataHoverEl.classList.contains("plan__bottom-count")) {
  //       if (elDisplay === "none") dataHoverEl.style.display = "flex";
  //     } else {
  //       if (elDisplay === "none") dataHoverEl.style.display = "block";
  //     }
  //     //получаем позицию курсора мышки относительно блока
  //     // planMap.offsetWidth + ":" + planMap.offsetHeight;
  //     let planMapCoords;
  //     let xCoord;
  //     let yCoord;
  //     if (planMap) {
  //       planMapCoords = planMap.getBoundingClientRect();
  //       xCoord = e.clientX - planMapCoords.left;
  //       yCoord = e.clientY - planMapCoords.top; //если planMapCoords.top отрицательный то значит некоторая область не видими
  //     }
  //     //размер родительского блока
  //     const planMapWidth = planMap.offsetWidth;
  //     const planMapHeight = planMap.offsetHeight;
  //     dataHoverEl.style.top = yCoord + "px";
  //     dataHoverEl.style.left = xCoord + "px";
  //     dataHoverEl.offsetWidth;
  //     dataHoverEl.offsetHeight;
  //     console.log("Координаты по Y: " + yCoord);
  //     if (dataHoverEl.getBoundingClientRect().top < 0) {
  //       dataHoverEl.style.top =
  //         yCoord - (dataHoverEl.getBoundingClientRect().top - 30) + "px";
  //     }
  //     if (dataHoverEl.getBoundingClientRect().left < 0) {
  //       dataHoverEl.style.left =
  //         xCoord - (dataHoverEl.getBoundingClientRect().left - 30) + "px";
  //     }
  //     dataHoverEl.style.transform = "translate(-50%, -110%)";

  //     currentEl = target;
  //   }
  // };
});

document.addEventListener("DOMContentLoaded", () => {
  let oldEl = null;
  let currentEl = null;
  let level = 0;
  let test = false;
  const parentList = document.querySelector(".sidebar__list-desktop");
  parentList.onmouseover = (e) => {
    if (currentEl) return;
    let target = e.target.closest("li");
    if (!parentList.contains(target)) return;
    currentEl = target;
    if (currentEl?.getAttribute("data-node")) {
      // console.log(currentEl);
      let childrenEL = currentEl.querySelector(
        `${currentEl?.getAttribute("data-node")}`
      );

      if (currentEl.getAttribute("data-node").match(/-\d*/g)[0]) {
        let newLevel = currentEl
          .getAttribute("data-node")
          .match(/-\d*/g)[0]
          .replace("-", "");

        if (newLevel && newLevel < level) {
          test = true;
          for (let i = level; i > newLevel; i = i - 1) {
            if (oldEl?.getAttribute("data-node")) {
              let el = document.querySelector(
                `#list${oldEl
                  .getAttribute("data-node")
                  .split("-")[0]
                  .match(/_\d*/g)
                  .splice(0, i - 1)
                  .join("")}-${i - 1}`
              );
              // console.log(el);
              el ? el.style.setProperty("display", "none") : null;
            }
          }
        }
        if (newLevel && newLevel === level) {
          if (oldEl && test) {
            let oldLevel = oldEl
              .getAttribute("data-node")
              .match(/-\d*/g)[0]
              .replace("-", "");

            let parentOld = document.querySelector(
              oldEl.getAttribute("data-node")
            );
            parentOld ? (parentOld.style.display = "none") : null;

            // document.querySelector(
            //   oldEl.getAttribute("data-node")
            // ).style.display = "none";
          }
          test = false;
        }
        level = currentEl
          ?.getAttribute("data-node")
          .match(/-\d*/g)[0]
          .replace("-", "");
      }
      if (childrenEL) {
        childrenEL.style.display = "flex";
        test = true;
        // currentEl = childrenEL;
      }
      // console.log(level);
    }
  };
  parentList.onmouseout = (e) => {
    if (!currentEl) return;
    if (test) {
      oldEl = currentEl;
    }
    // console.log(oldEl);
    // console.log(test);
    currentEl = null;
  };
});

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header-nav");
  if (header) {
    const headerHeight = header.offsetHeight;
    const headerNav = document.querySelector(".header__top_fixed");
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > headerHeight) {
        headerNav.style.display = "block";
        setTimeout(() => {
          headerNav.classList.add("header__top_fixed-open");
        }, 200);
      } else {
        headerNav.style.display = "none";
        setTimeout(() => {
          headerNav.classList.remove("header__top_fixed-open");
        }, 200);
      }
      // if (window.pageYOffset > 20) {
      //   if (arrow?.classList.contains("hidden-arrow"))
      //     arrow?.classList.remove("hidden-arrow");
      //   if (!arrow?.classList.contains("show-arrow")) {
      //     arrow.style.display = "block";
      //     arrow?.classList.add("show-arrow");
      //     scroll.value = true;
      //   }

      //   arrow?.classList.add("article");
      // } else {
      //   if (arrow?.classList.contains("show-arrow"))
      //     arrow?.classList.remove("show-arrow");
      //   if (!arrow?.classList.contains("hidden-arrow")) {
      //     arrow?.classList.add("hidden-arrow");

      //     setTimeout(() => {
      //       if (arrow?.classList.contains("hidden-arrow"))
      //         arrow.style.display = "none";
      //     }, 1100);
      //   }
      // }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const testSwipers = document.querySelectorAll(".testSwiper");

  if (testSwipers) {
    Array.from(testSwipers).forEach((slider, index) => {
      const sliders = slider.querySelectorAll(".swiper-slide");
      const turns = slider.querySelectorAll(".test-class__turn");
      Array.from(turns).forEach((turn) => {
        turn.addEventListener("click", function (e) {
          let modalId = this.getAttribute("data-modal");
          console.log(index);
          if (stories && Array.from(stories).length === 0) {
            stories.autoplay.stop();
          }
          if (stories && Array.from(stories).length !== 0) {
            stories[index].autoplay.stop();
          }

          if (!("path" in Event.prototype))
            Object.defineProperty(Event.prototype, "path", {
              get: function () {
                let path = [];
                let currentElem = this.target;
                while (currentElem) {
                  path.push(currentElem);
                  currentElem = currentElem.parentElement;
                }
                if (
                  path.indexOf(window) === -1 &&
                  path.indexOf(document) === -1
                )
                  path.push(document);
                if (path.indexOf(window) === -1) path.push(window);
                return path;
              },
            });
          const slide = e.path.find(
            (path) => path.classList.value.indexOf("swiper-slide") !== -1
          );
          const wrapper = slide.querySelector(".test-class__wrapper");
          if (turn.classList.contains("test-class__turn_active")) {
            wrapper.classList.remove("test-class__wrapper_active");
            turn.classList.remove("test-class__turn_active");
          } else {
            wrapper.classList.add("test-class__wrapper_active");
            turn.classList.add("test-class__turn_active");
          }
        });
      });
    });
  }
});
