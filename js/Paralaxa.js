export class Paralaxa {
  constructor() {
    this.clouds = null;
  }

  init() {
    this.handleElements();
    this.addEventListeners();
  }

  handleElements() {
    this.clouds = document.querySelectorAll(".cloud__vector");
    this.circles = document.querySelectorAll(".circle");
    this.moon = document.querySelector(".moon");
  }

  addEventListeners() {
    document.addEventListener("mousemove", (e) => this.changePosition(e));
  }

  changePosition(e) {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const positionX = e.clientX - centerX;
    const positionY = e.clientY - centerY;

    this.moveElements(this.clouds, -positionX, -positionY);
    this.moveElements(this.circles, -positionX, -positionY);
    this.moveElement(this.moon, -positionX, -positionY);
  }

  moveElements(elements, axisX, axisY) {
    elements.forEach((element) => {
      const speedX = element.dataset.speedx;
      const speedY = element.dataset.speedy;
      const scale = element.dataset.scale;

      !scale
        ? (element.style.transform = `translate(${axisX * speedX}%, ${
            axisY * speedY
          }%)`)
        : (element.style.transform = `translate(${axisX * speedX}%, ${
            axisY * speedY
          }%) scale(${scale})`);
    });
  }

  moveElement(element, axisX, axisY) {
    const speedX = element.dataset.speedx;
    const speedY = element.dataset.speedy;

    element.style.transform = `translate(${axisX * speedX}%, ${
      axisY * speedY
    }%)`;
  }
}
