export default class Dropdown {
  #item;
  constructor(name) {
    this.name = name;
    if (document.getElementById(`dropdownList_${name}`)) {
      this.listItems = document
        .getElementById(`dropdownList_${name}`)
        .getElementsByTagName("li");
      const dropDownHeader = document.getElementById(`dropdownHeader_${name}`);
      const chevronIcon = document.getElementById(`chevronIcon_${name}`);
      const dropdownListBody = document.getElementById(
        `dropdownListBody_${name}`
      );

      this.dropdownHeaderValue = document.getElementById(
        `dropdownHeaderValue_${name}`
      );
      const dropdownHeaderValue = this.dropdownHeaderValue;
      const isDropdownDisabled = document
        .getElementById(`dropdown_${name}`)
        .classList.contains("disabled");
      this.dropdown = document.getElementById(`dropdown_${name}`);
      Array.from(this.listItems).forEach((item) => {
        item.addEventListener(
          "click",
          function () {
            toggleInterface();
            selectItem(this);
          },
          false
        );
      });
      dropDownHeader.addEventListener(
        "click",
        function () {
          if (!isDropdownDisabled) {
            toggleInterface();
          }
        },
        false
      );
      function toggleInterface() {
        chevronIcon.classList.toggle("rotate-icon-home");
        chevronIcon.classList.toggle("rotate-icon");
        dropdownListBody.classList.toggle("dropdown__body--hide");
        dropDownHeader.classList.toggle("dropdown__header_show");
        dropdownListBody.classList.toggle("dropdown__body--show");
        // dropdownHeader.classList.toggle("dropdown__header--hide");
        // dropdownHeader.classList.toggle("dropdown__header--show");
      }
      const selectItem = (_this) => {
        dropdownHeaderValue.classList.add("dropdown__header--active");
        dropdownHeaderValue.innerText = _this.innerText;
        if (dropdownHeaderValue.querySelector("img")) {
          dropdownHeaderValue.querySelector("img").remove();
          dropdownHeaderValue.classList.remove("dropdown__flex");
        }
        if (_this.querySelector("img")) {
          const img = _this.querySelector("img").cloneNode(true);
          dropdownHeaderValue.classList.add("dropdown__flex");
          dropdownHeaderValue.prepend(img);
        }
        Array.from(this.listItems).forEach((item) => {
          item.classList.remove("selected");
        });
        _this.classList.add("selected");
        this.choisEl = _this;
      };
      this.selected = selectItem;
    }
  }
  select() {
    const firstEl = document.querySelector(".dropdown__body--list-index");
    this.selected(firstEl);
  }

  // get name() {
  //     return this.#nameValue;
  // }
  get choisEl() {
    return this._choisEl;
  }
  set choisEl(el) {
    this._choisEl = el;
    // console.log(this._choisEl);
  }

  get listItems() {
    return this._listItems;
  }
  set listItems(el) {
    this._listItems = el;
  }

  get dropdown() {
    console.log(this._dropdown);
    return this._dropdown;
  }
  set dropdown(el) {
    this._dropdown = el;
  }
}

// new Dropdown("4");

// const this.listItems = document
//   .getElementById("dropdownList")
//   .getElementsByTagName("li");
// const dropDownHeader = document.getElementById("dropdownHeader");
// const chevronIcon = document.getElementById("chevronIcon");
// const dropdownListBody = document.getElementById("dropdownListBody");
// const dropdownHeaderValue = document.getElementById("dropdownHeaderValue");
// const isDropdownDisabled = document
//   .getElementById("dropdown")
//   .classList.contains("disabled");
// const dropdown = document.getElementById("dropdown");

// Array.from(this.listItems).forEach((item) => {
//   item.addEventListener(
//     "click",
//     function () {
//       toggleInterface();
//       selectItem(this);
//     },
//     false
//   );
// });

// dropDownHeader.addEventListener(
//   "click",
//   function () {
//     if (!isDropdownDisabled) {
//       toggleInterface();
//     }
//   },
//   false
// );

// function toggleInterface() {
//   chevronIcon.classList.toggle("rotate-icon-home");
//   chevronIcon.classList.toggle("rotate-icon");
//   dropdownListBody.classList.toggle("dropdown__body--hide");
//   dropdownListBody.classList.toggle("dropdown__body--show");
//   dropdownHeader.classList.toggle("dropdown__header--hide");
//   dropdownHeader.classList.toggle("dropdown__header--show");
// }

// function selectItem(_this) {
//   dropdownHeaderValue.classList.add("dropdown__header--active");
//   dropdownHeaderValue.innerText = _this.innerText;

//   Array.from(this.listItems).forEach((item) => {
//     item.classList.remove("selected");
//   });

//   _this.classList.add("selected");
// }
