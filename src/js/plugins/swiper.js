import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "swiper/css/pagination";
import Swiper, { Navigation, Pagination, Grid, Autoplay } from "swiper";
// import styles bundle

const swiper = (name, opts = {}) => {
  return new Swiper(name, {
    modules: [Navigation, Pagination, Grid, Autoplay],
    loop: true,
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },
    spaceBetween: 16,
    pagination: {
      dynamicBullets: true,
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
};
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

export const stories = new newSwiper(".testSwiper", {
  centeredSlides: true,
  init: false,
  spaceBetween: 0,
  breakpoints: {
    769: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    850: {
      slidesPerView: 2.5,
      spaceBetween: 14,
    },
    1366: {
      slidesPerView: 3.5,
      spaceBetween: 14,
    },
    1660: {
      slidesPerView: 4.5,
      spaceBetween: 14,
    },
    onAny(eventName, ...args) {
      console.log("Event: ", eventName);
      console.log("Event data: ", args);
    },
  },
  autoplay: {
    delay: 100,
    disableOnInteraction: false,
  },
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
new newSwiper(".headerSwiper", { spaceBetween: 0 });
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

const s = new Swiper(".newsSwiper", {
  modules: [Navigation, Pagination, Grid],
  loop: false,
  // slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    dynamicBullets: true,
    dynamicMainBullets: 4,
    el: ".swiper-numbs",
    bulletActiveClass: "numb-active",
    bulletClass: "numb",
    type: "bullets",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
  breakpoints: {
    767: {
      slidesPerView: 2,
      grid: {
        fill: "row",
        rows: 2,
      },
      pagination: {
        dynamicBullets: false,
      },
    },
  },

  // grid: {
  //   rows: 2,
  // },
  // breakpoints: {
  //   1440: {
  //   }
  // }
});
new newSwiper(".projects");
new newSwiper(".buttonsSwiper", { pagination: {} });
new newSwiper(".featuresSwiper", {
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
  on: {
    paginationUpdate: function (swiper, paginationEl) {
      swiper.pagination.bullets.forEach((bullet, index) => {
        const left = +bullet.style.left.replace("px", "");
        if (left > 0) bullet.style.left = "0px";
      });
    },
  },
  pagination: {
    dynamicBullets: true,
    dynamicMainBullets: 2,
    el: ".swiper-numbs",
    bulletActiveClass: "numb-active",
    bulletClass: "numb",
    type: "bullets",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  },
});

new newSwiper(".itemSwiper", {
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
  // on: {
  //   paginationUpdate: function (swiper, paginationEl) {
  //     swiper.pagination.bullets.forEach((bullet, index) => {
  //       const left = +bullet.style.left.replace("px", "");
  //       if (left > 0) bullet.style.left = "0px";
  //     });
  //   },
  // },
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
});

new newSwiper(".otherProjects", {
  modules: [Navigation, Pagination],
  loop: false,
  // slidesPerView: 1,
  spaceBetween: 30,
  breakpoints: {
    1000: {
      slidesPerView: 4,
      pagination: {
        dynamicBullets: false,
      },
    },
    768: {
      slidesPerView: 3,
      pagination: {
        dynamicBullets: false,
      },
    },
  },
});

new newSwiper(".roadMap", {
  pagination: {},
  navigation: {
    nextEl: ".swiper-next-arrow",
    prevEl: ".swiper-prev-arrow",
  },
  loop: false,
  breakpoints: {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    "@1.50": {
      slidesPerView: 6,
      spaceBetween: 50,
    },
  },
});

new Swiper(".newsSlider", {
  modules: [Navigation, Pagination, Grid],
  loop: false,
  breakpoints: {
    1000: {
      slidesPerView: 4,
      grid: {
        fill: "row",
        rows: 3,
      },
    },
    768: {
      slidesPerView: 3,
      grid: {
        fill: "row",
        rows: 3,
      },
    },
  },
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
});

new newSwiper(".regionSwiper", {
  spaceBetween: 0,
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
  pagination: {
    dynamicBullets: false,
    el: ".button__group",

    bulletActiveClass: "button__round_active",
    bulletClass: "button__round button__round-white",
    type: "bullets",
    clickable: true,
    renderBullet: function (index, className) {
      const attrs = JSON.parse(
        this.pagination.el.getAttribute("data-pagination")
      );
      if (attrs) {
        return '<span class="' + className + '">' + attrs[index] + "</span>";
      }
      // const sliders = this.el.querySelectorAll(".test-pag");
      // Array.from(sliders).forEach((slider) => {
      //   console.log(slider.getAttribute("data-slide"));
      // });
    },
  },
});
