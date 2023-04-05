// Select the search input element from the HTML document
const searchInput = document.querySelector(".recherche-poke input")

// Declare and initialize some variables
let allPokemon = []
let tableauFin = []
const listePoke = document.querySelector('.liste-poke')
const limite = 39
var PokeNombreDebut = 21
var promises = [] // Declare an empty array to store promises

// Define an object that maps Pokemon types to their corresponding colors
var types = {
    bug: '#a8b820',
    dark: '#705848',
    dragon: '#7038f8',
    electric: '#f8d030',
    fairy: '#ee99ac',
    fighting: '#c03028',
    fire: '#f08030',
    flying: '#a890f0',
    ghost: '#705898',
    grass: '#78c850',
    ground: '#e0c068',
    ice: '#98d8d8',
    normal: '#a8a878',
    poison: '#a040a0',
    psychic: '#f85888',
    rock: '#b8a038',
    steel: '#b8b8d0',
    water: '#6890f0',
    immune: '#d6d6d6',
    noteffective: '#fdd0d0',
    veryeffective: '#ccfbcc',
}

// Fetch the list of Pokemon from the API and create an array of promises
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limite}`)
    .then(response => response.json())
    .then((allPoke) => {
        allPoke.results.forEach((pokemon) => {
            promises.push(fetchPokemonComplet(pokemon)
                .catch(error => console.error(error)))
        })
    })
    .then(() => {
        // When all promises have resolved, sort the Pokemon array by ID and slice the first 21 elements
        Promise.all(promises)
            .then(() => {
                tableauFin = allPokemon.sort((a, b) => {
                    return a.id - b.id
                }).slice(0, PokeNombreDebut);
                createCard(tableauFin)
            })
    })

// Define a counter variable to keep track of the number of fetched Pokemon
let counter = 0

// Define a function to fetch complete data for a single Pokemon
function fetchPokemonComplet(pokemon) {
    let objPokemonFull = {}
    let url = pokemon.url
    let nameP = pokemon.name
    return fetch(url)
        .then(response => response.json())
        .then((pokeData) => {
            counter++
            objPokemonFull.pic = pokeData.sprites.front_default
            objPokemonFull.type = pokeData.types[0].type.name // Fix typo
            objPokemonFull.id = pokeData.id
            return fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
                .then(response => response.json())
                .then((pokeData) => {
                    objPokemonFull.name = pokeData.names[4].name // Fix typo
                    allPokemon.push(objPokemonFull)
                })
        })
}

// Define a function to create a card element for each Pokemon in the provided array
function createCard(arr) {
    for(let i = 0; i < arr.length; i++) {
        const carte = document.createElement("li");
        carte.classList.add('hoverableCarte')
        let couleur = types[arr[i].type];
        carte.style.background = couleur
        const txtCarte = document.createElement('h5');
        txtCarte.innerText = arr[i].name
        const idCarte = document.createElement('p')
        idCarte.innerText = `ID# ${arr[i].id}`
        const imgCarte = document.createElement('img')
        imgCarte.src = arr[i].pic

        carte.appendChild(imgCarte)
        carte.appendChild(txtCarte)
        carte.appendChild(imgCarte)

        listePoke.appendChild(carte)

    }
}
fetchPokemonBase()