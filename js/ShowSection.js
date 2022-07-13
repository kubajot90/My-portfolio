import { Common } from "./Common.js";

export class ShowSection extends Common {
  constructor() {
    super();
    this.isButtonClicked = false;
    this.isSectionExpand = false;
    this.ChosenNavItemId = null;
    this.currentSectionIndex = null;
    // this.currentAnimationSectionIndex = null;

    this.sectionButtons = null;
    // this.sections = null;
    // this.navItems = null;
    this.blackScreen = null;
    this.scrollIcons = null;
    this.arrow = null;
  }

  init() {
    this.handleElements();
    this.addListeners();
  }

  handleElements() {
    this.sectionButtons = document.querySelectorAll(".title__button");
    // this.sections = document.querySelectorAll("section");
    // this.navItems = document.querySelectorAll(".big__navigation-item");
    this.blackScreen = document.querySelector(".black__screen");
    this.scrollIcons = document.querySelectorAll(".scroll__icon");
    this.arrow = document.querySelector(".arrow__left");
  }

  addListeners() {
    this.sectionButtons.forEach((button) =>
      button.addEventListener("click", (e) => {
        this.isSectionExpand = true;
        this.currentSectionIndex = e.target.dataset.currentSection;
        this.toggleSectionView(e);
        this.injectSectionContent();
        this.ChosenNavItemId = window.location.hash.slice(1);
        // this.buttonsAnimationToggle();
        this.buttonsAnimationHide();
        this.sectionNumberAnimationToggle();
        this.scrollIconAnimationShow();
        this.arrowAnimationShow();
      })
    );

    window.addEventListener("popstate", (e) => {
      console.log("popstate2");
      if (this.isButtonClicked) {
        this.toggleSectionView(e);
        this.isButtonClicked = false;
      }
      // this.buttonsAnimationToggle();
      // this.buttonsAnimationHide();
      this.sectionNumberAnimationToggle();
      this.scrollIconAnimationHide();
      this.arrowAnimationHide();
      this.buttonsAnimationShow();
      this.isSectionExpand = false;
      this.sectionContentHide();
    });

    this.navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        this.ChosenNavItemId = item.dataset.id;
        if (this.isButtonClicked) {
          this.toggleSectionView(e);
        }

        // this.buttonsAnimationToggle();
        this.buttonsAnimationShow();
        this.isSectionExpand = false;

        this.arrowAnimationHide();
        this.sectionContentHide();
      });
    });

    this.arrow.addEventListener("click", () => {
      this.isSectionExpand = false;
      this.arrowAnimationHide();
      this.buttonsAnimationShow();
      this.sectionContentHide();
      history.back();
    });

    // window.addEventListener("popstate", (e) => {
    //   // const xhr = new XMLHttpRequest();
    //   // xhr.open("GET", "about-me.html", true);
    //   // xhr.send();

    //   // xhr.onload = function () {
    //   //   document
    //   //     .querySelector(".section__container")
    //   //     .insertAdjacentHTML("beforeend", this.responseText);

    //   // };
    //   console.log(e);
    //   console.log(e.state);
    // });
  }

  injectSectionContent() {
    const currentSectionId = window.location.hash.slice(1);
    const currentSectionContainer = this.sections[
      this.currentSectionIndex
    ].querySelector(".section__container");

    if (!document.querySelector(`[data-content-id="${currentSectionId}"]`)) {
      const xhr = new XMLHttpRequest();
      // xhr.open("GET", "about-me.html", true);
      xhr.open("GET", `${currentSectionId}.html`, true);
      xhr.send();

      xhr.onload = function () {
        // const CurrentSectionContainer = this.sections[
        //   this.currentSectionIndex
        // ].querySelector(".section__container");
        currentSectionContainer.dataset.contentId = `${currentSectionId}`;
        currentSectionContainer.insertAdjacentHTML(
          "beforeend",
          this.responseText
        );
      };
    } else {
      const sectionContent = currentSectionContainer.querySelector(
        ".section__container-content"
      );
      sectionContent.style.display = "flex";
    }
  }

  sectionContentHide() {
    document
      .querySelectorAll(".section__container-content")
      .forEach((element) => (element.style.display = "none"));
  }

  toggleSectionView(e) {
    this.isButtonClicked = !this.isButtonClicked;
    const sectionContainer = this.sections[
      this.currentSectionIndex
    ].querySelector(".section__container");

    const imageBox =
      this.sections[this.currentSectionIndex].querySelector(".image-box");

    this.hideAllSections();

    this.sections[this.currentSectionIndex].classList.remove("hide-section");

    this.main.classList.toggle("main--section-expand");
    sectionContainer.classList.toggle("section__container--section-expand");
    imageBox.classList.toggle("image-box--section-expand");
    this.blackScreen.classList.toggle("black__screen--section-background");

    const id = this.sections[this.currentSectionIndex].getAttribute("id");

    if (!this.isSectionExpand) {
      history.pushState(`${id}`, null, `#${id}`);
    }

    if (!this.isButtonClicked) {
      this.showAllSections();

      window.location.hash = `#${this.ChosenNavItemId}`;
    }
  }

  hideAllSections() {
    this.sections.forEach((section) => section.classList.add("hide-section"));
  }
  showAllSections() {
    this.sections.forEach((section) =>
      section.classList.remove("hide-section")
    );
  }

  // buttonsAnimationToggle() {
  //   this.sectionButtons.forEach((button) =>
  //     button.classList.toggle("title__button--hide")
  //   );
  // }

  buttonsAnimationShow() {
    this.sectionButtons.forEach((button) => {
      button.classList.remove("title__button--hide");
    });
  }

  buttonsAnimationHide() {
    this.sectionButtons.forEach((button) =>
      button.classList.add("title__button--hide")
    );
  }

  sectionNumberAnimationToggle() {
    const sectionNumbers = document.querySelectorAll(".section__number");

    sectionNumbers.forEach((number) =>
      number.classList.toggle("transformAnimSections")
    );
  }

  scrollIconAnimationShow() {
    this.scrollIcons.forEach((icon) => {
      icon.style.animation = "transformAnimFromLeft .6s ease-out both .2s";
      icon.classList.remove("reverseTransformFromLeft");
    });
  }

  scrollIconAnimationHide() {
    this.scrollIcons.forEach((icon) => {
      icon.style.animation = "transformAnimFromLeft 1s ease-out both 1s";
      icon.classList.add("reverseTransformFromLeft");
    });
  }

  arrowAnimationShow() {
    this.arrow.classList.add("arrow__left--show");
  }

  arrowAnimationHide() {
    this.arrow.classList.remove("arrow__left--show");
  }

  // currentSectionIndexFunc() {
  //   this.sections.forEach((section, index) => {
  //     if (section.getAttribute("id") === window.location.hash.slice(1)) {
  //       this.currentSectionIndex = index;
  //     }
  //   });
  // }
}
