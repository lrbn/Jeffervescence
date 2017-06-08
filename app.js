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
    const li = document.createElement('li');
    const item = this.buildItem(flick);
    item.id="left";
    const b = document.createElement('button');
    b.className = 'success hollow button'
    b.innerHTML = '+';
    const s = document.createElement('span');
    s.id="right";
    s.appendChild(b);
    li.appendChild(item);
    li.appendChild(s);
    this.list.insertBefore(li, this.list.firstChild);
    this.flicks.push(item.textContent);
    ++this.max;
    this.flickform.reset();
  },
  buildItem(flick) {
    const item = document.createElement("span");
    item.textContent = flick.name;
    return item;
  },
};

app.init({
  formSelector: "#flick-form",
  listSelector: "#flick-list",
});