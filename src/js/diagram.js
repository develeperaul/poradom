/**
 *
 * @param startColor указывает начальный цвет
 * @param endColor указывает конечный цвет
 * Шаг @param делит количество областей градиента
 * @returns {Array} возвращает массив цветов градиента
 */
let gradientColor = function (startColor, endColor, step) {
  let startRGB = this.colorRgb(startColor); // Преобразовать в режим массива rgb
  let startR = startRGB[0];
  let startG = startRGB[1];
  let startB = startRGB[2];

  let endRGB = this.colorRgb(endColor);
  let endR = endRGB[0];
  let endG = endRGB[1];
  let endB = endRGB[2];

  let sR = (endR - startR) / step; // Общая разница
  let sG = (endG - startG) / step;
  let sB = (endB - startB) / step;

  let colorArr = [];
  for (let i = 0; i < step; i++) {
    // Рассчитать шестнадцатеричное значение каждого шага
    let hex = this.colorHex(
      "rgb(" +
        parseInt(sR * i + startR) +
        "," +
        parseInt(sG * i + startG) +
        "," +
        parseInt(sB * i + startB) +
        ")"
    );
    colorArr.push(hex);
  }
  return colorArr.reverse();
};

// Преобразование шестнадцатеричного представления в представление rgb (здесь возвращается режим массива rgb)
gradientColor.prototype.colorRgb = function (sColor) {
  let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  sColor = sColor.toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // Обработка шестибитового значения цвета
    let sColorChange = [];
    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
    }
    return sColorChange;
  } else {
    return sColor;
  }
};
// Преобразовать представление rgb в представление hex
gradientColor.prototype.colorHex = function (rgb) {
  let _this = rgb;
  let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    let strHex = "#";
    for (let i = 0; i < aColor.length; i++) {
      let hex = Number(aColor[i]).toString(16);
      hex = hex < 10 ? 0 + "" + hex : hex; // Убедитесь, что каждое значение RGB составляет 2 цифры
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  } else if (reg.test(_this)) {
    let aNum = _this.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return _this;
    } else if (aNum.length === 3) {
      let numHex = "#";
      for (let i = 0; i < aNum.length; i += 1) {
        numHex += aNum[i] + aNum[i];
      }
      return numHex;
    }
  } else {
    return _this;
  }
};

// Пример алгоритма градиентного цвета
// let color_list =
// console.log(color_list);

// (function () {
// если 100% это 100
//   если 0% это 44,44
// 1% это 0,56 если 100% = 100*0,56
// Значения индикаторов от 0 до 100.
const zero = 44.44;
var data = [100, 72.44, 100, 44.44, 72.44, 100, 44.44, 72.44, 100];

var diagramWidth = 320,
  diagramHeight = 320,
  cx = diagramWidth / 2,
  cy = diagramHeight / 2,
  //   indicatorRadiuses = [102, 96, 90],
  indicatorRadiuses = [150, 140, 130, 120, 110, 100, 90, 80, 70],
  maxAngle = 270,
  diagramBgColor = "trasnparent",
  indicatorBgColor = "trasnparent",
  indicatorColors = new gradientColor("#268EFB", "#F2F8FF", 9),
  indicatorBgWidth = 10,
  indicatorWidth = 10;

function polarToCartesian(cx, cy, radius, deg) {
  var rad = ((deg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function indicator(x, y, radius, angleStart, angleEnd) {
  var start = polarToCartesian(x, y, radius, -angleEnd),
    end = polarToCartesian(x, y, radius, angleStart),
    largeArc = angleEnd - angleStart <= 180 ? 0 : 1;
  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArc,
    1,
    end.x,
    end.y,
  ].join(" ");
}

document.addEventListener("DOMContentLoaded", function () {
  var scene = document.getElementById("scene");
  //   scene.setAttribute("width", diagramWidth);
  //   scene.setAttribute("height", diagramHeight);
  scene.setAttribute("viewBox", "0 0 320 320");
  //   scene.setAttribute("preserveAspectRatio", "xMidYMid meet");

  scene.style.backgroundColor = diagramBgColor;
  for (var i = 0; i < data.length; i++) {
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-opacity", 0);
    path.setAttribute("stroke", indicatorBgColor);
    path.setAttribute("stroke-width", indicatorBgWidth);

    scene.appendChild(path);

    path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill-opacity", 0);
    path.setAttribute("stroke", indicatorColors[i]);
    path.setAttribute("stroke-width", indicatorWidth);
    path.setAttribute(
      "d",
      indicator(cx, cy, indicatorRadiuses[i], 0, (data[i] / 100) * maxAngle)
    );
    scene.appendChild(path);
  }
});
// })();
