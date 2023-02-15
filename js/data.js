/* exported data */
function beforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-local-storage', dataJSON);
}
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var FirstDataJSON = localStorage.getItem('data-local-storage');
if (FirstDataJSON !== null) {
  data = JSON.parse(FirstDataJSON);
}

window.addEventListener('beforeunload', beforeUnload);
