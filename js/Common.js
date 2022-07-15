export class Common {
  constructor() {
    this.sections = this.htmlElements.sections;
    this.headerTitles = this.htmlElements.headerTitles;
    this.clouds = this.htmlElements.clouds;
    this.main = this.htmlElements.main;
    this.navItems = this.htmlElements.navItems;
    this.root = this.htmlElements.root;
  }

  htmlElements = {
    navItems: document.querySelectorAll(".big__navigation-item"),
    main: document.querySelector(".main"),
    sections: document.querySelectorAll(".section"),
    headerTitles: document.querySelectorAll("[data-header-Animation]"),
    clouds: document.querySelectorAll(".header-Animation-from-right"),
    root: document.querySelector(":root"),
  };

  homePageAnimation() {
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

  // homePageAnimation() {
  //   if (this.currentSectionIndex !== 0) {
  //     this.headerTitles.forEach((elm) =>
  //       elm.classList.add("reverseTransformFromLeft")
  //     );
  //     this.clouds.forEach((elm) =>
  //       elm.classList.add("reverseTransformAnimFromRight")
  //     );
  //   } else if (this.currentSectionIndex === 0) {
  //     this.headerTitles.forEach((elm) =>
  //       elm.classList.remove("reverseTransformFromLeft")
  //     );
  //     this.clouds.forEach((elm) =>
  //       elm.classList.remove("reverseTransformAnimFromRight")
  //     );
  //   }
  // }

  // checkCurrentSectionIndex() {
  //   this.sections.forEach((section, index) => {
  //     if (section.getAttribute("id") === window.location.hash.slice(1)) {
  //       this.currentSectionIndexCommon = index;
  //     }
  //   });
  // }
}
