class Idea {
  constructor(id, title, body, quality) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = quality || 'Swill' ;
  }

  saveToStorage() {
    var stringIdeas = JSON.stringify(allIdeas);
    localStorage.setItem('stringIdeas', stringIdeas);
  }

  deleteFromStorage() {
    var index = allIdeas.indexOf(this);
    allIdeas.splice(index, 1);
    this.saveToStorage(allIdeas);
  }

  updateContent(editTitle, editBody) {
    this.title = editTitle;
    this.body = editBody;
    this.saveToStorage();
  }

  updateQuality() {

  }
}