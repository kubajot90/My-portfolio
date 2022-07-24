import { ChangeUrl } from "./ChangeUrl.js";
import { Common } from "./Common.js";

export class Scroll extends Common {
  constructor() {
    super();
    // this.sections = null;
    this.currentSectionIndex = 0;
    this.isScroll = false;
    this.isWheel = false;

    this.touchStart = null;
    this.scrollDirection = null;
    this.isTouch = false;

    // this.headerTitles = null;
    // this.clouds = null;

    // this.main = null;

    // this.navItems = null;

    this.changeUrl = new ChangeUrl();
  }

  init() {
    // this.handleElements();
    this.addListeners();
    this.moveToSection(this.sections[0], "smooth");
    this.changeUrl.init();
    // this.setWindowHeight();
  }

  // setWindowHeight() {
  //   const height = window.innerHeight;
  //   const width = window.innerWidth;
  //   this.root.style.setProperty("--hundredVh", `${height}px`);
  //   this.root.style.setProperty("--hundredVw", `${width}px`);
  // }

  // handleElements() {
  //   this.sections = document.querySelectorAll(".section");
  //   this.headerTitles = document.querySelectorAll(
  //     "[data-header-Animation]"
  //   );
  //   this.clouds = document.querySelectorAll(".header-Animation-from-right");
  //   this.main = document.querySelector(".main");
  //   this.navItems = document.querySelectorAll(".big__navigation-item");
  // }

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
      console.log("touchstart");
      // if (!this.isScroll) {
      //   this.checkIsScroll();
      if (!this.blockScroll()) {
        this.isTouch = true;
        this.touchStart = e.touches[0].clientY;
      }
      // }
    });
    document.addEventListener("touchmove", (e) => {
      console.log("touchmove");
      if (!this.isScroll) {
        this.checkIsScroll();
        console.log("check is scroll");
        if (!this.blockScroll()) {
          this.checkTouch(e);
        }
      }
      // debugger;
    });

    window.addEventListener("hashchange", () => {
      console.log("hashchange");
      this.changeCurrentSectionIndexByNav();
      this.homePageAnimation();
      this.sectionsAnimations();
    });

    this.navItems.forEach((item) => {
      item.addEventListener("click", () => {
        // debugger;
        const id = item.dataset.id;
        history.pushState(`${id}`, null, `#${id}`);
        window.location.hash = `#${id}`;
        this.changeCurrentSectionIndexByNav();
        this.homePageAnimation();
        this.sectionsAnimations();
        this.sections[this.currentSectionIndex].scrollIntoView();
      });
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
    console.log("this.currentSectionIndex: " + this.currentSectionIndex);
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
    // this.homePageAnimation();
  }

  checkIsScroll() {
    this.isScroll = true;
    setTimeout(() => {
      this.isScroll = false;
    }, 1000);
  }

  sectionOnView(indexOfSection) {
    this.homePageAnimation();
    // setTimeout(() => {
    //   this.moveToSection(this.sections[indexOfSection], "smooth");
    // }, 200);
    this.moveToSection(this.sections[indexOfSection], "smooth");
  }

  moveToSection(section, scrollBehavior) {
    // debugger;
    section.scrollIntoView({ behavior: scrollBehavior });
    this.changeUrl.changeUrl(section);

    console.log("move to section---------------");
    console.log(section);
  }

  checkTouch(e) {
    console.log("check touch");
    const touchPosition = e.touches[0].clientY;
    console.log("touchStart" + this.touchStart);
    console.log("touchPosition" + touchPosition);
    console.log(
      "this.touchStart - touchPosition" + (this.touchStart - touchPosition)
    );

    this.touchStart - touchPosition > 0
      ? (this.scrollDirection = -1)
      : (this.scrollDirection = 1);

    this.setCurrentSectionIndex(e);
    this.scrollDirection = 0;
    this.isTouch = false;
  }

  sectionsAnimations() {
    const elements = document.querySelectorAll(
      `[data-section-${this.currentSectionIndex}]`
    );

    elements.forEach((element) =>
      element.classList.add("transformAnimSections")
    );
    this.removeAnimationClass();
    this.imageBoxAnimation();
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

  imageBoxAnimation() {
    const imageBoxes = document.querySelectorAll(".image-box");
    const currentImageBoxIndex = this.currentSectionIndex - 1;

    imageBoxes.forEach((box, index) => {
      if (index === currentImageBoxIndex) {
        box.style.transform = "scale(1)";
      } else {
        box.style.transform = "scale(.8)";
      }
    });
  }

  // changeCurrentSectionIndexByNav() {
  //   this.sections.forEach((section, index) => {
  //     if (section.getAttribute("id") === window.location.hash.slice(1)) {
  //       this.currentSectionIndex = index;
  //     }
  //   });
  // }

  blockScroll() {
    return document.getElementsByClassName("hide-section").length;
  }
}
