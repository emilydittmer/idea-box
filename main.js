//Global Variables//
var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('#save-btn');
var ideaSection = document.querySelector('.ideas');
var allIdeas = JSON.parse(localStorage.getItem('stringIdeas')) || [];
var searchBtn = document.querySelector('#search-btn');

//Event Listeners//
saveBtn.addEventListener('click', saveIdea);
searchBtn.addEventListener('click', searchIdeas);
ideaSection.addEventListener('focusout', editIdeas);

window.onload = loadIdeas(allIdeas);

function loadIdeas(array) {
  allIdeas = [];
  array.forEach(function (idea) {
    var newIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
    allIdeas.push(newIdea);
    displayIdea(newIdea);
  });
}

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
    var ideaCard =  
      `<section class="idea-box" id="${ideaObj.id}">
          <h3 class="idea-box-title" contenteditable="true">${ideaObj.title}</h3>
          <h4 class="idea-box-body" contenteditable="true">${ideaObj.body}</h4>
        <div class="quality-section">
          <div>
            <input type="image" src="images/downvote.svg" class="buttons" id="downvote" alt="Down Vote">
            <input type="image" src="images/upvote.svg" class="buttons" id="upvote" alt="Up Vote">
            <h5>Quality: <span class="quality-text">${ideaObj.quality}</span> </h5>
         </div>
            <input type="image" src="images/delete.svg" class="buttons" id="delete" alt="Delete Button">
        </div>
      </section>`
    ideaSection.insertAdjacentHTML('afterbegin',ideaCard);
}

ideaSection.addEventListener('click', clickHandler);


function clickHandler(e) {
  if(e.target.id === 'delete') {
    deleteIdea(e);
  }
  else if (e.target.id === 'upvote') {
    upVote(e);
  }
  else if (e.target.id === 'downvote') {
    downVote(e);
  }
}

function deleteIdea(e) {
  var card = e.target.closest('.idea-box');
  var cardId = parseInt(card.id);
  card.remove();
  var neededIdea = findIdea(cardId)
  neededIdea.deleteFromStorage();
}

function findIdea(cardId) {
  return allIdeas.find(function(idea) {
    return idea.id === cardId
  });
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

function editIdeas(e) {
  var card = e.target.closest('.idea-box');
  var cardId = parseInt(card.id);
  var ideaTitle = ideaSection.firstChild.firstChild.nextSibling;
  var editTitle = ideaTitle.innerText;
  var ideaBody = ideaSection.firstChild.firstChild.nextSibling.nextSibling.nextSibling;
  var editBody = ideaBody.innerText;
  var neededIdea = allIdeas.find(function(idea) {
    return idea.id === cardId;
  });
  neededIdea.updateContent(editTitle, editBody);
} 

function upVote(e) {
  var card = e.target.closest('.idea-box');
  var cardId = parseInt(card.id);
  var qualityText = e.target.parentElement.querySelector('span');
  var ideaToUpdate = findIdea(cardId);
  if (qualityText.innerText === 'Swill') {
    qualityText.innerText = 'Plausible';
    ideaToUpdate.updateQuality('Plausible');
  } else if (qualityText.innerText === 'Plausible') {
    qualityText.innerText = 'Genius';
    ideaToUpdate.updateQuality('Genius');
  }
}

function downVote(e) {
  var card = e.target.closest('.idea-box');
  var cardId = parseInt(card.id);
  var qualityText = e.target.parentElement.querySelector('span');
  var ideaToUpdate = findIdea(cardId);
  if (qualityText.innerText === 'Genius') {
    qualityText.innerText = 'Plausible';
    ideaToUpdate.updateQuality('Plausible');
  } else if (qualityText.innerText === 'Plausible') {
    qualityText.innerText = 'Swill';
    ideaToUpdate.updateQuality('Swill');
  }
}
