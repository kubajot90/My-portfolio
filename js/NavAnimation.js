export class NavAnimation {
  constructor() {
    this.navEmailBtn = null;
    this.navPhoneBtn = null;
    this.navMailContainer = null;
    this.navPhoneContainer = null;
    this.navBig = null;
    this.navBigItems = null;
    this.navBigLinks = null;
    this.xMark = null;

    this.root = null;
    this.isToggledRoot = false;

    this.blackScreen = null;
  }

  init() {
    this.handleElements();
    this.addListeners();
  }

  handleElements() {
    this.navEmailBtn = document.querySelector(".fa-envelope");
    this.navPhoneBtn = document.querySelector(".fa-mobile-screen-button");
    this.navMailContainer = document.querySelector(
      ".navigation__mail-container"
    );
    this.navPhoneContainer = document.querySelector(
      ".navigation__phone-container"
    );
    this.navBig = document.querySelector(".big__navigation");
    this.navBigItems = document.querySelectorAll(".big__navigation-item");

    this.xMark = document.querySelector(".navigation-x-mark");

    this.root = document.querySelector(":root");

    this.blackScreen = document.querySelector(".black__screen");

    this.navBigLinks = document.querySelectorAll(".big__navigation-link");
  }

  addListeners() {
    this.navEmailBtn.addEventListener("click", () =>
      this.toggleClass(this.navMailContainer, "slide")
    );
    this.navPhoneBtn.addEventListener("click", () =>
      this.toggleClass(this.navPhoneContainer, "slide")
    );
    this.xMark.addEventListener("click", () => {
      this.toggleClass(this.navBig, "big__navigation--slide");
      this.toggleRootProperty();
      // this.toggleClass(this.blackScreen, "black__screen--show");
      this.blackScreenShow();
      this.navBigLinksAnimation();
    });

    this.navBigItems.forEach((item) =>
      item.addEventListener("click", () => this.bigNavSlide())
    );
  }

  toggleClass(element, toggleClass) {
    element.classList.toggle(toggleClass);
  }

  toggleRootProperty() {
    if (!this.isToggledRoot) {
      this.root.style.setProperty(
        "--transformPseudoBefore",
        " rotate(45deg) translate3d(0%, 450%, 0)"
      );
      this.root.style.setProperty(
        "--transformPseudoAfter",
        "rotate(-45deg) translate3d(0%, -450%, 0)"
      );
      this.isToggledRoot = true;
    } else if (this.isToggledRoot) {
      this.root.style.setProperty(
        "--transformPseudoBefore",
        "rotate(0) translate3d(0, 0, 0)"
      );
      this.root.style.setProperty(
        "--transformPseudoAfter",
        "rotate(0) translate3d(0, 0, 0)"
      );

      this.isToggledRoot = false;
    }
  }

  bigNavSlide() {
    this.toggleClass(this.navBig, "big__navigation--slide");
    this.toggleRootProperty();
    // this.toggleClass(this.blackScreen, "black__screen--show");
    this.blackScreenShow(600);
  }

  blackScreenShow(delay = 0) {
    setTimeout(() => {
      this.toggleClass(this.blackScreen, "black__screen--show");
    }, delay);
  }

  navBigLinksAnimation() {
    this.navBigLinks.forEach((link) =>
      this.toggleClass(link, "big__navigation-link--animation")
    );
  }
}
