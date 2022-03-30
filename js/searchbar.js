const searchBar = document.querySelector("#searchbar");
const searchForm = document.querySelector("#search-form");

const onSubmit = async (e) => {
	e.preventDefault();

	const pokemonName = searchBar.value;

	if (await pokemonExists(pokemonName)) {
		window.location.href = `pokemon.html?pokemon=${pokemonName}`;
	} else {
		alert("Pokemon não encontrado, por favor confira se você digitou o nome corretamente.");
	}
};

const pokemonExists = async (name) => {
	const endpoint = `https://pokeapi.co/api/v2/pokemon/${name}`;

	const res = await fetch(endpoint);

	return res.status != "404";
};

searchForm.addEventListener("submit", onSubmit);
