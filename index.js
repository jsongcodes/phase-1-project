const catForm = document.querySelector('#cat-form');

catForm.addEventListener('submit', newCat);

function newCat(e) {
    e.preventDefault();
}