import { Scroll } from "./Scroll.js";
import { Paralaxa } from "./Paralaxa.js";
import { Animation } from "./Animation.js";

document.addEventListener("DOMContentLoaded", () => {
  const scroll = new Scroll();
  scroll.init();
  const paralaxa = new Paralaxa();
  paralaxa.init();
  const animation = new Animation();
  animation.init();
});
