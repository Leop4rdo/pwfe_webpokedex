"use strict";

import { getURLParam } from "./getUrlParams.js";
import { getPokemon, getPokemonHabitat, getPokemonSpecie, getType, getTypeTagsHTML } from "./pokemon.js";

const pokemonName = getURLParam("name") || name;

/**
 * Responsavel por popular a pagina de detalhes do pokemon
 */
const renderDetails = async () => {
	const pokemon = await getPokemon(pokemonName);
	const pokemonSpecie = await getPokemonSpecie(pokemon.species.name);

	// pegando o habitat do pokemon
	const pokemonHabitat = pokemonSpecie.habitat
		? await getPokemonHabitat(pokemonSpecie.habitat.name)
		: { name: "unknown" };

	// pegando o html das tags do tipo do pokemon
	const pokemonTypeTags = pokemon.types.map((pokemonType) => getTypeTagsHTML(pokemonType.type.name));

	// pegando as fraquesas do pokemon
	const pokemonWeaknes = await Promise.all(getWeakness(pokemon));

	// transformando as fraquesas do pokemon em html
	const pokemonWeaknesTags = pokemonWeaknes.map((type) => getTypeTagsHTML(type.name));

	// populando pagina
	document.querySelector("#pokemon-img").setAttribute("src", pokemon.sprites.other.home.front_default);
	document.querySelector("#pokemon-id").textContent = `#${pokemon.id}`;
	document.querySelector("#pokemon-name").textContent = pokemon.name;
	document.querySelector("#stat-height").textContent = `${pokemon.height / 10}m`;
	document.querySelector("#stat-weight").textContent = `${pokemon.weight / 10}kg`;
	document.querySelector("#stat-habitat").textContent = pokemonHabitat.name;

	document.querySelector("#types-container").innerHTML = pokemonTypeTags.join("");
	document.querySelector("#weakness-container").innerHTML = pokemonWeaknesTags.join("");
};

const getWeakness = (pokemon) => {
	return pokemon.types.map(async (pokemonType, index) => {
		const type = await getType(pokemonType.type.name);

		return type.damage_relations.double_damage_from[index];
	});
};

window.addEventListener("load", renderDetails);
