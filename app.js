const app = {
  init(selectors) {
    this.flicks = [];
    this.max = 0;
    this.list = document.querySelector(selectors.listSelector);
    this.flickform = document.querySelector(selectors.formSelector)
      this.flickform.addEventListener("submit", this.addFlick.bind(this));
  },
  addFlick(ev) {
    ev.preventDefault();
    const f = ev.target;
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    };
    const listItem = this.buildItem(flick);
    this.list.appendChild(listItem);
    // TODO: Add flick to this.flicks
    this.flicks.push(listItem.textContent); // adds the text content of li
    ++this.max;
    console.log(this.flicks);
    this.flickform.reset(); // reset the input field
  },
  buildItem(flick) {
    const item = document.createElement("li");
    item.textContent = flick.name;
    return item;
  },
};

app.init({
  formSelector: "#flick-form",
  listSelector: "#flick-list",
});