import "../scss/main.scss";
import "./plugins/swiper";
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
new Dropdown("1");
//pages
// import "./pages/index"
// import "./pages/requisites"
// import '../index.html'
//plugins
import Accordion from "./plugins/accardion";
import "./plugins/swiper";
import "./plugins/telmask";
import "./plugins/validateform";

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
console.log("hi");
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
        for (var t = this; t && 1 === t.nodeType; ) {
          if (t.matches(e)) return t;
          t = t.parentNode;
        }
        return null;
      });
})(window.Element.prototype);

document.addEventListener("DOMContentLoaded", function () {
  /* Записываем в переменные массив элементов-кнопок и подложку.
      Подложке зададим id, чтобы не влиять на другие элементы с классом overlay*/
  var modalButtons = document.querySelectorAll(".js-open-modal"),
    overlay = document.querySelector(".js-overlay-modal"),
    closeButtons = document.querySelectorAll(".js-modal-close");
  if (overlay) {
    /* Перебираем массив кнопок */
    modalButtons.forEach(function (item) {
      /* Назначаем каждой кнопке обработчик клика */
      item.addEventListener("click", function (e) {
        /* Предотвращаем стандартное действие элемента. Так как кнопку разные
                люди могут сделать по-разному. Кто-то сделает ссылку, кто-то кнопку.
                Нужно подстраховаться. */
        e.preventDefault();

        /* При каждом клике на кнопку мы будем забирать содержимое атрибута data-modal
                и будем искать модальное окно с таким же атрибутом. */
        var modalId = this.getAttribute("data-modal"),
          modalElem = document.querySelector(
            '.modal[data-modal="' + modalId + '"]'
          );

        /* После того как нашли нужное модальное окно, добавим классы
                подложке и окну чтобы показать их. */
        modalElem.classList.add("active");
        overlay.classList.add("active");
      }); // end click
    }); // end foreach

    closeButtons.forEach(function (item) {
      item.addEventListener("click", function (e) {
        var parentModal = this.closest(".modal");

        parentModal.classList.remove("active");
        overlay.classList.remove("active");
      });
    }); // end foreach

    document.body.addEventListener(
      "keyup",
      function (e) {
        var key = e.keyCode;

        if (key == 27) {
          document.querySelector(".modal.active").classList.remove("active");
          document.querySelector(".overlay").classList.remove("active");
        }
      },
      false
    );

    overlay.addEventListener("click", function () {
      document.querySelector(".modal.active").classList.remove("active");
      this.classList.remove("active");
    });
  }
}); // end ready

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");
  const inputFile = document.querySelectorAll(".upload-file__input");
  /////////// Кнопка «Прикрепить файл» ///////////

  const inputWrappers = document.querySelectorAll(".upload-file__wrapper");
  inputFile.forEach(function (el, index) {
    // let textSelector = document.querySelector(".upload-file__text");

    let fileList;

    // Событие выбора файла(ов)
    el.addEventListener("change", function (e) {
      console.log(e);
      // создаём массив файлов
      const parentWrapper = el.parentElement.getAttribute("id");

      fileList = [];
      for (let i = 0; i < el.files.length; i++) {
        fileList.push(el.files[i]);
      }

      // вызов функции для каждого файла
      fileList.forEach((file) => {
        uploadFile(file, parentWrapper);
      });
    });

    // Проверяем размер файлов и выводим название
    const uploadFile = (file, idWrapper) => {
      // файла <5 Мб
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
