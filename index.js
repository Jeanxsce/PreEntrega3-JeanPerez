const URL = "https://pokeapi.co/api/v2/pokemon/"

const browserInput = document.getElementById("browser");
const pokedexContainer = document.getElementById("results");
const btnBrowser = document.getElementById("btnBrowser");
const myPokemons = document.getElementById("myPokemons");
let results = [];

btnBrowser.addEventListener('click', async() => {
    await searchPokemon();
});

window.onload = function() {
    results = localStorage.getItem("results").split(",");
    console.log(results);
    addFromStorage("");
};

const addFromStorage = (value) => {
    if(results.length >= 6) {
        results.shift();
    }
    if(value !== "") {
        results.push(value);
    }
    localStorage.setItem('results', results);
    const container = document.createElement("div");
    results.forEach(element => {
        const myPokemonImg = document.createElement("img");
        myPokemonImg.src = element;
        container.appendChild(myPokemonImg);
    });
    myPokemons.replaceChildren(container);
}

const searchPokemon = async() => {
    const response = await fetch(URL + browserInput.value);
    const pokemon =  await response.json();
    pokemonToHTML(pokemon); 
}

const pokemonToHTML = (info) => {
    const newCard = document.createElement("div");
    const newImg = document.createElement("img");
    const pokemon = document.createElement("h4");
    const cardBody = document.createElement("div");
    const cardText = document.createElement("p");
    const selectBtn = document.createElement("button");
    const separator = document.createElement("hr");

    const name = info.name;
    const img = info.sprites.front_default;
    const height = info.height;
    const weight = info.weight;

    newImg.src = img;
    cardText.innerHTML = `altura: ${height}, peso: ${weight}`;
    pokemon.innerHTML = name;
    selectBtn.innerText = "elegir"
    selectBtn.addEventListener("click", () => {
        addFromStorage(img);
    });

    newCard.appendChild(newImg);
    newCard.appendChild(pokemon);
    newCard.appendChild(cardBody);
    cardBody.appendChild(cardText);
    cardText.appendChild(selectBtn);
    cardText.appendChild(separator);
    pokedexContainer.appendChild(newCard);
}

