import { getAllPokemon } from "./pokemon.js";

const searchBar = document.querySelector("#searchbar");
const searchForm = document.querySelector("#search-form");
const errorMsg = document.querySelector("#searchbar-error-msg");

const loadDataList = async (e) => {
	const pokemons = await getAllPokemon();

	const datalistOptions = pokemons.map((pokemon) => `<option value="${pokemon}"/ >`);

	console.log;

	document.querySelector("#pokemon-datalist").innerHTML = datalistOptions.join("");
};

/** função chamada quando houver o submit do form de pesquisa */
const onSubmit = async (e) => {
	e.preventDefault();

	// deixando o nome do pokemon em minusculo e sem espaços
	const pokemonName = searchBar.value.toLowerCase().trim();

	// impedindo que o usuario pesquise sem antes preencher o campo de pesquisa
	if (pokemonName == "") return (errorMsg.textContent = "Por favor preencha o campo de pesquisa");

	// apenas pesquisando pokemon caso ele exista
	if (pokemonExists(pokemonName)) {
		window.location.href = `pokemon.html?name=${pokemonName}`;
	} else {
		errorMsg.textContent = "Pokemon não encontrado, por favor confira se você digitou o nome corretamente.";
	}
};

/** verifica se o pokemon existe */
const pokemonExists = async (name) => {
	const pokemons = await getAllPokemon();

	const pokemon = pokemons.filter((poke) => (poke.name = name));
};

window.addEventListener("load", loadDataList);

searchForm.addEventListener("submit", onSubmit);
