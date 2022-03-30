"use strict";

/**
 * Faz uma requisição na api para pegar detalhes sobre o pokemon
 *
 * @param   name    Nome do pokemon
 * @returns         dados do pokemon
 */
export const getPokemon = async (name) => {
	const endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`;

	const res = await fetch(endpoint);
	const data = await res.json();

	return data;
};

/**
 * Retorn o html da tag do tipo passado como parametro
 *
 * @param pokemon
 * @returns
 */
export const getTypeTagsHTML = (type) => {
	//const type = pokemon.type.name;

	return `
        <span class="type-tag type-tag-${type}">${type}</span>
    `;
};

/**
 * Faz uma requisição na api para pegar detalhes sobre a Especie do pokemon
 *
 * @param   name    Nome do pokemon
 * @returns         dados do pokemon
 */
export const getPokemonSpecie = async (name) => {
	const endpoint = `https://pokeapi.co/api/v2/pokemon-species/${name}`;

	const res = await fetch(endpoint);
	const data = await res.json();

	return data;
};

/**
 * Faz uma requisição na api para pegar detalhes sobre o Habitat do pokemon
 *
 * @param   name    Nome do pokemon
 * @returns         dados do pokemon
 */
export const getPokemonHabitat = async (name) => {
	const endpoint = `https://pokeapi.co/api/v2/pokemon-habitat/${name}`;

	const res = await fetch(endpoint);
	const data = await res.json();

	return data;
};

/**
 * Faz uma requisição na api para pegar detalhes sobre o tipo do pokemon
 *
 * @param   name    Nome do pokemon
 * @returns         dados do pokemon
 */
export const getType = async (name) => {
	const endpoint = `https://pokeapi.co/api/v2/type/${name}`;

	const res = await fetch(endpoint);
	const data = await res.json();

	return data;
};

/* verifica se o pokemon existe*/
export const pokemonExists = async (name) => {
	const endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`;

	const res = await fetch(endpoint);

	return res.status != "404";
};

export const getPokemonWeakness = (pokemon) => {
	return pokemon.types.map(async (pokemonType, index) => {
		const type = await getType(pokemonType.type.name);

		return type.damage_relations.double_damage_from[index];
	});
};
