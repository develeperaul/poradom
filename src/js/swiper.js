import Swiper from "./swiper-bundle.min";
function swiper(name, opts={}) {
  return new Swiper(name, {
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
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
    ...opts
  });
}
class newSwiper extends swiper {}
new newSwiper(".headerSwiper", {
  spaceBetween: 8,
});
new newSwiper(".readySwiper");
new newSwiper(".newProject" , {
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
    }
});
new newSwiper(".newsSwiper");
new newSwiper(".buttonsSwiper",{pagination:{}});
