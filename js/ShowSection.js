export class ShowSection {
  constructor() {
    this.isButtonClicked = false;

    this.sectionButtons = null;
    this.sections = null;
    this.blackScreen = null;
  }

  init() {
    this.handleElements();
    this.addListeners();
  }

  handleElements() {
    this.sectionButtons = document.querySelectorAll(".title-button");
    this.sections = document.querySelectorAll("section");
    this.blackScreen = document.querySelector(".black__screen");
  }

  addListeners() {
    this.sectionButtons.forEach((button) =>
      button.addEventListener("click", (e) => this.showSection(e))
    );

    window.addEventListener("click", () => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", "about-me.html", true);
      xhr.send();

      xhr.onload = function () {
        document
          .querySelector(".section__container")
          .insertAdjacentHTML("beforeend", this.responseText);

        // .innerHTML =
        //   this.responseText;
      };
    });
  }

  showSection(e) {
    const currentSectionIndex = e.target.dataset.currentSection;

    const sectionContainer = this.sections[currentSectionIndex].querySelector(
      ".section__container"
    );
    const imageBox =
      this.sections[currentSectionIndex].querySelector(".image-box");
    const main = document.querySelector(".main");
    this.hideAllSections();

    this.sections[currentSectionIndex].classList.remove("hide-section");

    main.classList.toggle("main--section-expand");
    sectionContainer.classList.toggle("section__container--section-expand");
    imageBox.classList.toggle("image-box--section-expand");
    this.blackScreen.classList.toggle("black__screen--section-background");
  }

  hideAllSections() {
    this.sections.forEach((section) => section.classList.add("hide-section"));
  }
}
