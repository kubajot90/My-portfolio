export class Scroll {
  constructor() {
    this.sections = null;
    this.currentSectionIndex = 0;
    this.isScroll = false;
  }

  init() {
    this.handleElements();
    this.addListeners();
    this.sectionOnView(this.currentSectionIndex);
  }

  handleElements() {
    this.sections = document.querySelectorAll(".section");
  }

  addListeners() {
    document.addEventListener("wheel", (e) => this.setCurrentSectionIndex(e));

    document.addEventListener("touchstart", (e) => console.log(e));
    document.addEventListener("touchmove", (e) =>
      console.log(e.touches[0].clientY)
    );
  }

  setCurrentSectionIndex(e) {
    const lengthOfSections = document.querySelectorAll(".section").length;

    if (!this.isScroll) {
      this.checkIsScroll();
      e.wheelDelta > 0
        ? this.currentSectionIndex--
        : this.currentSectionIndex++;
    }

    if (this.currentSectionIndex <= 0) {
      this.currentSectionIndex = 0;
    } else if (this.currentSectionIndex >= lengthOfSections - 1) {
      this.currentSectionIndex = lengthOfSections - 1;
    }
    this.sectionOnView(this.currentSectionIndex);
  }

  checkIsScroll() {
    this.isScroll = true;
    setTimeout(() => {
      this.isScroll = false;
    }, 1000);
  }

  sectionOnView(indexOfSection) {
    this.sections[indexOfSection].scrollIntoView({ behavior: "smooth" });
  }
}
