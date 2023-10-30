import Dropdown from "./dropdown";
new Dropdown("calc");

window.addEventListener("DOMContentLoaded", function () {
  function getPayment(sum, period, rate) {
    var i, koef, result;

    // ставка в месяц
    i = rate / 12 / 100;

    // коэффициент аннуитета
    koef =
      (i * Math.pow(1 + i, period * 12)) / (Math.pow(1 + i, period * 12) - 1);

    // итог
    result = sum * koef;

    // округлим до целых
    return result.toFixed();
  }
  function getValueDropdown(parent) {
    const dropdownHeader = form.querySelector("[data-dropdown_header]");

    items.forEach((item) => {
      console.log(item.textContent);
    });
    console.log(form.querySelector("[data-dropdown_header]").textContent);
  }
  function setMonth(input, callback, prefix) {
    prefix;
    input.value = callback;
  }
  function setPrefix(input, val, start, end) {
    const newvalue = start + val + end;

    input.value = isNaN(val) ? null : newvalue;
    input.selectionStart = input.selectionEnd = val.length;
  }
  const form = document.querySelector("#calc-1");
  if (form) {
    console.log(form);
    const inputs = form.querySelectorAll("input");
    const text = form.querySelector(".calc__text")
    const dropdownHeader = form.querySelector("[data-dropdown_header]");
    const month = form.querySelector("[data-input='month']");

    const items = form.querySelectorAll("[data-dropdown_item]");
    const buttons = form.querySelectorAll("[data-button]");
    let period, rate, sum, initial;
    function findButton() {
      let buttonActive;
      buttons.forEach((button, index) => {
        if (button.classList.contains("button__round_active")) {
          buttonActive = button;
          inputs.forEach((input) => {
            if (input.dataset.input === "rate") {
              rate = button.dataset.rate;
              setPrefix(input, rate, "", " %");
            }
            if (input.dataset.input === "period")
              input.setAttribute("data-period", "10");
            if (input.dataset.input === "initial")
              input.setAttribute("data-minimum", button.dataset.minimum);
          });
        }

        button.addEventListener("click", (e) => {
          e.preventDefault();
          if (buttonActive && buttonActive !== button) {
            buttonActive.classList.remove("button__round_active");
            button.classList.add("button__round_active");
            buttonActive = button;
            if(text) text.textContent = button.dataset.text
            inputs.forEach((input) => {
              if (input.dataset.input === "rate") {
                rate = button.dataset.rate;
                setPrefix(input, rate, "", " %");
              }
              if (input.dataset.input === "initial")
                input.setAttribute("data-minimum", button.dataset.minimum);
            });
            setPrefix(
              month,
              getPayment(sum - initial, period, rate),
              "от ",
              " руб/мес"
            );
          }
        });
      });
    }
    findButton();

    function findDropdown(val) {
      const valTrim = val.trim();
      items.forEach((item) => {
        if (valTrim && item.textContent.trim() == valTrim) {
          console.log(item.dataset.sum);
          inputs.forEach((input) => {
            if (input.dataset.input === "house") {
              setPrefix(input, item.dataset.house, "", " руб");
            }
            if (input.dataset.input === "sum") {
              sum = item.dataset.sum;
              setPrefix(input, sum, "", " руб");
            }
            if (input.dataset.input === "plot") {
              setPrefix(input, item.dataset.plot, "", " руб");
            }
            if (input.dataset.minimum) {
              initial = item.dataset.sum / input.dataset.minimum;

              setPrefix(input, initial, "", " руб");
            }
            if (input.dataset.period) {
              period = input.dataset.period;
              setPrefix(input, period, "", " лет");
            }
          });

          setPrefix(
            month,
            getPayment(sum - initial, period, rate),
            "от ",
            " руб/мес"
          );
          return true;
        }
      });
    }
    findDropdown(dropdownHeader.textContent);
    dropdownHeader.addEventListener("DOMSubtreeModified", function (e) {
      const val = e.target.textContent;
      findDropdown(val);
    });
    //   getValueDropdown(form);
    let max;
    inputs.forEach((input) => {
      if (input.dataset.input === "sum") max = input.value;
      // if (input.dataset.input === "sum") max.input.target.value;
      input.addEventListener("input", (e) => {
        if (e.target.value.replace(/[^\d]/gm, "") !== "") {
          const val = e.target.value
            .replace(/[^0-9.]/g, "")
            .replace(/(\..*)\./g, "$1");
          console.log(input.dataset.input === "initial");
          if (input.dataset.input === "initial") {
            setPrefix(input, val, "", " руб");
            initial = val;
          }
          if (input.dataset.input === "period") {
            setPrefix(input, val, "", " лет");
            period = val;
          }
          console.log(initial);

          setPrefix(
            month,
            getPayment(sum - initial, period, rate),
            "от ",
            " руб/мес"
          );
          // console.log(getPayment(val, 10, 9));
          //   inputs.forEach((el) => {
          //     el.value = 123456;
          //   });
        } else input.value = "";
      });
    });
    console.log(inputs);
    // form.addEventListener("click", (e) => {
    //   console.log(e);
    // });
  }
});
