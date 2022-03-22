export default class Dropdown {
  constructor(name) {
    if(document.getElementById(`dropdownList_${name}`)){

      const listItems = document
        .getElementById(`dropdownList_${name}`)
        .getElementsByTagName("li");
      const dropDownHeader = document.getElementById(`dropdownHeader_${name}`);
      const chevronIcon = document.getElementById(`chevronIcon_${name}`);
      const dropdownListBody = document.getElementById(
        `dropdownListBody_${name}`
      );
      const dropdownHeaderValue = document.getElementById(
        `dropdownHeaderValue_${name}`
      );
      const isDropdownDisabled = document
        .getElementById(`dropdown_${name}`)
        .classList.contains("disabled");
      const dropdown = document.getElementById(`dropdown_${name}`);
      Array.from(listItems).forEach((item) => {
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
        dropdownListBody.classList.toggle("dropdown__body--show");
        // dropdownHeader.classList.toggle("dropdown__header--hide");
        // dropdownHeader.classList.toggle("dropdown__header--show");
      }
      function selectItem(_this) {
        dropdownHeaderValue.classList.add("dropdown__header--active");
        dropdownHeaderValue.innerText = _this.innerText;
        Array.from(listItems).forEach((item) => {
          item.classList.remove("selected");
        });
        _this.classList.add("selected");
      }
    }
  }
}

// new Dropdown("4");

// const listItems = document
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

// Array.from(listItems).forEach((item) => {
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

//   Array.from(listItems).forEach((item) => {
//     item.classList.remove("selected");
//   });

//   _this.classList.add("selected");
// }
