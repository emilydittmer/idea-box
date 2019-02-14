var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-btn');
var ideaBox = document.querySelector('.ideas');
var allIdeas = JSON.parse(localStorage.getItem('stringIdeas')) || [];
saveButton.addEventListener('click', saveIdea);

function saveIdea() {
  var title = titleInput.value;
  var body = bodyInput.value;
  var id = Date.now();
  var newIdea = new Idea(id, title, body);
  displayIdea(newIdea);
  allIdeas.push(newIdea);
  console.log(allIdeas);
  newIdea.saveToStorage(allIdeas);
}
function displayIdea(ideaObj) {
  console.log(ideaObj.id);
  //var cardContainer = create section 
  //cardContainer.dataset.id = cardId;
  var ideaCard =  `<section class="idea-box" id="${ideaObj.id}">
                  <h3 class="idea-box-title">${ideaObj.title}</h3>
                  <h4 class="idea-box-body">${ideaObj.body}</h4>
                  <hr class="idea-box-seperation">
                  <input type="image" src="images/downvote.svg" class="vote-buttons" id="downvote" alt="Down Vote">
                  <input type="image" src="images/upvote.svg" class="vote-buttons" id="upvote" alt="Up Vote">
                  <h5 class="quality">Quality: ${ideaObj.quality}</h5>
                  <input type="image" src="images/delete.svg" class="vote-buttons" id="delete" alt="Delete">
                  </section>`
   ideaBox.insertAdjacentHTML('afterbegin',ideaCard);
}

ideaBox.addEventListener('click', clickHandler);
  
function clickHandler(e){
 if (e.target.id === 'upvote'){
    var id = parseInt(e.target.parentElement.id);
var ideaWeWant;
for (var i = 0; i < allIdeas.length; i++) {
    if (allIdeas[i].id === id) {
       ideaWeWant = allIdeas[i];
       ideaWeWant.quality = 'Plausible';
      }
    console.log(ideaWeWant);
    }
  }
  if(e.target.id === 'downvote'){
    var id = parseInt(e.target.parentElement.id);
    var ideaWeWant;
    for (var i = 0; i < allIdeas.length; i++) {
      if (allIdeas[i].id === id) {
       ideaWeWant = allIdeas[i];
       ideaWeWant.quality = 'Genius';
      }
      console.log(ideaWeWant);
    }
  }
  if(e.target.id === 'delete'){
    var id = parseInt(e.target.parentElement.id);
    console.log(allIdeas);
    for (var i = 0; i < allIdeas.length; i++){
    console.log(allIdeas[i].id === id);
      if (allIdeas[i].id === id){
        allIdeas.splice(i, 1);
        break;
      }
    }
  }
}


//quality buttons switch case
window.onload = loadIdeas(allIdeas);

function loadIdeas(array) {
  allIdeas = [];
  array.forEach(function (idea) {
    var newIdea = new Idea(idea.id, idea.title, idea.body);
    allIdeas.push(newIdea);
    displayIdea(newIdea);
  });
}

  // retrievedIdeas = localStorage.getItem("stringIdeas");
  // console.log(retrievedIdeas);
  // parsedIdeas = JSON.parse(retrievedIdeas);
  // console.log(parsedIdeas);
  // var saveIdea
  // displayIdea(parsedIdeas.id);

//on
// on page load, pull ideas from localstorage
// parse as object, store as variable
// foreach parsed array, push back through displayidea

//use id to reload card

//localStorage.hasOwnProperty (checks id)