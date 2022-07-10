export class ChangeUrl {
  constructor() {
    this.state = null;
  }
  init() {
    this.handleElements();
    this.addListeners();
  }

  handleElements() {}

  addListeners() {
    document.querySelectorAll(".big__navigation-item").forEach((item) => {
      item.addEventListener("click", () => {
        console.log("listener li");
        const id = item.dataset.id;
        console.log("id: " + id);
        const section = document.querySelector(`#${id}`);
        console.log(section);
        history.pushState(`${id}`, null, `#${id}`);
        section.scrollIntoView({ behavior: "smooth" });
      });
    });

    window.addEventListener("popstate", (e) => {
      // const xhr = new XMLHttpRequest();
      // xhr.open("GET", "about-me.html", true);
      // xhr.send();

      // xhr.onload = function () {
      //   document
      //     .querySelector(".section__container")
      //     .insertAdjacentHTML("beforeend", this.responseText);

      // };
      console.log("popstate");
      console.log(e);

      this.state = e.state;
      const section = document.getElementById(`${this.state}`);
      section.scrollIntoView({ behavior: "smooth" });
    });
  }

  changeUrl(sectionElement) {
    console.log("changeUrl");
    const id = sectionElement.getAttribute("id");
    history.pushState(`${id}`, null, `#${id}`);
  }
}
