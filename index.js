document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:8000'
    const catForm = document.querySelector('#cat-form');

    catForm.addEventListener('submit', newCat);

    function newCat(e) {
        e.preventDefault();

        const name = document.querySelector('#name-input').value;
        const img = document.querySelector('#img-input').value;
        const age = document.querySelector('#age-input').value;
        const description = document.querySelector('#description-input').value;

        let newCatObj = {
            name: name,
            img: img,
            age: age,
            description: description,
            likes: 0
        }

        fetch(`${baseUrl}/cats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newCatObj)
        })
            .then(resp => resp.json())
            .then(({ name }) => { console.log(name) })

        renderCat(newCatObj);
        catForm.reset;
    }
})

function getCat() {
    fetch(`${baseUrl}/cats`)
        .then(resp => resp.json())
        .then(catsArr => catsArr.forEach(cat => renderCat(cat)));
}
getCat();

function renderCat(cat) {
    const catCard = document.createElement('div');
    catCard.id = `cat-${cat.id}`;
    catCard.className = 'cat-card';

    catCard.addEventListener('click', () => (cat));

    const catImg = document.createElement('img');
    catImg.src = cat.img;
    catImg.alt = `${cat.name} image`;

    const catName = document.createElement('h3');
    catName.textContent = `${cat.name}`;
}