<svelte:head>
    <title>Sveltekit Pokedex</title>
</svelte:head>

<script>
    let page = 1;
    $: fetchPokemon(150 * page);
    import { pokemon, pagination, fetchPokemon } from "../stores/pokestore.js";
    import PokemanCard from "../components/pokemanCard.svelte";

    let searchTerm = "";
    let filteredPokemon = [];

    $: {
        if(searchTerm) {
            filteredPokemon = $pokemon.filter(pokeman => pokeman.name.toLowerCase().includes(searchTerm.toLowerCase()));
        } else {
            filteredPokemon = [...$pokemon]
        }
    }

    function nextPage() {
        page++;
    }

</script>

<h1 class="text-4xl text-center my-8 uppercase">Sveltekit Pokedex</h1>
<input bind:value={searchTerm} type="text" placeholder="Search pokemon..." class="w-full roundend-md text-lg p-4 border-2 border-gray-200" />
<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
    {#each filteredPokemon as pokeman}
    <PokemanCard {pokeman} />
    {/each}
</div>
<button on:click={nextPage}>Next</button>