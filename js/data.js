/* exported data */
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};
window.addEventListener('beforeunload', () => {
  localStorage.setItem('codeJournalEntries', JSON.stringify(data));
});

if (localStorage.getItem('codeJournalEntries')) {
  data = JSON.parse(localStorage.getItem('codeJournalEntries'));
}
