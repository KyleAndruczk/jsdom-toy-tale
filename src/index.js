let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = toyFormContainer.querySelector('form.add-toy-form')
  const collection = document.querySelector('div#toy-collection')
  

  // event handlers
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyFormContainer.addEventListener("submit", event => {
    event.preventDefault()
    const name = event.target[0].value
    const image = event.target[1].value
    const toysObject = {
      name,
      image,
      likes:0,
    }
    form.reset()
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toysObject)
  })
  .then(r => r.json())
  .then(createOneToy(toysObject))
  })

  collection.addEventListener('click', event => {
    if (event.target.matches('button.like-btn')) {
      let card = event.target.closest("div.card")
      let likesP = card.querySelector('p')
      
      let numLikes = parseInt(likesP.innerHTML)
      let newNumLikes = numLikes + 1


      likesP.textContent = newNumLikes



      fetch(`http://localhost:3000/toys/${card.dataset.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ likes: newNumLikes })
        })
        .then(r => r.json())
        .then(data => console.log(data))
    }

    
  })


  // init fcn
  getAllToys()
// });

function getAllToys() {
  fetch('http://localhost:3000/toys')
  .then(r => r.json())
  .then(toys => {
      toys.forEach(toy => {
          createOneToy(toy)
      })
  })
}

function createOneToy(toy) {
  const outerDiv = document.createElement('div')
  outerDiv.classList.add('card')
  outerDiv.dataset.id = toy.id

  outerDiv.innerHTML = `
  <h2>${toy.name}</h2>
  <img src=${toy.image} class="toy-avatar" />
  <p>${toy.likes}</p>
  <button class="like-btn">Like <3</button>
  `

  const collection = document.querySelector('div#toy-collection')
  collection.append(outerDiv)
}

