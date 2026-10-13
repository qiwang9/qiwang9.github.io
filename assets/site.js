'use strict';
// Native details keep every abstract usable without JavaScript.
const allAbstracts = [...document.querySelectorAll('details.abstract')];
const expandButton = document.querySelector('.expand-abstracts');
if (expandButton && allAbstracts.length) {
  expandButton.hidden = false;
  const syncButton = () => {
    const allOpen = allAbstracts.every(item => item.open);
    expandButton.textContent = allOpen ? 'Collapse all abstracts' : 'Expand all abstracts';
    expandButton.setAttribute('aria-pressed', String(allOpen));
  };
  expandButton.addEventListener('click', () => {
    const shouldOpen = !allAbstracts.every(item => item.open);
    allAbstracts.forEach(item => { item.open = shouldOpen; });
    syncButton();
  });
  allAbstracts.forEach(item => item.addEventListener('toggle', syncButton));
  syncButton();
}
function openLinkedPaper() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  const paper = document.getElementById(id);
  if (paper && paper.matches('[data-paper-id]')) {
    const abstract = paper.querySelector('details.abstract');
    if (abstract) abstract.open = true;
  }
}
window.addEventListener('hashchange', openLinkedPaper);
openLinkedPaper();
