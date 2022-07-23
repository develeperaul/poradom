export default class Filter {
  constructor() {
    this.open = false;
    this.card = document.querySelector(".card-filter");
    const square = document.querySelector(".square");
    const items = document.querySelectorAll(".card-filter__item");
    if (square) {
      square.onclick = () => {
        if (!square.classList.contains("square_active")) {
          square.classList.add("square_active");
          this.card.classList.add("card-filter_open");
          setTimeout(() => (this.open = true), 0.2);
        }
      };
      document.onclick = (e) => {
        if (this.open && !e.composedPath().includes(this.card)) {
          this.card.classList.remove("card-filter_open");
          square.classList.remove("square_active");
          this.open = false;
        }
      };
    }
    if (items) {
      Array.from(items).forEach((item) => {
        if (item.classList.contains("card-filter__item_active"))
          item.classList.remove("card-filter__item_active");
        item.addEventListener("click", function () {
          const getParam = item.getAttribute("data-get");
          Array.from(items).forEach((item) => {
            if (item.classList.contains("card-filter__item_active"))
              item.classList.remove("card-filter__item_active");
          });
          item.classList.add("card-filter__item_active");
          if (getParam) {
            let searhPath = window.location.search;
            let path = `${window.location.origin}${
              window.location.pathname === "/" ? "" : window.location.pathname
            }`;
            console.log(searhPath);
            searhPath = searhPath.replace(
              /[&|?]sort=[-+]?[0-9]*\.?[0-9]+/g,
              ""
            );
            console.log(searhPath);
            const query =
              searhPath !== ""
                ? `${searhPath}&sort=${getParam}`
                : `?sort=${getParam}`;
            window.location.href = `${path}${query}`;
          }
        });
      });
    }
  }

  get isOpen() {
    return this.card.classList.contains("card-filter_open");
  }
}
