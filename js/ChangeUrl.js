export class ChangeUrl {
  constructor() {
    this.state = null;
  }
  init() {
    this.handleElements();
    this.addListeners();
  }

  handleElements() {}

  addListeners() {
    window.addEventListener("popstate", (e) => {
      const section = document.getElementById(
        `${window.location.hash.slice(1)}`
      );
      section.scrollIntoView({ behavior: "smooth" });
    });
  }

  changeUrl(sectionElement) {
    console.log("changeUrl");
    const id = sectionElement.getAttribute("id");
    history.pushState(`${id}`, null, `#${id}`);
  }
}
