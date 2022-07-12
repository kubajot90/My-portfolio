import { Common } from "./Common.js";

export class ChangeUrl extends Common {
  constructor() {
    super();
    // this.previousSection = null;
    // this.isPushStateBlock = false;
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    window.addEventListener("popstate", (e) => {
      const section = document.getElementById(
        `${window.location.hash.slice(1)}`
      );
      console.log("popstate1");
      console.log(section);
      console.log(
        "popstate 1 window.location.hash.slice(1): " +
          window.location.hash.slice(1)
      );
      section.scrollIntoView({ behavior: "smooth" });
    });
  }

  changeUrl(sectionElement) {
    console.log("changeUrl");
    const id = sectionElement.getAttribute("id");
    console.log("changeurlid: " + id);
    console.log("window location: " + window.location.hash.slice(1));
    history.pushState(`${id}`, null, `#${id}`);
  }
}
