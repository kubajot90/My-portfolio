export class Scroll {
  constructor() {
    this.sections = null;
    this.currentSectionIndex = 0;
    this.isScroll = false;

    this.touchStart = null;
    this.scrollDirection = null;
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

    document.addEventListener(
      "touchstart",
      (e) => (this.touchStart = e.touches[0].clientY)
    );
    document.addEventListener("touchmove", (e) => this.checkTouch(e));
  }

  setCurrentSectionIndex(e) {
    const lengthOfSections = document.querySelectorAll(".section").length;
    this.scrollDirection = e.wheelDelta;

    if (!this.isScroll) {
      this.checkIsScroll();
      this.scrollDirection > 0
        ? this.currentSectionIndex--
        : this.currentSectionIndex++;
    }

    if (this.currentSectionIndex <= 0) {
      this.currentSectionIndex = 0;
    } else if (this.currentSectionIndex >= lengthOfSections - 1) {
      this.currentSectionIndex = lengthOfSections - 1;
    }
    this.sectionOnView(this.currentSectionIndex);
    console.log("currentsectionindex" + this.currentSectionIndex);
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

  checkTouch(e) {
    const touchPosition = e.touches[0].clientY;

    this.touchStart - touchPosition > 0
      ? (this.scrollDirection = 1)
      : (this.scrollDirection = -1);

    this.setCurrentSectionIndex(e);
  }
}
