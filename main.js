//Global Variables//
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('#save-btn');
var ideaSection = document.querySelector('.ideas');
var allIdeas = JSON.parse(localStorage.getItem('stringIdeas')) || [];
var searchBtn = document.querySelector('#search-btn');

//Event Listenerss//
saveBtn.addEventListener('click', saveIdea);
searchBtn.addEventListener('click', searchIdeas);

window.onload = loadIdeas(allIdeas);

function saveIdea(){
  var title = titleInput.value;
  var body = bodyInput.value;
  var id = Date.now();
  var newIdea = new Idea(id, title, body);
  displayIdea(newIdea);
  allIdeas.push(newIdea);
  newIdea.saveToStorage();
}

function displayIdea(ideaObj) {
    var ideaCard =  `<section class="idea-box" id="${ideaObj.id}">
                      <h3 class="idea-box-title" contenteditable="true">${ideaObj.title}</h3>
                      <h4 class="idea-box-body" contenteditable="true">${ideaObj.body}</h4>
                    <div class="quality-section">
                      <div>
                        <input type="image" src="images/downvote.svg" class="buttons" id="downvote" alt="Down Vote">
                        <input type="image" src="images/upvote.svg" class="buttons" id="upvote" alt="Up Vote">
                        <h5>Quality: ${ideaObj.quality}</h5>
                      </div>
                      <input type="image" src="images/delete.svg" class="buttons" id="delete" alt="Delete Button">
                    </div>
                  </section>`
    ideaSection.insertAdjacentHTML('afterbegin',ideaCard);
}

ideaSection.addEventListener('click', clickHandler);

function loadIdeas(array) {
  allIdeas = [];
  array.forEach(function (idea) {
    var newIdea = new Idea(idea.id, idea.title, idea.body);
    allIdeas.push(newIdea);
    displayIdea(newIdea);
  });
}

function clickHandler(e) {
  if(e.target.id === 'delete') {
    deleteIdea(e);
  }
}

function deleteIdea(e) {
  var card = e.target.closest('.idea-box');
  var cardId = parseInt(card.id);
  card.remove();
  var neededIdea = allIdeas.find(function(idea) {
    return idea.id === cardId
  });
  neededIdea.deleteFromStorage();
}

function removeIdeas() {
  ideaSection.innerHTML = '';
}

function searchIdeas(){
  removeIdeas();
  var searchInput = document.querySelector('#search').value;
  var searchValue = searchInput.toLowerCase();
  var searchIdeas = allIdeas.filter(function(ideas){
    return ideas.title.toLowerCase().includes(searchValue) || ideas.body.toLowerCase().includes(searchValue);
  });
  searchIdeas.forEach(function(element) {
    displayIdea(element);
  })
}