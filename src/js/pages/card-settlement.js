// import "../plugins/validateform";
import "../../pages/card-settlement.html";
YMaps.jQuery(function () {
  // Создает экземпляр карты и привязывает его к созданному контейнеру
  var map = new YMaps.Map(YMaps.jQuery("#YMapsID")[0]);
  console.log(YMaps.jQuery("#YMapsID")[0]);
  // Устанавливает начальные параметры отображения карты: центр карты и коэффициент масштабирования
  map.setCenter(new YMaps.GeoPoint(37.64, 55.76), 10);
});
function apifault(err) {
  // Создает обработчик события window.onLoad
  // Отображает сообщение об ошибке в контейнере над картой
  window.onload = function () {
    var errorContainer = document.getElementById("error");
    errorContainer.innerHTML =
      'При загрузке API произошел сбой. Сообщение об ошибке: "' + err + '"';
    errorContainer.style.display = "";
  };
}
