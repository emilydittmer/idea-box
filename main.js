var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-input');
var saveButton = document.querySelector('#save-btn');
var ideaBox = document.querySelector('.ideas');
var allIdeas = JSON.parse(localStorage.getItem('stringIdeas')) || [];
saveButton.addEventListener('click', saveIdea);
var qualities = ['Quality: Swill', 'Quality: Plausible', 'Quality: Genius'];

function saveIdea() {
  var title = titleInput.value;
  var body = bodyInput.value;
  var id = Date.now();
  var newIdea = new Idea(id, title, body);
  displayIdea(newIdea);
  allIdeas.push(newIdea);
  newIdea.saveToStorage();
}

ideaBox.addEventListener('keyup', editIdea);
function editIdea(e) {
  var editIdeaTitle = document.querySelector('.idea-box-title');
  var editIdeaBody = document.querySelector('.idea-box-body').value;
  console.log(editIdeaTitle.value);
  var id = parseInt(e.target.closest('section').id);
  var editedIdea = new Idea()


}

function displayIdea(ideaObj) {
  //cardContainer.dataset.id = cardId;
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
   ideaBox.insertAdjacentHTML('afterbegin',ideaCard);
}

ideaBox.addEventListener('click', clickHandler);


function clickHandler(e){
  deleteIdea(e);
  upvote(e);
  downvote(e);
}

function upvote(e){
    if (e.target.id === 'upvote'){
    var id = parseInt(e.target.closest('section').id);
    var ideaWeWant;
    for (var i = 0; i < allIdeas.length; i++) {
      if (allIdeas[i].id === id) {
        ideaWeWant = allIdeas[i];
        var qualityIndex = qualities.indexOf(ideaWeWant.quality);
        if (qualityIndex < 2 ) {
          qualityIndex++
          ideaWeWant.quality = qualities[qualityIndex];
          var placeholder = e.target.closest('div.quality-section').children[0];
          placeholder.children[2].innerText = qualities[qualityIndex];
        }
        }
      }
    }
  }

function downvote(e) {
  if(e.target.id === 'downvote'){
  var id = parseInt(e.target.closest('section').id);
  var ideaWeWant;
  for (var i = 0; i < allIdeas.length; i++) {
    if (allIdeas[i].id === id) {
      ideaWeWant = allIdeas[i];
      var qualityIndex = qualities.indexOf(ideaWeWant.quality);
        if (qualityIndex > 0 ) {
          qualityIndex--
          ideaWeWant.quality = qualities[qualityIndex];
          var placeholder = e.target.closest('div.quality-section').children[0];
          placeholder.children[2].innerText = qualities[qualityIndex];
        }
      }
    }
  }
}

function deleteIdea(e) {
  var id = parseInt(e.target.closest('section').id);
  if(e.target.id === 'delete'){
    var card = e.target.closest('.idea-box');
    var id = parseInt(card.id);
    card.remove();
    var neededIdea = allIdeas.find(function(idea) {
      return idea.id === id
    });
    neededIdea.deleteFromStorage();
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



  /* 
    -- Easy save to loal storage
    -- checks to see if id exists
    -- if not, adds to local storage
    -- if id does exist, updates id, replace index


    -- save one, delete one

    USE THIS!!!!


  */
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