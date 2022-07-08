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
      // const xhr = new XMLHttpRequest();
      // xhr.open("GET", "about-me.html", true);
      // xhr.send();

      // xhr.onload = function () {
      //   document
      //     .querySelector(".section__container")
      //     .insertAdjacentHTML("beforeend", this.responseText);

      // };
      //   console.log(e);
      //   console.log("e.state: " + e.state);
      console.log("popstate");
      this.state = e.state;
      const section = document.getElementById(`${this.state}`);
      section.scrollIntoView({ behavior: "smooth" });
    });
  }

  changeUrl(sectionId) {
    const id = sectionId.getAttribute("id");
    history.pushState(`${id}`, null, `#${id}`);
  }
}
