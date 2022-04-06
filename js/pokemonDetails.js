"use strict";

import { getURLParam } from "./getUrlParams.js";
import { getPokemon, getPokemonHabitat, getPokemonSpecie, getPokemonWeakness, getTypeTagsHTML } from "./pokemon.js";

const pokemonName = getURLParam("name");

/**
 * Responsavel por popular a pagina de detalhes do pokemon
 */
const renderDetails = async () => {
	const pokemon = await getPokemon(pokemonName);
	const pokemonSpecie = await getPokemonSpecie(pokemon.species.name);

	/*
	 * o bloco de codigo abaixo pega o habitat do pokemon atravez do atributo habitat dentro de pokemonSpecie,
	 * as vezes esse atributo não existe então quando o atributo não existir a variavel recebe um objeto de habitat
	 * desconhecido
	 */
	const pokemonHabitat = pokemonSpecie.habitat
		? await getPokemonHabitat(pokemonSpecie.habitat.name)
		: { name: "unknown" };

	// pegando o html das tags do tipo do pokemon
	const pokemonTypeTags = pokemon.types.map((pokemonType) => getTypeTagsHTML(pokemonType.type.name));

	// pegando as fraquesas do pokemon
	const pokemonWeaknes = await Promise.all(getPokemonWeakness(pokemon));

	// transformando as fraquesas do pokemon em html
	const pokemonWeaknesTags = pokemonWeaknes.map((type) => getTypeTagsHTML(type.name));

	// populando pagina
	document.querySelector("#pokemon-img").setAttribute("src", pokemon.sprites.other.home.front_default);
	document.querySelector("#pokemon-id").textContent = `#${pokemon.id}`;
	document.querySelector("#pokemon-name").textContent = pokemon.name;
	document.querySelector("#stat-height").textContent = `${pokemon.height / 10}m`;
	document.querySelector("#stat-weight").textContent = `${pokemon.weight / 10}kg`;
	document.querySelector("#stat-habitat").textContent = pokemonHabitat.name;
	document.querySelector("#stat-base-exp").textContent = pokemon.base_experience;

	document.querySelector("#types-container").innerHTML = pokemonTypeTags.join("");
	document.querySelector("#weakness-container").innerHTML = pokemonWeaknesTags.join("");
};

window.addEventListener("load", renderDetails);
