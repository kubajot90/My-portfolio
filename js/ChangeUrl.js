import { Common } from "./Common.js";

export class ChangeUrl extends Common {
  constructor() {
    super();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    window.addEventListener("popstate", (e) => {
      console.log(window.location.hash);
      const section = document.getElementById(
        `${window.location.hash.slice(1)}`
      );
      console.log("popstate1");
      section.scrollIntoView({ behavior: "smooth" });
    });
  }

  changeUrl(sectionElement) {
    console.log("changeUrl");
    const id = sectionElement.getAttribute("id");
    history.pushState(`${id}`, null, `#${id}`);
  }
}
