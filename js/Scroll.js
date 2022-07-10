import { ChangeUrl } from "./ChangeUrl.js";

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

    this.main = null;

    this.changeUrl = new ChangeUrl();
  }

  init() {
    this.handleElements();
    this.addListeners();
    // this.sections[0].scrollIntoView({ behavior: "smooth" });
    this.moveToSection(this.sections[0], "smooth");
    this.changeUrl.init();
    // this.sectionOnView(this.currentSectionIndex);
  }

  handleElements() {
    this.sections = document.querySelectorAll(".section");
    this.headerTitles = document.querySelectorAll(
      "[data-header-Animation-from-left]"
    );
    this.clouds = document.querySelectorAll(".header-Animation-from-right");
    this.main = document.querySelector(".main");
  }

  addListeners() {
    document.addEventListener("wheel", (e) => {
      if (!this.isScroll) {
        this.checkIsScroll();
        if (!this.blockScroll()) {
          this.isWheel = true;
          this.setCurrentSectionIndex(e);
          this.isWheel = false;
        }
      }

      // if (!this.blockScroll()) {
      //   this.isWheel = true;
      //   this.setCurrentSectionIndex(e);
      //   this.isWheel = false;
      // }
    });

    document.addEventListener("touchstart", (e) => {
      if (!this.isScroll) {
        this.checkIsScroll();
        if (!this.blockScroll()) {
          this.isTouch = true;
          this.touchStart = e.touches[0].clientY;
        }
      }
    });
    document.addEventListener("touchmove", (e) => {
      if (!this.isScroll) {
        this.checkIsScroll();
        if (!this.blockScroll()) {
          this.checkTouch(e);
        }
      }
    });

    window.addEventListener("hashchange", () => {
      console.log("hashchange");
      this.changeCurrentSectionIndexByNav();
      // console.log("cu sec index: " + this.currentSectionIndex);
      this.homePageAnimation();
      this.sectionsAnimations();
    });
  }

  setCurrentSectionIndex(e) {
    const lengthOfSections = document.querySelectorAll(".section").length;

    this.isWheel
      ? (this.scrollDirection = e.wheelDelta)
      : (this.scrollDirection = this.scrollDirection);

    // if (!this.isScroll) {
    //   this.checkIsScroll();
    //   this.scrollDirection > 0
    //     ? this.currentSectionIndex--
    //     : this.currentSectionIndex++;
    // }

    this.scrollDirection > 0
      ? this.currentSectionIndex--
      : this.currentSectionIndex++;

    if (this.currentSectionIndex <= 0) {
      this.currentSectionIndex = 0;
    } else if (this.currentSectionIndex >= lengthOfSections - 1) {
      this.currentSectionIndex = lengthOfSections - 1;
    }

    this.isTouch
      ? // ? this.sections[this.currentSectionIndex].scrollIntoView()
        this.moveToSection(this.sections[this.currentSectionIndex], "auto")
      : this.sectionOnView(this.currentSectionIndex);

    this.sectionsAnimations();
  }

  checkIsScroll() {
    this.isScroll = true;
    setTimeout(() => {
      this.isScroll = false;
    }, 1000);
  }

  sectionOnView(indexOfSection) {
    this.homePageAnimation();
    setTimeout(() => {
      // this.sections[indexOfSection].scrollIntoView({ behavior: "smooth" });
      this.moveToSection(this.sections[indexOfSection], "smooth");
    }, 200);
  }

  moveToSection(section, scrollBehavior) {
    section.scrollIntoView({ behavior: scrollBehavior });
    this.changeUrl.changeUrl(section);
  }

  checkTouch(e) {
    const touchPosition = e.touches[0].clientY;

    this.touchStart - touchPosition > 0
      ? (this.scrollDirection = -1)
      : (this.scrollDirection = 1);

    this.setCurrentSectionIndex(e);
    this.scrollDirection = 0;
    this.isTouch = false;
  }

  homePageAnimation() {
    // console.log("homePageAnimation");
    if (this.currentSectionIndex !== 0) {
      this.headerTitles.forEach((elm) =>
        elm.classList.add("reverseTransformFromLeft")
      );
      this.clouds.forEach((elm) =>
        elm.classList.add("reverseTransformAnimFromRight")
      );
    } else if (this.currentSectionIndex === 0) {
      this.headerTitles.forEach((elm) =>
        elm.classList.remove("reverseTransformFromLeft")
      );
      this.clouds.forEach((elm) =>
        elm.classList.remove("reverseTransformAnimFromRight")
      );
    }
  }

  sectionsAnimations() {
    // this.clearAnimationClass("transformAnimFromLeft");
    // console.log("sectionAnimation");
    const elements = document.querySelectorAll(
      `[data-section-${this.currentSectionIndex}]`
    );

    elements.forEach((element) =>
      element.classList.add("transformAnimSections")
    );
    this.removeAnimationClass();
  }

  removeAnimationClass() {
    const elements = document.querySelectorAll(
      `[data-section-${this.currentSectionIndex - 1}],[data-section-${
        this.currentSectionIndex + 1
      }]`
    );
    setTimeout(() => {
      elements.forEach((element) =>
        element.classList.remove("transformAnimSections")
      );
    }, 500);
  }

  changeCurrentSectionIndexByNav() {
    this.sections.forEach((section, index) => {
      // if (section.getBoundingClientRect().y === 0) {
      //   this.currentSectionIndex = index;
      // }
      if (section.getAttribute("id") === this.changeUrl.state) {
        this.currentSectionIndex = index;
      }
    });
    // console.log("cu sec by nav: " + this.currentSectionIndex);
  }

  blockScroll() {
    return document.getElementsByClassName("hide-section").length;
  }
}
