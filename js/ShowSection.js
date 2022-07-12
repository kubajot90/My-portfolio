import { Common } from "./Common.js";

export class ShowSection extends Common {
  constructor() {
    super();
    this.isButtonClicked = false;
    this.ChosenNavItemId = null;
    this.currentSectionIndex = null;
    this.currentAnimationSectionIndex = null;

    this.sectionButtons = null;
    // this.sections = null;
    // this.navItems = null;
    this.blackScreen = null;
  }

  init() {
    this.handleElements();
    this.addListeners();
  }

  handleElements() {
    this.sectionButtons = document.querySelectorAll(".title-button");
    // this.sections = document.querySelectorAll("section");
    // this.navItems = document.querySelectorAll(".big__navigation-item");
    this.blackScreen = document.querySelector(".black__screen");
  }

  addListeners() {
    this.sectionButtons.forEach((button) =>
      button.addEventListener("click", (e) => {
        this.currentSectionIndex = e.target.dataset.currentSection;
        this.currentAnimationSectionIndex = this.currentSectionIndex;
        this.toggleSectionView(e);
      })
    );

    window.addEventListener("popstate", (e) => {
      console.log("popstate2");
      if (this.isButtonClicked) {
        this.toggleSectionView(e);
        this.isButtonClicked = false;
      }
    });

    this.navItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        console.log("nav2");
        this.ChosenNavItemId = item.dataset.id;
        if (this.isButtonClicked) {
          this.toggleSectionView(e);
        }
      });
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
    history.pushState(`${id}`, null, `#${id}`);

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
