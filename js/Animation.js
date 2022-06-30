export class Animation {
  constructor() {
    this.navEmailBtn = null;
    this.navPhoneBtn = null;
    this.navMailContainer = null;
    this.navPhoneContainer = null;
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
  }

  addListeners() {
    this.navEmailBtn.addEventListener("click", (e) =>
      this.toggleClass(this.navMailContainer, "slide", e)
    );
    this.navPhoneBtn.addEventListener("click", (e) =>
      this.toggleClass(this.navPhoneContainer, "slide", e)
    );
  }

  toggleClass(element, toggleClass, e) {
    e.preventDefault();
    element.classList.toggle(toggleClass);
  }
}
