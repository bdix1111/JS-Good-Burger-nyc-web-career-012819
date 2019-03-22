document.addEventListener("DOMContentLoaded", () => {
//Implement Your Code Here
// DELIVERABLE: Get all the burgers on the menu and render them to the page

//Globalish(oops) variables
  const menuDiv = document.getElementById('burger-menu')
  const orderListContainer = document.getElementById('order-list')
  let addToOrderButton = document.getElementsByClassName('button')
  const customBurgerSubmit = document.getElementById('custom-burger-submit')
  const burgerForm = document.getElementById('custom-burger')

//GET to burgers api for all burgers //parses json //passes parsed json to be rendered
  function getAllBurgers () {
    fetch('http://localhost:3000/burgers')
      .then(res => res.json())
      .then(burgers => renderBurgerMenu(burgers))
  }

//iterates through every burger object, makes a burger container for it, and renders them to the menu container
// should probably be refactored a lil
  function renderBurgerMenu(burgers) {
    menuDiv.innerHTML = ''

    burgers.map(function(burger) {
      const burgerDiv = document.createElement('div')
      burgerDiv.className = "burger"
      burgerDiv.innerHTML = `
        <h3 class="burger_title">${burger.name}</h3>
          <img src=${burger.image}>
          <p class="burger_description"> ${burger.description}</p>
        <button class="button" data-id=${burger.id}>Add to Order</button>
      `
    menuDiv.appendChild(burgerDiv)
    })
  }

  getAllBurgers();

//DELIVERABLE: Add burger to order list when "add to order" is pressed

//Fetches, parses, and returns one burger object
  function getOneBurger(burgerId) {
    return fetch(`http://localhost:3000/burgers/${burgerId}`).then(res => res.json())
  }

//creates a burger li
  function createBurgerLi(burger) {
    return `
      <li> ${burger.name} </li>
    `
  }

//Adds event listener to 'add burger button' //if abb is clicked, grabs burger ID from button //passes id to getOneBurger() // passes return through createBurgerLi() and adds it to the Order List
  menuDiv.addEventListener('click', (e) => {
    if (e.target.className === 'button') {
      const burgerId = e.target.dataset.id
      getOneBurger(burgerId)
      .then(burger => {
        orderListContainer.innerHTML += createBurgerLi(burger)
      })
    }

    })

// DELIVERABLE: A user should be able to create their own burgers which adds to both the menu and the order list


//POST to burgers API using the form data //passes parsed json through createBurgerLi and adds it to the Order List //Renders updated burger to page //*pessimistic rendering?* //resets form
  function createCustomBurger(burgerData) {
    fetch('http://localhost:3000/burgers', {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify(burgerData)
    })
    .then(res => res.json())
.then(newBurger => {
      orderListContainer.innerHTML += createBurgerLi(newBurger)
      getAllBurgers()
    })
    burgerForm.reset()
  }

//adds event listener to custom burger form's submit button //saves form values into a custom burger data object //passes the burger object to createCustomBurger()
  customBurgerSubmit.addEventListener('click', (e) => {
    e.preventDefault()

    let customBurgerName = document.getElementById('burger-name').value
    let customBurgerDescription = document.getElementById('burger-description').value
    let customBurgerImage = document.getElementById('burger-image').value

    const burgerData = {
        name: customBurgerName,
        description: customBurgerDescription,
        image: customBurgerImage
      }

    createCustomBurger(burgerData)
  })






})
