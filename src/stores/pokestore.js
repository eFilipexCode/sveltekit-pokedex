import { writable } from "svelte/store";

export const pokemon = writable([]);

export const fetchPokemon = async (num = 150) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${num}`;
    const dataFromApi = await fetch(url)
        .then(data => data.json());

    const loadedPokemon = dataFromApi.results.map((data, index) => {
        return {
            name: data.name,
            id: index + 1,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }
    });
    pokemon.set(loadedPokemon);
};