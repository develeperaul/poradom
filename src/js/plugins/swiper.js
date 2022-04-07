import Swiper from "./swiper-bundle.min";
function swiper(name, opts = {}) {
  return new Swiper(name, {
    loop: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    spaceBetween: 16,
    pagination: {
      el: ".swiper-numbs",
      bulletActiveClass: "numb-active",
      bulletClass: "numb",
      type: "bullets",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '">' + (index + 1) + "</span>";
      },
    },
    // pagination: {
    //       el: ".swiper-pagination",
    //       clickable: true,
    //       renderBullet: function (index, className) {
    //         return '<span class="' + className + '">' + (index + 1) + "</span>";
    //       }
    //     },
    ...opts,
  });
}
export default class newSwiper extends swiper {}
new newSwiper(".headerSwiper");
new newSwiper(".readySwiper");
new newSwiper(".hitProject", {
  spaceBetween: 16,
  pagination: {
    el: ".swiper-dots",
    bulletActiveClass: "dot-active",
    bulletClass: "dot",
    type: "bullets",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  },
});
new newSwiper(".newProject", {
  spaceBetween: 16,
  pagination: {
    el: ".swiper-dots",
    bulletActiveClass: "dot-active",
    bulletClass: "dot",
    type: "bullets",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  },
});
new newSwiper("#office", { pagination: {} });

new newSwiper(".newsSwiper");
new newSwiper(".projects");
new newSwiper(".buttonsSwiper", { pagination: {} });
