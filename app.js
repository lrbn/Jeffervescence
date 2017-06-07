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
    const promoteButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    promoteButton.className = "success hollow button";
    promoteButton.innerHTML = "+";
    promoteButton.style.padding = "15px 20px";
    deleteButton.className = "alert hollow button";
    deleteButton.innerHTML = "-";
    listItem.appendChild(promoteButton);
    listItem.appendChild(deleteButton);
    this.list.insertBefore(listItem, this.list.firstChild);
    // TODO: Add flick to this.flicks
    this.flicks.push(listItem.textContent); // adds the text content of li
    ++this.max;
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