class Idea {
  constructor(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
  }
  saveToStorage(){
    var stringIdeas = JSON.stringify(allIdeas);
    localStorage.setItem('stringIdeas', stringIdeas);
    //all Ideas - stringify and set to variable of stringed ideas
    //var for string ideas to localstorage


  }
  deleteFromStorage(){
    var index = allIdeas.indexOf(this);
    allIdeas.splice(index, 1);
    this.saveToStorage(allIdeas);
  }
}
//function updateContent
//get localStorage 
//JSON parse
//pass back to main

//function deleteFromStorage

///event.target to find id and exit



//function updateQuality