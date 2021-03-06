const app = {
  init(selectors) {
    this.flicks = []
    this.max = 0
    this.list = document
      .querySelector(selectors.listSelector)
    this.template = document
      .querySelector(selectors.templateSelector)
    document
      .querySelector(selectors.formSelector)
      .addEventListener('submit', this.addFlickViaForm.bind(this))

    this.load()
  },

  load() {
    // Get the JSON string out of localStorage
    const flicksJSON = localStorage.getItem('flicks')

    // Turn that into an array
    const flicksArray = JSON.parse(flicksJSON)

    // Set this.flicks to that array
    if (flicksArray) {
      flicksArray
        .reverse()
        .map(this.addFlick.bind(this))
    }
  },

  addFlick(flick) {
    const listItem = this.renderListItem(flick)
    this.list
      .insertBefore(listItem, this.list.firstChild)
    ++ this.max
    this.flicks.unshift(flick)
    this.save()
  },

  addFlickViaForm(ev) {
    ev.preventDefault()
    const f = ev.target
    const flick = {
      id: this.max + 1,
      name: f.flickName.value,
    }

    this.addFlick(flick)

    f.reset()
  },

  save() {
    localStorage
      .setItem('flicks', JSON.stringify(this.flicks))

  },

  renderListItem(flick) {
    const item = this.template.cloneNode(true)
    item.classList.remove('template')
    item.dataset.id = flick.id
    item
      .querySelector('.flick-name')
      .textContent = flick.name

    item
      .querySelector('button.remove')
      .addEventListener('click', this.removeFlick.bind(this))

    item
      .querySelector('button.fav')
      .addEventListener('click', this.promoteFlick.bind(this))

    item
      .querySelector('button.up')
      .addEventListener('click', this.moveFlickUp.bind(this))

    item
      .querySelector('button.down')
      .addEventListener('click', this.moveFlickDown.bind(this))
      

    return item
  },

  removeFlick(ev) {
    const listItem = ev.target.closest('.flick')

    // Find the flick in the array, and remove it
    for (let i = 0; i < this.flicks.length; i++) {
      const currentId = this.flicks[i].id.toString()
      if (listItem.dataset.id === currentId) {
        this.flicks.splice(i, 1)
        break
      }
    }

    listItem.remove()
    this.save()
  },
  // Change the color of element on "+" button click
  promoteFlick(ev) {
    const listItem = ev.target.closest('.flick')
    if (listItem.style.color === 'gold') {
      listItem.style.color = 'white'
      return
    } 
    listItem.style.color = 'gold'
  },
  // TODO: When a flick is sent to the last node (lastChild) and pressed down again, it takes
  // two clicks to up button 
  moveFlickUp(ev) {
    const listItem = ev.target.closest('.flick')
      if (listItem.previousSibling) {
        listItem.parentNode.insertBefore(listItem, listItem.previousSibling)
      }
  },

  moveFlickDown(ev) {
    const listItem = ev.target.closest('.flick')
    // TODO: If this check is removed, the li element will switch with the li with the flick template class
    if (listItem.nextSibling.className !== 'flick template') {
      if (listItem.nextSibling) {
        listItem.parentNode.insertBefore(listItem.nextSibling, listItem)
      }
    }
  },
}

app.init({
  formSelector: '#flick-form',
  listSelector: '#flick-list',
  templateSelector: '.flick.template',
})