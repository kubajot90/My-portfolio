import { Common } from "./Common.js";

export class NavAnimation extends Common {
  constructor() {
    super();
    this.pageLogo = null;
    this.navEmailBtn = null;
    this.navPhoneBtn = null;
    this.navMailContainer = null;
    this.navPhoneContainer = null;
    this.navBig = null;
    this.navBigItems = null;
    this.navBigLinks = null;
    this.xMark = null;

    this.isToggledRoot = false;

    this.blackScreen = null;
  }

  init() {
    this.handleElements();
    this.addListeners();
  }

  handleElements() {
    this.pageLogo = document.querySelector("[data-page-logo]");
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

    this.blackScreen = document.querySelector(".black__screen");

    this.navBigLinks = document.querySelectorAll(".big__navigation-link");
  }

  addListeners() {
    this.pageLogo.addEventListener("click", () => window.location.reload());
    this.pageLogo.addEventListener("touchstart", () =>
      window.location.reload()
    );
    this.navEmailBtn.addEventListener("click", () =>
      this.toggleClass(this.navMailContainer, "slide")
    );
    this.navPhoneBtn.addEventListener("click", () =>
      this.toggleClass(this.navPhoneContainer, "slide")
    );
    this.xMark.addEventListener("click", () => this.xMarkClickAction());
    this.xMark.addEventListener("touchstart", () => this.xMarkClickAction());

    this.navBigItems.forEach((item) => {
      item.addEventListener("click", () => this.bigNavSlide());
      item.addEventListener("touchstart", () => this.bigNavSlide());
    });
  }

  xMarkClickAction() {
    this.toggleClass(this.navBig, "big__navigation--slide");
    this.toggleRootProperty();
    this.blackScreenShow();
    this.navBigLinksAnimation();
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
    this.blackScreenShow(600);
    this.navBigLinksAnimation();
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
