<template>
    <Search></Search>

    <div v-if="this.switch" class="list">
        <p v-for=" a  in  pokemons.results " :key="a">{{ a['name'] }} </p>


        <div class="paginate">
            <button>back</button>
            <b>1</b>
            <b>2</b>
            <b>3</b>
            <button>Next</button>
        </div>

    </div>
    <div v-if="!this.switch" class="list">
        <!-- <p v-for=" a  in  pokemonsFavorites.results " :key="a">{{ a['name'] }} </p> -->
        <h1>favorites</h1>
    </div>

    <div class="buttons">
        <button @click="switchF">All </button>
        <button @click="switchT">Favorites</button>
    </div>
</template>
  
<script>

import Search from "./Search.vue";

export default {
    name: 'SearchComponent',
    mounted() {
        this.getPokemons()
    },
    data() {
        return {
            switch: 0,
            pokemons: [],
            pokemonsFavorites: []
        }
    },
    methods: {
        getPokemons: async function () {
            this.pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20').then((res) => res.json())
            console.log(this.pokemons);

        },
        switchF() {
            this.switch = 1
        },
        switchT() {
            this.switch = 0
        }
    },

    components: {
        Search
    }
}

</script>

<style>
@import '../assets/Site.css'
</style>
