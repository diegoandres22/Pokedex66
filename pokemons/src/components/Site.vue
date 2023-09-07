<template>
    <Search></Search>

    <div v-if="this.switch" class="list">

        <transfition name="fade">
            <div class="modal-overlay" v-if="showModal">

            </div>
        </transfition>


        <transition name="fade">
            <div class="modal-cont">
                <div class="modal" v-if="showModal">

                    <button @click="closeModal">Cerrar</button>
                    <img :src="selectedPokemon.img">

                    <div><b>name : </b>{{ selectedPokemon.name }}</div>
                    <br>
                    <div><b>weight : </b>{{ selectedPokemon.weight }}</div>
                    <br>
                    <div><b>height : </b>{{ selectedPokemon.height }}</div>
                    <br>
                    <div><b>types : </b>{{ selectedPokemon.types.join(', ') }}</div>
                </div>
            </div>

        </transition>



        <p v-for=" a  in  pokemons.results " :key="a">
            <button @click="showPokemonModal(a)">{{ a['name'] }}</button>
            <button @click="handlerFav(a.name)">❤️</button>
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
            showModal: false,
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
        },
        showPokemonModal: async function (pokemon) {

            let pokemonDetail = await fetch('https://pokeapi.co/api/v2/pokemon/' + pokemon.name).then((res) => res.json())
            let types = pokemonDetail.types.map(typeObj => typeObj.type.name);
            
            let objet = {
                img: pokemonDetail.sprites.front_default,
                name: pokemonDetail.name,
                height: pokemonDetail.height,
                weight: pokemonDetail.weight,
                types: types
            }
            console.log(objet.img);
            this.selectedPokemon = objet;
            this.showModal = true;

        }, closeModal() {
            this.showModal = false;
        },

    },

    components: {
        Search
    }
}

</script>

<style>
@import '../assets/Site.css'
</style>
