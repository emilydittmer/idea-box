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
                  <h5 class="quality">Quality: ${ideaObj.quality}</h5>
                  </section>`
   ideaBox.insertAdjacentHTML('afterbegin',ideaCard);
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