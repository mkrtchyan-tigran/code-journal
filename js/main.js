function update(event) {
  var urlPhoto = event.target.value;

  placeholderImage.setAttribute('src', urlPhoto);
}
var urlPhotoInput = document.querySelector('.url-photo-input');
var placeholderImage = document.querySelector('.placeholder-image');
urlPhotoInput.addEventListener('input', update);

function submit(event) {
  event.preventDefault();
  var refresh = {};
  refresh.title = form.elements.title.value;
  refresh.urlPhoto = form.elements.urlPhoto.value;
  refresh.notes = form.elements.notes.value;
  refresh.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(refresh);

  placeholderImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  form.reset();
}
var form = document.querySelector('.form');
form.addEventListener('submit', submit);
