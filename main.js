var titleInput = document.querySelector('#title-input').value;
var bodyInput = document.querySelector('#body-input').value;
var saveButton = document.querySelector('#save-btn');
var ideaTitleInput = document.querySelector('#title-input').value;
var ideaBodyInput = document.querySelector('#body-input').value;
var ideaBox = document.querySelector('.ideas');
// var quality = document.querySelector('')
// var card areas
// var cardId = 1 (cardID++)



saveButton.addEventListener('click', function(){
  displayIdea(cardId, ideaTitleInput, ideaBodyInput);
})

// function displayIdea (cardId, ideaTitle, ideaBody, quality) {
//   var html =      `<section class="idea-box ideaBoxId${cardId}">
//                   <h3 class="idea-box-title">${ideaTitle}</h3>
//                   <h4 class="idea-box-body">${ideaBody}</h4>
//                   <hr class="idea-box-seperation">
//                   <h5 class="quality">Quality: ${quality}</h5>
//                   </section>`
// ideaBox.insertAdjacentHTML('beforeend', html);
// }