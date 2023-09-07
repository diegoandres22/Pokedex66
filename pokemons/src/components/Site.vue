<template>
    <Search></Search>

    <div v-if="this.switch" class="list">
        <h1>{{ $store.state.name }}</h1>
        <p v-for=" a  in  pokemons.results " :key="a">{{ a['name'] }} <button @click="handlerFav(a.name)">❤️</button>
        </p>


        <div class="paginate">
            <button v-if="this.cant > 1" @click="paginaBack">back</button>
            <b v-if="this.cant > 1"> {{ this.cant / 20 + 1 }}</b>
            <button @click="paginaNext">Next</button>
        </div>

    </div>
    <div v-if="!this.switch" class="list">
        <h1>favorites</h1>

        <ul>
            <li v-for="(name, index) in $store.state.pokemonsFavorites" :key="index"> {{ name }} </li>
        </ul>

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
            cant: 0,
            pokemons: [],
            pokemonsFavorites: []
        }
    },
    methods: {
        getPokemons: async function () {
            this.pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20').then((res) => res.json())

        },
        switchF() {
            this.switch = 1
        },
        switchT() {
            this.switch = 0
        },
        handlerFav(poke) {

            if (this.pokemonsFavorites.find(p => p === poke)) {
                this.pokemonsFavorites = this.pokemonsFavorites.filter(pok => pok !== poke)
                this.$store.state.pokemonsFavorites = this.pokemonsFavorites

            } else {

                this.pokemonsFavorites = [...this.pokemonsFavorites, poke]
                this.$store.state.pokemonsFavorites = this.pokemonsFavorites
            }
            this.$store.dispatch("addFavorite")
        },
        paginaNext: async function () {
            this.cant += 20
            this.pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?offset=' + this.cant + '&limit=20').then((res) => res.json())

        },
        paginaBack: async function () {
            this.cant -= 20
            this.pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?offset=' + this.cant + '&limit=20').then((res) => res.json())
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
