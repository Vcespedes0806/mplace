// obtener datos del json file
let data = []

async function getItems() {
    console.log("iniciando la llamada de items")

    // obtener datos del API
    data = await getApiData();

    // agregar datos al html
    let cardsEl = document.getElementById('cards')

    data.forEach((element) => {
        console.log(element.title)

        // add element
        const newDiv = document.createElement("div");
        newDiv.className = 'card'
        newDiv.innerHTML = `
     <div class="image">
             <img src="${element.image}" alt="image" />
     </div>
     <article>
         <div class="title">${element.title}</div>
         <div class="price">${element.price} USD</div>
         <a href="detail.html?product=${element.id}">Ver más</a>
     </article>
 `;

        cardsEl.appendChild(newDiv)
    })
}

async function getApiData() {
    const loaderEl = document.getElementById('loader')

    try {
        loaderEl.style.display = 'block'

        const response = await fetch("http://localhost:3100/api/products");
        const products = await response.json();

        return products;
    } catch (error) {
        console.log("error cargando los producstos", error)

        const errorEl = document.getElementById('error')
        errorEl.style.display = 'block'
    } finally {
        loaderEl.style.display = 'none'
    }

    return [];
}

async function getItemDetail(productId) {
    console.log("obtener informacion de producto: ", productId)

    let data = {}

    data = await getApiItemData()
    console.log("data es: ", data)

    const mainEl = document.getElementById('main')
    const titleEl = document.getElementById('title')
    const priceEl = document.getElementById('price')
    const descriptionEl = document.getElementById('description')
    const imageEl = document.getElementById('image')

    titleEl.innerHTML = data[0].title;
    priceEl.innerHTML = data[0].price;
    descriptionEl.innerHTML = data[0].description;
    imageEl.src = data[0].image;
    mainEl.style.display = 'block'
}

async function getApiItemData() {
    console.log('api para obtener informacion de producto')

    const loaderEl = document.getElementById('loader')

    try {
        loaderEl.style.display = 'block'


        const endpoint = "http://localhost:3100/api/products/" + productId;

        const response = await fetch(endpoint);
        const product = await response.json();

        return product;
    } catch (error) {
        console.log("error cargando el producsto", error)

        const errorEl = document.getElementById('error')
        errorEl.style.display = 'block'
    } finally {
        loaderEl.style.display = 'none'
    }
}