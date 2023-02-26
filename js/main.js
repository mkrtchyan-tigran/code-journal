var $imgPreview = document.querySelector('img');
var $imgUrlField = document.querySelector('#img-src');
var $form = document.querySelector('form');
var $entryList = document.querySelector('.entries-list');
var $noEntriesTxt = document.querySelector('#no-entries');
var $divList = document.querySelectorAll('div[data-view]');
var $navTabs = document.querySelector('nav');
var $newButton = document.querySelector('.new-entry-button');
var $entryFormHeader = document.querySelector('#entry-form-header');
var editEntryIndex = 0;
var $delAnchor = document.querySelector('#del-entry');
var $deleteModal = document.querySelector('#delete-modal');
var $cancelButton = document.querySelector('#cancel-button');
var $confirmButton = document.querySelector('#confirm-button');

var livePreview = event => {
  var $imgUrlInput = event.target.value;

  $imgPreview.setAttribute('src', $imgUrlInput);
};
var logNewEntry = event => {
  event.preventDefault();

  if (!data.editing) {
    var $newEntry = {
      title: $form.elements.title.value,
      photoUrl: $form.elements['img-src'].value,
      notes: $form.elements['img-notes'].value,
      entryId: data.nextEntryId
    };

    data.entries.unshift($newEntry);
    $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
    $form.reset();

    var $newDom = renderEntry($newEntry);

    data.nextEntryId++;
    $entryList.prepend($newDom);
  } else {
    var $updatedEntry = {
      title: $form.elements.title.value,
      photoUrl: $form.elements['img-src'].value,
      notes: $form.elements['img-notes'].value,
      entryId: data.editing.entryId
    };

    data.entries.splice(editEntryIndex, 1, $updatedEntry);

    var $entryLiNodes = document.querySelectorAll('li[data-entry-id]');

    $entryLiNodes[editEntryIndex].replaceWith(renderEntry($updatedEntry));
    $entryFormHeader.textContent = 'New Entry';
    data.editing = null;
    $delAnchor.className = 'invisible';
  }
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
  var $editIcon = document.createElement('i');
  var $titleDiv = document.createElement('div');

  $liDiv.className = 'row';
  $entryLi.setAttribute('data-entry-id', entry.entryId);
  $imgDiv.className = 'column-half';
  $imgEl.setAttribute('src', entry.photoUrl);
  $textDiv.className = 'column-half';
  $titleDiv.className = 'title-header';
  $imgTitle.textContent = entry.title;
  $editIcon.className = 'fa-solid fa-pen';
  $imgNotes.textContent = entry.notes;

  $imgDiv.appendChild($imgEl);
  $titleDiv.appendChild($imgTitle);
  $titleDiv.appendChild($editIcon);
  $textDiv.appendChild($titleDiv);
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
  if ($entryFormHeader.textContent === 'Edit Entry') {
    $form.reset();
    $entryFormHeader.textContent = 'New Entry';
    data.editing = null;
    $imgPreview.setAttribute('src', 'images/placeholder-image-square.jpg');
    $delAnchor.className = 'invisible';
  }
};

var clickView = event => {
  if (!event.target.getAttribute('data-view')) {
    return;
  }

  viewSwap(event.target.getAttribute('data-view'));
};

var editEntry = event => {
  if (event.target.tagName !== 'I') {
    return;
  }

  viewSwap('entry-form');

  for (var savedEntry = 0; savedEntry < data.entries.length; savedEntry++) {
    if (JSON.stringify(data.entries[savedEntry].entryId) === event.target.closest('li').getAttribute('data-entry-id')) {
      data.editing = { ...data.entries[savedEntry] };
      editEntryIndex = savedEntry;
    }
  }

  $form.elements.title.value = data.editing.title;
  $form.elements['img-src'].value = data.editing.photoUrl;
  $form.elements['img-notes'].value = data.editing.notes;
  $imgPreview.setAttribute('src', data.editing.photoUrl);
  $entryFormHeader.textContent = 'Edit Entry';
  $delAnchor.className = '';
};

var toggleDelModal = event => {
  if (event.target.textContent === 'Delete Entry') {
    $deleteModal.className = '';
  } else {
    $deleteModal.className = 'hidden';
  }
};

var delEntry = event => {
  var $entryLiNodes = document.querySelectorAll('li[data-entry-id]');
  var $currentLi = $entryLiNodes[editEntryIndex];

  data.entries.splice(editEntryIndex, 1);
  $entryList.removeChild($currentLi);
  toggleNoEntries(data.entries);
  toggleDelModal(event);
  viewSwap('entries');
};

$form.addEventListener('submit', logNewEntry);
$imgUrlField.addEventListener('input', livePreview);
document.addEventListener('DOMContentLoaded', domEntries(data.entries));
$navTabs.addEventListener('click', clickView);
$newButton.addEventListener('click', clickView);
$entryList.addEventListener('click', editEntry);
$delAnchor.addEventListener('click', toggleDelModal);
$cancelButton.addEventListener('click', toggleDelModal);
$confirmButton.addEventListener('click', delEntry);
