export class Scroll {
  constructor() {
    this.sections = null;
    this.currentSectionIndex = 0;
    this.isScroll = false;
    this.isWheel = false;

    this.touchStart = null;
    this.scrollDirection = null;
    this.isTouch = false;

    this.headerTitles = null;
    this.clouds = null;
  }

  init() {
    this.handleElements();
    this.addListeners();
    this.sections[0].scrollIntoView({ behavior: "smooth" });
    // this.sectionOnView(this.currentSectionIndex);
  }

  handleElements() {
    this.sections = document.querySelectorAll(".section");
    this.headerTitles = document.querySelectorAll(
      "[data-header-Animation-from-left]"
    );
    this.clouds = document.querySelectorAll(".header-Animation-from-right");
  }

  addListeners() {
    document.addEventListener("wheel", (e) => {
      this.isWheel = true;
      this.setCurrentSectionIndex(e);
      this.isWheel = false;
    });

    document.addEventListener("touchstart", (e) => {
      this.isTouch = true;
      this.touchStart = e.touches[0].clientY;
    });
    document.addEventListener("touchmove", (e) => this.checkTouch(e));
  }

  setCurrentSectionIndex(e) {
    const lengthOfSections = document.querySelectorAll(".section").length;

    this.isWheel
      ? (this.scrollDirection = e.wheelDelta)
      : (this.scrollDirection = this.scrollDirection);

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

    this.isTouch
      ? this.sections[this.currentSectionIndex].scrollIntoView()
      : this.sectionOnView(this.currentSectionIndex);
    // console.log("currentsectionindex: " + this.currentSectionIndex);
  }

  checkIsScroll() {
    this.isScroll = true;
    setTimeout(() => {
      this.isScroll = false;
    }, 1000);
  }

  sectionOnView(indexOfSection) {
    this.scrollAnimation(this.headerTitles, "reverseTransformFromLeft");
    this.scrollAnimation(this.clouds, "reverseTransformAnimFromRight");
    setTimeout(() => {
      this.sections[indexOfSection].scrollIntoView({ behavior: "smooth" });
    }, 200);
  }

  checkTouch(e) {
    const touchPosition = e.touches[0].clientY;
    console.log(
      "this.touchStart - touchPosition: " + (this.touchStart - touchPosition)
    );

    this.touchStart - touchPosition > 0
      ? (this.scrollDirection = -1)
      : (this.scrollDirection = 1);

    this.setCurrentSectionIndex(e);
    console.log(this.scrollDirection);
    this.scrollDirection = 0;
    this.isTouch = false;
  }

  scrollAnimation(elements, toggleClass) {
    elements.forEach((element) => {
      element.classList.toggle(toggleClass);
    });
  }
}
