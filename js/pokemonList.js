"use strict";

import { getURLParam } from "./getUrlParams.js";


/**
 * Função responsavel por renderizar os cards dos pokemons no container passado como parametro
 * 
 * @param container
 */
const loadCards = async (container) => {
    const currentPage = getURLParam("page") || 1;
    const pageData = await getPageContent(currentPage);

    const cards = await Promise.all(pageData.results.map(createCard));

    container.replaceChildren(...cards);
};

/**
 * Faz uma requisição na api e retorna os pokemons que devem ser exibidos na pagina
 * 
 * @param page  pagina que sera mostrada
 * @returns Objeto Javascript com a resposta da api contendo todos os pokemons da pagina 
 */
const getPageContent = async (page) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon?offset=${(page-1)*20}&limit=20`;

    const res = await fetch(endpoint);
    const data = await res.json();

    return data;
}

/**
 * Responsavel por criar o Html de cada card
 * 
 * @param   cardData    
 * @returns card
 */
const createCard = async (cardData) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const pokemon = await getPokemon(cardData.name);

    const typeTags = pokemon.types.map(renderTypeTags);

    card.innerHTML = `
        <div class="card-detail"></div>
        <div class="card-content">
            <div>
                <span id="pokemon-id">#${pokemon.id}</span>
                <span id="pokemon-name">${pokemon.name}</span>
            </div>

            <div class="type-tag-container">
                ${typeTags.join("")}
            </div>
        </div>
        <div class="card-img-container">
            <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
        </div>
    `;

    return card;
}

/**
 * Faz uma requisição na api para pegar detalhes sobre o pokemon
 * 
 * @param   name    Nome do pokemon 
 * @returns         dados do pokemon
 */
const getPokemon = async (name) => {
    const endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`;

    const res = await fetch(endpoint);
    const data = await res.json();

    return data;
}

/**
 * Retorn o html de cada tag de tipo do pokemon passado como parametro
 * 
 * @param pokemon 
 * @returns 
 */
const renderTypeTags = (pokemon) => {
    const type = pokemon.type.name;

    return `
        <span class="type-tag type-tag-${type}">${type}</span>
    `;

}

const cardContainer = document.querySelector("#pokemon-card-container");
loadCards(cardContainer);

