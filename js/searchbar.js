const searchBar = document.querySelector("#searchbar");
const searchForm = document.querySelector("#search-form");

import { pokemonExists } from "./pokemon.js";

/** função chamada quando houver o submit do form de pesquisa */
const onSubmit = async (e) => {
	e.preventDefault();

	const pokemonName = searchBar.value;

	if (await pokemonExists(pokemonName)) {
		window.location.href = `pokemon.html?name=${pokemonName}`;
	} else {
		alert("Pokemon não encontrado, por favor confira se você digitou o nome corretamente.");
	}
};

searchForm.addEventListener("submit", onSubmit);
