import { Common } from "./Common.js";

export class ShowSection extends Common {
  constructor() {
    super();
    this.isButtonClicked = false;
    this.isSectionExpand = false;
    this.isSectionNumberSlow = false;
    this.chosenNavItemId = null;
    this.currentSectionIndex = null;

    this.sectionButtons = null;
    this.blackScreen = null;
    this.scrollIcons = null;
    this.arrow = null;
    this.sectionContentBox = null;

    this.observer = null;
  }

  init() {
    this.handleElements();
    this.addListeners();
  }

  handleElements() {
    this.sectionButtons = document.querySelectorAll(".title__button");
    this.blackScreen = document.querySelector(".black__screen");
    this.scrollIcons = document.querySelectorAll(".scroll__icon");
    this.arrow = document.querySelector(".arrow__left");
  }

  addListeners() {
    this.sectionButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        this.buttonClickActions(e);
      });
      button.addEventListener("touchstart", (e) => {
        this.buttonClickActions(e);
      });
    });

    window.addEventListener("popstate", (e) => {
      console.log("popstate2");
      if (this.isButtonClicked) {
        this.toggleSectionView(e);
        this.isButtonClicked = false;
      }
      this.isSectionNumberSlow = true;
      this.sectionNumberAnimationToggle();
      this.scrollIconAnimationHide();
      this.arrowAnimationHide();
      this.buttonsAnimationShow();
      this.isSectionExpand = false;
      this.sectionContentHide();
      this.isSectionNumberSlow = false;
    });

    this.navItems.forEach((item) => {
      // this.chosenNavItemId = item.dataset.id;
      item.addEventListener("click", (e) => {
        this.chosenNavItemId = item.dataset.id;
        this.navItemClickActions(e);
      });
      item.addEventListener("touchstart", (e) => {
        this.chosenNavItemId = item.dataset.id;
        this.navItemClickActions(e);
      });
    });

    this.arrow.addEventListener("click", () => this.arrowClickActions());
    this.arrow.addEventListener("touchstart", () => this.arrowClickActions());
  }

  buttonClickActions(e) {
    if (this.observer) this.observer.unobserve(this.sectionContentBox);
    this.isSectionExpand = true;
    this.currentSectionIndex = e.target.dataset.currentSection;
    this.toggleSectionView(e);
    setTimeout(() => this.injectSectionContent(), 1100);
    this.chosenNavItemId = window.location.hash.slice(1);
    this.buttonsAnimationHide();
    this.sectionNumberAnimationToggle();
    this.scrollIconAnimationShow();
    this.arrowAnimationShow();
  }

  navItemClickActions(e) {
    if (this.isButtonClicked) {
      this.toggleSectionView(e);
    }
    this.buttonsAnimationShow();
    this.isSectionExpand = false;
    this.arrowAnimationHide();
    this.sectionContentHide();
    this.isSectionNumberSlow = false;
  }

  arrowClickActions() {
    this.isSectionExpand = false;
    this.arrowAnimationHide();
    this.buttonsAnimationShow();
    this.sectionContentHide();
    history.back();
    this.isSectionNumberSlow = true;
  }

  injectSectionContent() {
    const currentSectionId = window.location.hash.slice(1);
    const currentSectionContainer = this.sections[
      this.currentSectionIndex
    ].querySelector(".section__container");

    if (!document.querySelector(`[data-content-id="${currentSectionId}"]`)) {
      const xhr = new XMLHttpRequest();

      xhr.open("GET", `${currentSectionId}.html`, true);
      xhr.send();

      xhr.onload = function () {
        currentSectionContainer.dataset.contentId = `${currentSectionId}`;
        currentSectionContainer.insertAdjacentHTML(
          "beforeend",
          this.responseText
        );
      };
      xhr.addEventListener("load", () => {
        this.AddBackButtonListener();
        this.addObserver();
      });
    } else {
      this.addObserver();
      const sectionContent = currentSectionContainer.querySelector(
        ".section__content-box"
      );
      sectionContent.style.display = "flex";
    }

    window.scrollTo(0, 0);
  }

  AddBackButtonListener() {
    const backButton = document.querySelector(".content__projects-back");

    if (backButton) {
      backButton.addEventListener("click", () => {
        this.sections[this.currentSectionIndex].scrollIntoView({
          behavior: "smooth",
        });
      });
    }
  }

  sectionContentHide() {
    document
      .querySelectorAll(".section__content-box")
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
      console.log("chosennavitem----------");
      console.log(this.chosenNavItemId);
      window.location.hash = `#${this.chosenNavItemId}`;
      this.changeCurrentSectionIndexByNav();
      this.sections[this.currentSectionIndex].scrollIntoView();
    }
  }

  hideAllSections() {
    this.sections.forEach((section) => section.classList.add("hide-section"));
  }

  showAllSections(e) {
    this.sections.forEach((section) =>
      section.classList.remove("hide-section")
    );
    this.sections[this.currentSectionIndex].scrollIntoView();
  }

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

    sectionNumbers.forEach((number) => {
      if (this.isSectionNumberSlow) {
        number.style.animationDelay = ".01s";
      } else {
        number.style.animationDelay = "1.1s";
      }
      number.classList.toggle("transformAnimSections");
    });
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

  addObserver() {
    this.sectionContentBox = this.sections[
      this.currentSectionIndex
    ].querySelector(".section__container");

    this.observer = new IntersectionObserver((e) => this.changeNavColor(e));
    this.observer.observe(this.sectionContentBox);
  }

  changeNavColor(e) {
    if (!this.isSectionExpand) {
      this.setNavColor("white");
    } else {
      if (!e[0].isIntersecting) {
        this.setNavColor("black");
      } else {
        this.setNavColor("white");
      }
    }
  }

  setNavColor(color) {
    const navElements = document.querySelectorAll(".main__navigation-link");
    const arrowElements = document.querySelectorAll("[data-arrow]");

    navElements.forEach((element) => (element.style.color = color));
    arrowElements.forEach((element) => (element.style.borderColor = color));
    this.root.style.setProperty("--xMarkColor", color);
  }
}
