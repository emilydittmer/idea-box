class Idea {
  constructor(id, title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = 'Swill';
  }
  saveToStorage(ideasArray){
    console.log(ideasArray);
    var stringIdeas = JSON.stringify(ideasArray);
    console.log(stringIdeas);
    localStorage.setItem('stringIdeas', stringIdeas);
    //all Ideas - stringify and set to variable of stringed ideas
    //var for string ideas to localstorage


  }
  deleteFromStorage(){
    var idea = 'idea' + id;
    localStorage.removeItem(idea);
  }
}
//function updateContent
//get localStorage 
//JSON parse
//pass back to main

//function deleteFromStorage

///event.target to find id and exit



//function updateQuality