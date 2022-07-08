import "../../pages/picker.html";
import Filter from "../plugins/fitler";
import Dropdown from "../plugins/dropdown";
new Dropdown("1");
new Dropdown("2");
new Dropdown("3");
new Dropdown("4");
new Filter();

// const path = "?type=3&poselok=11&s=99&su=12.45";
const path = window.location.search;
const drop = document.querySelector(".built__drop");
const button = drop.querySelector(".dropdown__btn");
let query = [];
const dropdown = document.querySelectorAll(".dropdown");
// const dropHeader = document.querySelectorAll(".dropdown__header--title");
console.log(dropdown);
// const dropBody = document.querySelectorAll(".dropdown__body--list");

dropdown.forEach((item) => {
  const t = item.getAttribute("data-type");
  const header = item.querySelector(".dropdown__header--title");
  const body = item.querySelectorAll(".dropdown__body--list-index");
  //   body.find(i=>i.getAttribute(`data-index-${t}`) == type)
  const regexp = new RegExp(`${t}=[-+]?[0-9]*\.?[0-9]+`, "g");

  const miniPathID = path.match(regexp) ? path.match(regexp)[0] : null;
  console.log(miniPathID);
  if (miniPathID) {
    console.log(miniPathID);
    const bodyitem = Array.from(body).find(
      (i) =>
        i.getAttribute(`data-index-type`) == miniPathID.replace(`${t}=`, "")
    );
    const text = bodyitem.innerHTML;
    query.push(t);
    header.textContent = text;
    header.setAttribute(
      "data-header",
      bodyitem.getAttribute("data-index-type")
    );
  }
});
console.log(query);
button.addEventListener("click", (e) => {
  const queryPath = [];
  const types = document.querySelectorAll(`[data-header]`);
  types.forEach((item) => queryPath.push(item.getAttribute("data-header")));
  const type = queryPath[0];
  const poselok = queryPath[1];
  const s = queryPath[2];
  const su = queryPath[3];
  if (type && poselok) {
    const path = button.getAttribute("data-href");

    button.href = `${path}/?type=${type}&poselok=${poselok}${
      s ? `&s=${s}` : ""
    }${su ? `&su=${su}` : ""}`;
  }
});
