var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveBtn = document.querySelector('#save-btn');
var ideaSection = document.querySelector('.ideas');
var allIdeas = JSON.parse(localStorage.getItem('stringIdeas')) || [];
var searchBtn = document.querySelector('#search-btn');
var qualityBtnContainer = document.querySelector('.quality-filter-btn');
var searchInput = document.querySelector('#search');
var showBtn = document.querySelector('#show-ideas-btn');

saveBtn.addEventListener('click', saveIdea);
searchInput.addEventListener('input', searchIdeas);
ideaSection.addEventListener('focusout', editIdeas);
qualityBtnContainer.addEventListener('click', qualityHandler);
showBtn.addEventListener('click', showIdeas);

window.onload = loadIdeas(allIdeas);

function loadIdeas(array) {
  allIdeas = [];
  array.forEach(function (idea) {
    var newIdea = new Idea(idea.id, idea.title, idea.body, idea.quality);
    allIdeas.push(newIdea);
    displayIdea(newIdea);
  });
  hideIdeas();
}

function saveIdea(){
  var title = titleInput.value;
  var body = bodyInput.value;
  var id = Date.now();
  var newIdea = new Idea(id, title, body);
  displayIdea(newIdea);
  allIdeas.push(newIdea);
  newIdea.saveToStorage();
  clearIdeaFields();
}

function clearIdeaFields(){
  titleInput.value = '';
  bodyInput.value = '';
}

function displayIdea(ideaObj) {
    var ideaCard =  
      `<section class="idea-box" data-id="${ideaObj.id}">
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
  var cardId = parseInt(card.dataset.id);
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
  var newSearch = searchInput.value;
  var searchValue = newSearch.toLowerCase();
  var searchIdeas = allIdeas.filter(function(idea){
    return idea.title.toLowerCase().includes(searchValue) || idea.body.toLowerCase().includes(searchValue);
  });
  searchIdeas.forEach(function(element) {
    displayIdea(element);
  });
}

function clearSearchField(){
  searchInput.value = '';
}

function editIdeas(e) {
  var card = e.target.closest('.idea-box');
  var cardId = parseInt(card.dataset.id);
  var ideaTitle = card.firstChild.nextSibling;
  var editTitle = ideaTitle.innerText;
  var ideaBody = card.firstChild.nextSibling.nextSibling.nextSibling;
  var editBody = ideaBody.innerText;
  var neededIdea = allIdeas.find(function(idea) {
    return idea.id === cardId;
  });
  neededIdea.updateContent(editTitle, editBody);
}  

function upVote(e) {
  var card = e.target.closest('.idea-box');
  var cardId = parseInt(card.dataset.id);
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
  var cardId = parseInt(card.dataset.id);
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

function qualityHandler(e) {
  if(e.target.id === 'swill-btn') {
    qualityFilter('Swill');
  }
  else if (e.target.id === 'plausible-btn') {
    qualityFilter('Plausible');
  }
  else if (e.target.id === 'genius-btn') {
    qualityFilter('Genius');
  }
}

function qualityFilter(quality){
  removeIdeas();
  var filteredIdeas = allIdeas.filter(function(idea){
    return idea.quality.includes(quality);
  });
  filteredIdeas.forEach(function(element) {
    displayIdea(element);
  });
}

function hideIdeas(){
  var ideasOnPage = document.querySelectorAll('.idea-box');
    for (var i = 10; i < ideasOnPage.length; i++) {
      ideasOnPage[i].classList.add('hidden-idea');
  }
}

function showIdeas() {
  var ideasOnPage = document.querySelectorAll('.idea-box');
  if (showBtn.innerText === 'Show less...') {
    hideIdeas();
    showBtn.innerText = 'Show more...';
  } else if (ideasOnPage.length > 10) {
    showAllIdeas();
    showBtn.innerText = 'Show less...';
  }
}

function showAllIdeas() {
  var ideasOnPage = document.querySelectorAll('.idea-box');
    for (var i = 10; i < ideasOnPage.length; i++) {
      ideasOnPage[i].classList.remove('hidden-idea');
    }
}



