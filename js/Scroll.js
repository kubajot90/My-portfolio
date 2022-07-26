import { ChangeUrl } from "./ChangeUrl.js";
import { Common } from "./Common.js";

export class Scroll extends Common {
  constructor() {
    super();
    // this.sections = null;
    this.currentSectionIndex = 0;
    this.isScroll = false;
    this.isWheel = false;

    this.touchStart = 0;
    this.touchPosition = null;
    this.scrollDirection = null;
    this.isTouch = false;

    this.contentBox = null;
    this.distance = 0;
    this.lastDistance = 0;

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
      console.log("wheel");
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

    document.addEventListener(
      "touchstart",
      (e) => {
        console.log("touchstart");
        this.lastDistance = this.distance;
        this.touchStart = e.touches[0].clientY;
        if (!this.blockScroll()) {
          this.isTouch = true;
          // this.touchStart = e.touches[0].clientY;
        }
        e.preventDefault();
      },
      { passive: false }
    );

    document.addEventListener(
      "touchmove",
      (e) => {
        this.touchPosition = e.touches[0].clientY;
        e.preventDefault();
        this.scrollSectionByTouch();
        if (!this.isScroll) {
          this.checkIsScroll();
          if (!this.blockScroll()) {
            this.checkTouch(e);
          }
        }
      },
      { passive: false }
    );

    window.addEventListener("hashchange", () => {
      console.log("hashchange");
      this.changeCurrentSectionIndexByNav();
      this.homePageAnimation();
      this.sectionsAnimations();
      this.distance = 0;
    });

    this.navItems.forEach((item) => {
      item.addEventListener("click", () => {
        console.log("click");
        this.navItemsClickActions(item);
      });
      item.addEventListener("touchstart", () => {
        console.log("touch");
        this.navItemsClickActions(item);
      });
    });
  }

  scrollSectionByTouch() {
    this.distance = this.lastDistance + (this.touchStart - this.touchPosition);

    const contentBox = this.sections[this.currentSectionIndex].querySelector(
      ".section__container--section-expand"
    );

    if (contentBox) {
      document
        .querySelector(".main--section-expand")
        .scrollTo(0, this.distance);
    }
  }

  navItemsClickActions(item) {
    const id = item.dataset.id;
    console.log("--------------id");
    console.log(id);
    history.pushState(`${id}`, null, `#${id}`);
    window.location.hash = `#${id}`;
    this.changeCurrentSectionIndexByNav();
    this.homePageAnimation();
    this.sectionsAnimations();

    this.sections[this.currentSectionIndex].scrollIntoView();
    console.log("scroll");
    console.log(window.location.hash);

    // debugger;
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
    // console.log("this.currentSectionIndex: " + this.currentSectionIndex);
    if (this.currentSectionIndex <= 0) {
      this.currentSectionIndex = 0;
    } else if (this.currentSectionIndex >= lengthOfSections - 1) {
      this.currentSectionIndex = lengthOfSections - 1;
    }

    this.isTouch
      ? this.moveToSection(this.sections[this.currentSectionIndex], "smooth")
      : this.sectionOnView(this.currentSectionIndex);

    // if (this.isTouch) {
    //   console.log("touch move to section");
    //   console.log(this.sections[this.currentSectionIndex]);

    //   this.sections[this.currentSectionIndex].scrollIntoView({
    //     behavior: "smooth",
    //   });
    // } else {
    //   this.sectionOnView(this.currentSectionIndex);
    // }

    this.sectionsAnimations();
    this.homePageAnimation();
  }

  checkIsScroll() {
    this.isScroll = true;
    setTimeout(() => {
      this.isScroll = false;
    }, 1500);
  }

  sectionOnView(indexOfSection) {
    this.homePageAnimation();
    this.moveToSection(this.sections[indexOfSection], "smooth");
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
