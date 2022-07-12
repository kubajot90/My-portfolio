import { Scroll } from "./Scroll.js";
import { Paralaxa } from "./Paralaxa.js";
import { NavAnimation } from "./NavAnimation.js";
import { ShowSection } from "./ShowSection.js";
import { Common } from "./Common.js";

document.addEventListener("DOMContentLoaded", () => {
  const common = new Common();
  const scroll = new Scroll();
  scroll.init();
  const paralaxa = new Paralaxa();
  paralaxa.init();
  const navAnimation = new NavAnimation();
  navAnimation.init();
  navAnimation.blackScreenShow(500);
  const showSection = new ShowSection();
  showSection.init();
});
