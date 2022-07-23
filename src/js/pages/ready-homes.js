import "../../scss/pages/ready-homes/style.scss";
import "../../pages/ready-homes.html";
import Filter from "../plugins/fitler";
import ButtonGroup from "../plugins/choice-button";
new ButtonGroup("ready-homes-btns");
import ScrollPos from "../plugins/scroll-pos";
new ScrollPos("ready-homes-btns");

new Filter();
