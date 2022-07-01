import { Scroll } from "./Scroll.js";
import { Paralaxa } from "./Paralaxa.js";
import { NavAnimation } from "./NavAnimation.js";

document.addEventListener("DOMContentLoaded", () => {
  const scroll = new Scroll();
  scroll.init();
  const paralaxa = new Paralaxa();
  paralaxa.init();
  const navAnimation = new NavAnimation();
  navAnimation.init();

  // navAnimation.toggleClass(navAnimation.blackScreen, "black__screen--show");
  navAnimation.blackScreenShow(500);
});
