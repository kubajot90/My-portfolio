export class Common {
  constructor() {
    this.sections = this.htmlElements.sections;
    this.headerTitles = this.htmlElements.headerTitles;
    this.clouds = this.htmlElements.clouds;
    this.main = this.htmlElements.main;
    this.navItems = this.htmlElements.navItems;
    this.root = this.htmlElements.root;
    this.moon = this.htmlElements.moon;
  }

  htmlElements = {
    navItems: document.querySelectorAll(".big__navigation-item"),
    main: document.querySelector(".main"),
    sections: document.querySelectorAll(".section"),
    headerTitles: document.querySelectorAll("[data-header-Animation]"),
    clouds: document.querySelectorAll(".header-Animation-from-right"),
    root: document.querySelector(":root"),
    moon: document.querySelector(".moon"),
  };

  homePageAnimation() {
    if (this.currentSectionIndex !== 0) {
      this.moon.style.visibility = "hidden";
      this.headerTitles.forEach((elm) =>
        elm.classList.add("reverseTransformFromLeft")
      );
      this.clouds.forEach((elm) => {
        elm.style.visibility = "hidden";
        elm.classList.add("reverseTransformAnimFromRight");
      });
    } else if (this.currentSectionIndex === 0) {
      this.moon.style.visibility = "visible";

      this.headerTitles.forEach((elm) =>
        elm.classList.remove("reverseTransformFromLeft")
      );
      this.clouds.forEach((elm) => {
        elm.style.visibility = "visible";
        elm.classList.remove("reverseTransformAnimFromRight");
      });
    }
  }

  changeCurrentSectionIndexByNav() {
    this.sections.forEach((section, index) => {
      if (section.getAttribute("id") === window.location.hash.slice(1)) {
        this.currentSectionIndex = index;
        console.log("section index:   " + this.currentSectionIndex);
      }
    });
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
