export class Common {
  constructor() {
    this.sections = document.querySelectorAll(".section");
    this.headerTitles = document.querySelectorAll(
      "[data-header-Animation-from-left]"
    );
    this.clouds = document.querySelectorAll(".header-Animation-from-right");
    this.main = document.querySelector(".main");
    this.navItems = document.querySelectorAll(".big__navigation-item");

    this.currentSectionIndex2 = null;
  }

  homePageAnimation() {
    console.log("homePageAnimation Common");
    if (this.currentSectionIndex2 !== 0) {
      this.headerTitles.forEach((elm) =>
        elm.classList.add("reverseTransformFromLeft")
      );
      this.clouds.forEach((elm) =>
        elm.classList.add("reverseTransformAnimFromRight")
      );
    } else if (this.currentSectionIndex2 === 0) {
      this.headerTitles.forEach((elm) =>
        elm.classList.remove("reverseTransformFromLeft")
      );
      this.clouds.forEach((elm) =>
        elm.classList.remove("reverseTransformAnimFromRight")
      );
    }
  }

  checkCurrentSectionIndex() {
    this.sections.forEach((section, index) => {
      if (section.getAttribute("id") === window.location.hash.slice(1)) {
        this.currentSectionIndex2 = index;
      }
    });
    console.log(
      "-----------------------currensectionindex2 common: " +
        this.currentSectionIndex2
    );
  }
}
