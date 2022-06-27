export class Scroll {
  constructor() {
    this.section1 = null;
    this.section2 = null;
    this.section3 = null;
  }

  init() {
    this.handleElements();
    this.addListeners();

    this.section1.scrollIntoView();

    window.addEventListener("scroll", () => {
      this.moveScrollto();
    });
  }

  handleElements() {
    this.section1 = document.querySelector("#red");
    this.section2 = document.querySelector("#blue");
    this.section3 = document.querySelector("#green");
  }

  addListeners() {}

  refreshBrowserOnTop() {
    this.section1.scrollIntoView();
  }

  moveScrollto() {
    console.log("dziala");
    this.section3.scrollIntoView({ behavior: "smooth" });
  }
}
