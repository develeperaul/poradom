import '../../pages/series.html'
import newSwiper from "../plugins/swiper";
import Cards from  '../plugins/cards'
new Cards('new')
new newSwiper(".hitProject" , {
  spaceBetween: 16,
      pagination: {
      el: ".swiper-dots",
      bulletActiveClass: "dot__lg-red-active",
      bulletClass: "dot__lg-red",
      type: "bullets",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    }
});