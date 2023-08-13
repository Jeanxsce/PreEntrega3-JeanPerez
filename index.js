const URL = "https://pokeapi.co/api/v2/pokemon/"

const browserInput = document.getElementById("browser");
const pokedexContainer = document.getElementById("results");
const btnBrowser = document.getElementById("btnBrowser");

btnBrowser.addEventListener('click', async() => {
    await searchPokemon();
});

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
        localStorage.setItem(name, img);
    });

    newCard.appendChild(newImg);
    newCard.appendChild(pokemon);
    newCard.appendChild(cardBody);
    cardBody.appendChild(cardText);
    cardText.appendChild(selectBtn);
    cardText.appendChild(separator);
    pokedexContainer.appendChild(newCard);
}

