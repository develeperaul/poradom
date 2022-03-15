var isInViewport = function (elem) {
  //   console.log(elem);
  var distance = elem.getBoundingClientRect();
  return (
    distance.top >= 0 &&
    distance.left >= 0 &&
    distance.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    distance.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

let count = 0;
var findMe = document.querySelector(`#out-1`);

window.addEventListener(
  "scroll",
  function (event) {
    // console.log(findMe);
    if (isInViewport(findMe)) {
      if (count < 1) {
        outNum(1469, "out-1");
      }
      //   setTimeout(function () {
      //     odometer1.innerHTML = 2409;
      //     odometer2.innerHTML = 42;
      //   }, 100);
    }
  },
  false
);

const time = 1;
const step = 1;

function outNum(num, elem) {
  count = count + 1;
  let l = document.querySelector(`#${elem}`),
    n = 0,
    t = time / num / step;
  let interval = setInterval(() => {
    // console.log(t);
    // console.log(time / (num / step));
    n = n + step;
    if (n == num) clearInterval(interval);
    l.innerHTML = n;
  }, 0.001);
}
