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
        console.log("warunek popstate2");
        console.log("window.location.hash: " + window.location.hash);
        this.toggleSectionView(e);
        this.isButtonClicked = false;
      }
      // this.buttonsAnimationToggle();
      // this.buttonsAnimationHide();
      this.sectionNumberAnimationToggle();
      this.scrollIconAnimationHide();
      this.arrowAnimationHide();
      this.isSectionExpand = false;
    });

    this.navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        console.log("nav2");
        this.ChosenNavItemId = item.dataset.id;
        if (this.isButtonClicked) {
          this.toggleSectionView(e);
        }

        // this.buttonsAnimationToggle();
        this.buttonsAnimationShow();
        this.isSectionExpand = false;

        this.arrowAnimationHide();
      });
    });

    this.arrow.addEventListener("click", () => {
      this.isSectionExpand = false;
      this.arrowAnimationHide();
      this.buttonsAnimationShow();
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

  toggleSectionView(e) {
    console.log("togglesection------");

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
      console.log("pushstate id: " + id);
    }

    if (!this.isButtonClicked) {
      this.showAllSections();

      window.location.hash = `#${this.ChosenNavItemId}`;
    }
    console.log("window.location.hash: " + window.location.hash);
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
      console.log("----------------------------------");
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

//history.back() - dla strzłki do tyłu w sekcji.
//zrób blokade wheel gdy jest pierwsza lub ostatnia sekcja.

//history.back() - dla strzłki do tyłu w sekcji.
//zrób blokade wheel gdy jest pierwsza lub ostatnia sekcja.
