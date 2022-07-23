class Validate {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      const forms = document.querySelectorAll("form");
      this.validate = null;
      forms.forEach((form) => {
        form.addEventListener("submit", (event) => {
          console.log("validate");
          const fields = form.querySelectorAll("[data-special-offer]");
          event.preventDefault();
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
        });
      });
    });
  }
  get validate() {
    return this._validate;
  }
  set validate(el) {
    this._validate = el;
    console.log(el);
  }
  success() {
    this.validate = null;
  }
}

export const validate = new Validate();
