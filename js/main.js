"use strict";

const cardContainer = document.querySelector("#pokemon-card-container");

let currentPage = 1;

const loadCards = async (page, container) => {
    const pageData = await getPage(page);

    const cards = await Promise.all(pageData.results.map(createCard));

    container.replaceChildren(...cards);
};

const getPage = async (page) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon?offset=${(page-1)*20}&limit=20`;

    const res = await fetch(endpoint);
    const data = await res.json();

    return data;
}

const createCard = async (cardData) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const pokemon = await getPokemon(cardData.name);

    card.innerHTML = `
        <div class="card-detail"></div>
        <div class="card-content">
            <div>
                <span id="pokemon-id">#${pokemon.id}</span>
                <span id="pokemon-name">${pokemon.name}</span>
            </div>

            <div class="type-tag-container">
                <span class="type-tag type-tag-fire">Fire</span>
                <span class="type-tag type-tag-fire">Fire</span>
                <span class="type-tag type-tag-fire">Fire</span>
                <span class="type-tag type-tag-fire">Fire</span>
            </div>
        </div>
        <div class="card-img-container">
            <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
        </div>
    `;

    return card;
}

const getPokemon = async (name) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`;

    const res = await fetch(endpoint);
    const data = await res.json();

    return data;
}

loadCards(currentPage, cardContainer);

document.querySelector("#prev-page-btn").addEventListener("click", () => {
    if (currentPage-1 <= 0) {
        document.querySelector("#prev-page-btn").classList.add("disabled");
        return
    };

    currentPage--;
    document.querySelector("#page-index").textContent = currentPage;
    loadCards(currentPage, cardContainer);
})

document.querySelector("#next-page-btn").addEventListener("click", () => {
    currentPage++;
    document.querySelector("#page-index").textContent = currentPage;
    document.querySelector("#prev-page-btn").classList.remove("disabled");
    loadCards(currentPage, cardContainer);
    window.scrollTo({ top: 0, behavior: 'smooth' });
})