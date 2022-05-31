document.addEventListener('DOMContentLoaded', () => {
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

        fetch(`http://localhost:8000/cats`, {
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