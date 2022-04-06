"use strict";

import { getURLParam } from "./getUrlParams.js";
import { getPokemon, getTypeTagsHTML } from "./pokemon.js";

/**
 * Função responsavel por renderizar os cards dos pokemons no container passado como parametro
 *
 * @param container
 */
const loadCards = async (container) => {
	const currentPage = parseInt(getURLParam("page")) || 1;
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
	const endpoint = `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * 20}&limit=20`;

	const res = await fetch(endpoint);
	const data = await res.json();

	return data;
};

/**
 * Responsavel por criar o Html de cada card
 *
 * @param   cardData
 * @returns card
 */
const createCard = async (cardData) => {
	// criando o card
	const card = document.createElement("div");
	card.classList.add("card");

	// recebendo o pokemon
	const pokemon = await getPokemon(cardData.name);

	// recebendo as tags de tipos do pokemon
	const typeTags = pokemon.types.map((pokemonType) => getTypeTagsHTML(pokemonType.type.name));

	// criando conteudo do card e colocando ele dentro do elemento card
	card.innerHTML = `
        <div class="card-detail"></div>
        <div class="card-content">
            <div>
                <span id="pokemon-id">#${pokemon.id}</span>
                <span id="pokemon-name">${pokemon.name}</a></span>
            </div>

            <div class="type-tag-container">
                ${typeTags.join("")}
            </div>
        </div>
        <div class="card-img-container">
            <img src="${pokemon.sprites.other.home.front_default}" alt="${pokemon.name}">
        </div>
    `;

	// criando link que engloba o card
	const cardLink = document.createElement("a");
	cardLink.classList.add("card-link");
	cardLink.href = `./pokemon.html?name=${pokemon.name}`;

	// adicionando animação de fade-up ao card
	card.classList.add("fade-up");

	cardLink.appendChild(card);

	return cardLink;
};

// <a href="./pokemon.html?name=${pokemon.name}"> </a>

const cardContainer = document.querySelector("#pokemon-card-container");
loadCards(cardContainer);
