let addToy = false;
const toyURL = "http://localhost:3000/toys"
const toyCollection = document.querySelector("#toy-collection")
console.log(toyCollection)

//dynamic renderData with separate createToy
function renderData() {
  fetch(toyURL).then(res => res.json()).then(data => {
    data.forEach((toy)=>toyCollection.append(createToy(toy)))
  })
  console.log('I have rendered')
}

//create toy from Fetch or through form
function createToy(toy) {
  console.log('I have created toys')
  const div = document.createElement('div')
  div.className = 'card'
  div.id = toy.id
  const h2 = document.createElement('h2')
  h2.textContent = toy.name
  const img = document.createElement('img')
  img.src = `${toy.image}`
  img.className = 'toy-avatar'
  let p = document.createElement('p')
  p.textContent = toy.likes
  const btn = document.createElement('button')
  btn.className = 'like-btn'
  btn.addEventListener("click", (e)=> {
    console.log(e.path[1].id)
    const toyId = e.path[1].id
    fetch(`${toyURL}`+`/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({likes: toy.likes++})})
    .then(res => res.json()).then(data => {
      console.log(data)
      //p.textContent = data.likes
      })
      p.textContent = toy.likes++
    })
  div.append(h2, img, p, btn)
  return div
}

//posting data of form-added toy to DB and rendering in HTML upon successful response
function addToyToDB() {
  const form = document.querySelector(".add-toy-form")
  console.log(form)
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e)
    console.log(e.target[0].value)
    console.log(e.target[1].value)

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "name": `${e.target[0].value}`,
        "image": `${e.target[1].value}`,
        "likes": 0
      })
    }).then(res => res.json()).then(toy => {
      console.log(toy)
      /*const div = document.createElement('div')
      div.className = 'card'
      const h2 = document.createElement('h2')
      h2.textContent = `${e.target[0].value}`
      const img = document.createElement('img')
      img.src = `${e.target[1].value}`
      img.className = 'toy-avatar'
      const p = document.createElement('p')
      p.textContent = 0
      const btn = document.createElement('button')
      btn.className = 'like-btn'
      div.append(h2, img, p, btn)
      toyCollection.append(div)*/
      toyCollection.append(createToy(toy))
  })
})
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  renderData()
  addToyToDB()
});
