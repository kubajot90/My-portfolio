export class ShowSection {
  constructor() {
    this.sectionButtons = null;
    this.sections = null;
  }

  init() {
    this.handleElements();
    this.addListeners();
  }

  handleElements() {
    this.sectionButtons = document.querySelectorAll(".title-button");
    this.sections = document.querySelectorAll("section");
  }

  addListeners() {
    this.sectionButtons.forEach((button) =>
      button.addEventListener("click", (e) => this.showSection(e))
    );
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

    main.style.overflowY = "visible";
    sectionContainer.style.marginRight = "0";
    imageBox.style.height = "100%";
    // imageBox.style.transform = "scale(1.25)";
  }

  hideAllSections() {
    this.sections.forEach((section) => section.classList.add("hide-section"));
  }
}
