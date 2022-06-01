document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000'
    const catForm = document.querySelector('#cat-form');
    const catContainer = document.querySelector('#cat-container');
    const catFormContainer = document.querySelector('#cat-form-container');

    catForm.addEventListener('submit', newCat);

    function newCat(e) {
        e.preventDefault();

        const name = document.querySelector('#name-input').value;
        const img = document.querySelector('#img-input').value;
        const age = document.querySelector('#age-input').value;
        const description = document.querySelector('#description-input').value;

        let newCatObj = {
            name,
            img,
            age,
            description,
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

        const catAge = document.createElement('p');
        catAge.textContent = `Age: ${cat.age}`;

        const catDescription = document.createElement('p');
        catDescription.textContent = `Description: ${cat.description}`;

        const catLikes = document.createElement('p');
        catLikes.textContent = `Likes: `;

        const likesNum = document.createElement('p');
        likesNum.className = 'likes-num';
        likesNum.textContent = cat.likes;

        const likesBttn = document.createElement('button');
        likesBttn.className = 'likes-bttn';
        likesBttn.textContent = '♥';

        likesBttn.addEventListener('click', (e) => {
            e.stopPropagation();
            ++cat.likes;
            likesNum.textContent = cat.likes;
            fetch(`${baseUrl}/cats/${cat.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ likes: cat.likes })
            })
            likesNum.textContent = cat.likes;
        })

        const deleteBttn = document.createElement('button');
        deleteBttn.className = 'delete-bttn';
        deleteBttn.textContent = 'Delete me! I\'ve been adopted!'
        deleteBttn.addEventListener('click', (e) => {
            e.stopPropagation();
        })

        catCard.append(catImg, catName, catAge, catDescription, catLikes, likesNum, likesBttn, deleteBttn);

        catContainer.appendChild(catCard);

        return catCard;
    }
})

