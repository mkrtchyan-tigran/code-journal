var $imgPreview = document.querySelector('img');
var $imgUrlField = document.querySelector('#img-src');
var $form = document.querySelector('form');
var $entryList = document.querySelector('.entries-list');
var $noEntriesTxt = document.querySelector('#no-entries');
var $divList = document.querySelectorAll('div[data-view]');
var $navTabs = document.querySelector('nav');
var $newButton = document.querySelector('.new-entry-button');

var livePreview = event => {
  var $imgUrlInput = event.target.value;
  $imgPreview.setAttribute('src', $imgUrlInput);
};
var logNewEntry = event => {
  event.preventDefault();
  var $newEntry = {
    title: $form.elements.title.value,
    photoUrl: $form.elements['img-src'].value,
    notes: $form.elements['img-notes'].value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift($newEntry);
  $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();

  var $newDom = renderEntry($newEntry);
  $entryList.prepend($newDom);
  viewSwap('entries');

  toggleNoEntries(data.entries);

};

var renderEntry = entry => {
  var $entryLi = document.createElement('li');
  var $liDiv = document.createElement('div');
  var $imgDiv = document.createElement('div');
  var $imgEl = document.createElement('img');
  var $textDiv = document.createElement('div');
  var $imgTitle = document.createElement('h4');
  var $imgNotes = document.createElement('p');

  $liDiv.className = 'row';
  $imgDiv.className = 'column-half';
  $imgEl.setAttribute('src', entry.photoUrl);
  $textDiv.className = 'column-half';
  $imgTitle.textContent = entry.title;
  $imgNotes.textContent = entry.notes;

  $imgDiv.appendChild($imgEl);
  $textDiv.appendChild($imgTitle);
  $textDiv.appendChild($imgNotes);
  $liDiv.appendChild($imgDiv);
  $liDiv.appendChild($textDiv);
  $entryLi.appendChild($liDiv);

  return $entryLi;
};

var domEntries = entries => {
  for (var entry = 0; entry < entries.length; entry++) {
    $entryList.append(renderEntry(entries[entry]));
  }

  viewSwap(data.view);

  toggleNoEntries(data.entries);
};

var toggleNoEntries = entries => {
  if (entries.length > 0) {
    $noEntriesTxt.classList.add('hidden');
  } else {
    $noEntriesTxt.classList.remove('hidden');
  }
};

var viewSwap = view => {
  data.view = view;
  for (var divView = 0; divView < $divList.length; divView++) {
    if ($divList[divView].getAttribute('data-view') === view) {
      $divList[divView].classList.remove('hidden');
    } else {
      $divList[divView].classList.add('hidden');
    }
  }
};

var clickView = event => {
  viewSwap(event.target.getAttribute('data-view'));
};

$form.addEventListener('submit', logNewEntry);
$imgUrlField.addEventListener('input', livePreview);

document.addEventListener('DOMContentLoaded', domEntries(data.entries));
$navTabs.addEventListener('click', clickView);
$newButton.addEventListener('click', clickView);
