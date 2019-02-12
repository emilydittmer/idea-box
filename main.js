var titleInput = document.querySelector('#title-input').value;
var bodyInput = document.querySelector('#body-input').value;
var saveButton = document.querySelector('#save-btn');
var ideaTitleInput = document.querySelector('#title-input').value;
var ideaBodyInput = document.querySelector('#body-input').value;
var ideaBox = document.querySelector('.ideas');
// var quality = document.querySelector('')



saveButton.addEventListener('click', function(){
  displayIdea(ideaTitleInput, ideaBodyInput);
})

function displayIdea (ideaTitle, ideaBody, quality) {
  var ideaBoxes =`<section class="idea-box">
                  <h3 class="idea-box-title">${ideaTitle}</h3>
                  <h4 class="idea-box-body">${ideaBody}</h4>
                  <hr class="idea-box-seperation">
                  <h5 class="quality">Quality: ${quality}</h5>
                  </section>`
ideaBox.insertadjacentHTML('beforeend', ideaBoxes);
}