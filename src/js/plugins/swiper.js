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
new newSwiper(".storiesSwiper", {
  on: {
    afterInit: (swiper) => {
      console.log(swiper);
      swiper.pagination.bullets.forEach((bullet) => {
        if (bullet.classList.contains("stories-line-active")) {
          bullet.classList.remove("stories-line-active");
          setTimeout(() => bullet.classList.add("stories-line-active"), 0);
          // setTimeout(() => bullet.classList.add("line-active"), 2500);
        }
        console.log(bullet);
      });
    },
    realIndexChange: (swiper) => {
      // console.log(swiper);
      // console.log(swiper.pagination.bullets);
      swiper.pagination.bullets.forEach((bullet, index) => {
        if (index > swiper.realIndex - 1) {
          // &&
          // bullet.classList.contains("stories-line-active")
          // bullet.classList.remove("stories-line-active");
          bullet.classList.remove("line-active");
          console.log(bullet);
        }
        if (index < swiper.realIndex) {
          bullet.classList.add("line-active");
          // setTimeout(() => bullet.classList.add("line-active"), 2500);
        }
        // console.log(swiper.slides.length === swiper.realIndex + 1);
      });
      // console.log(swiper.activeIndex + " - " + swiper.realIndex);

      if (swiper.slides.length === swiper.realIndex + 1) {
        swiper.autoplay.stop();
      } else {
        swiper.autoplay.start();
        swiper.autoplay.running = true;
      }
      console.log(swiper.autoplay);
    },
  },
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  loop: false,
  pagination: {
    el: ".swiper-stories-line",
    bulletActiveClass: "stories-line-active",
    bulletClass: "stories-line",
    type: "bullets",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '"></span>';
    },
  },
});
new newSwiper(".headerSwiper");
new newSwiper(".readySwiper", {});
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
new newSwiper(".featuresSwiper", {
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
});
