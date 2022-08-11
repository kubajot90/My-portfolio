import { ChangeUrl } from "./ChangeUrl.js";
import { Common } from "./Common.js";

export class Scroll extends Common {
  constructor() {
    super();
    // this.sections = null;
    this.currentSectionIndex = 0;
    this.isScroll = false;
    this.isWheel = false;
    this.wheelDelta = null;

    this.touchStart = 0;
    this.touchPosition = null;
    this.scrollDirection = null;
    this.isTouch = false;

    this.contentBox = null;
    this.distance = 0;
    this.lastDistance = 0;

    this.sectionContainer = null;

    // this.headerTitles = null;
    // this.clouds = null;

    // this.main = null;

    // this.navItems = null;

    this.changeUrl = new ChangeUrl();
  }

  init() {
    this.addListeners();
    this.moveToSection(this.sections[0], "smooth");
    this.changeUrl.init();
  }

  addListeners() {
    document.addEventListener("wheel", (e) => {
      if (!this.isScroll) {
        this.wheelDelta = e.wheelDelta;
        if (!this.blockScroll()) {
          this.isWheel = true;
          this.setCurrentSectionIndex(e);
          this.isWheel = false;
        }
      }
    });

    document.addEventListener(
      "touchstart",
      (e) => {
        console.log("touchstart");
        this.lastDistance = this.distance;
        this.touchStart = e.touches[0].clientY;
        if (!this.blockScroll()) {
          this.isTouch = true;
        }
        e.preventDefault();
      },
      { passive: false }
    );

    document.addEventListener(
      "touchmove",
      (e) => {
        console.log("touchmove");
        this.touchPosition = e.touches[0].clientY;
        e.preventDefault();
        this.scrollSectionByTouch();
        if (!this.isScroll) {
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
    });

    this.navItems.forEach((item) => {
      item.addEventListener("click", () => {
        this.navItemsClickActions(item);
      });
      item.addEventListener("touchstart", () => {
        this.navItemsClickActions(item);
      });
    });
  }

  resetDistance() {
    const observer = new MutationObserver(() => {
      this.distance = 0;
    });
    observer.observe(this.sectionContainer, { attributes: true });
  }

  scrollSectionByTouch() {
    this.contentBox = this.sections[this.currentSectionIndex].querySelector(
      ".section__container--section-expand"
    );
    this.sectionContainer = this.sections[
      this.currentSectionIndex
    ].querySelector(".section__container");

    if (this.contentBox) {
      this.distance =
        this.lastDistance + (this.touchStart - this.touchPosition);
      document
        .querySelector(".main--section-expand")
        .scrollTo(0, this.distance * 2.5);
      this.resetDistance();
    }
  }

  navItemsClickActions(item) {
    const id = item.dataset.id;
    history.pushState(`${id}`, null, `#${id}`);
    window.location.hash = `#${id}`;
    this.changeCurrentSectionIndexByNav();
    this.homePageAnimation();
    this.sectionsAnimations();

    this.sections[this.currentSectionIndex].scrollIntoView();
  }

  setCurrentSectionIndex(e) {
    const lengthOfSections = document.querySelectorAll(".section").length;

    this.isWheel
      ? (this.scrollDirection = this.wheelDelta)
      : (this.scrollDirection = this.scrollDirection);

    this.scrollDirection > 0
      ? this.currentSectionIndex--
      : this.currentSectionIndex++;

    if (this.currentSectionIndex <= 0) {
      this.currentSectionIndex = 0;
    } else if (this.currentSectionIndex >= lengthOfSections - 1) {
      this.currentSectionIndex = lengthOfSections - 1;
    }

    this.isTouch
      ? this.moveToSection(this.sections[this.currentSectionIndex], "smooth")
      : this.sectionOnView(this.currentSectionIndex);

    this.sectionsAnimations();
    this.homePageAnimation();
    this.checkIsScroll();
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
    const touchDistance = this.touchStart - touchPosition;

    if (touchDistance > 5) {
      this.scrollDirection = -1;
      this.setCurrentSectionIndex(e);
    } else if (touchDistance < -5) {
      this.scrollDirection = 1;
      this.setCurrentSectionIndex(e);
    }

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

  blockScroll() {
    return document.getElementsByClassName("hide-section").length;
  }
}
