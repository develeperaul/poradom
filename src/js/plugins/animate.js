const animateCSS = (node, animation, prefix = "animate__") =>
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    // const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

//для карточки при нажатии на ярлыки

const cardIcons = document.querySelectorAll(".label-home");
const verifyClass = (parentClass, className) => {
  const parents = document.querySelectorAll(parentClass);
  Array.from(parents).forEach((parent) => {
    const elements = parent.querySelectorAll(className);
    Array.from(elements).forEach((element) => {
      if (element) {
        element.classList.remove(className.replace(".", ""));
        return element;
      }
    });
  });
};
const openEl = async function () {
  await verifyClass(".labels", ".label-active");
  const parent = this.parentNode;
  if (parent) parent.classList.toggle("label-active");
};

if (cardIcons) {
  cardIcons.forEach((el) => {
    el.addEventListener("click", openEl);
    el.addEventListener("mouseenter", openEl);
    el.addEventListener("mouseleave", function () {
      this.parentNode.classList.remove("label-active");
    });
  });
}

export { verifyClass };
