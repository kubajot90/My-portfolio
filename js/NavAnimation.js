export class NavAnimation {
  constructor() {
    this.navEmailBtn = null;
    this.navPhoneBtn = null;
    this.navMailContainer = null;
    this.navPhoneContainer = null;
    this.navBig = null;
    this.xMark = null;

    this.root = null;
    this.isToggledRoot = false;
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
    this.xMark = document.querySelector(".navigation-x-mark");

    this.root = document.querySelector(":root");
  }

  addListeners() {
    this.navEmailBtn.addEventListener("click", (e) =>
      this.toggleClass(this.navMailContainer, "slide", e)
    );
    this.navPhoneBtn.addEventListener("click", (e) =>
      this.toggleClass(this.navPhoneContainer, "slide", e)
    );
    this.xMark.addEventListener("click", (e) => {
      this.toggleClass(this.navBig, "big__navigation--slide", e);
      this.toggleRootProperty();
    });
  }

  toggleClass(element, toggleClass, e) {
    e.preventDefault();
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
}
