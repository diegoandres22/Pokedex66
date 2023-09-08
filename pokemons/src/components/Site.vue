<template>
    <Search></Search>

    <div v-if="this.switch" class="list">
        <!-- RESULTADOS DE LA BÚSQUEDA -->
        <div class="list" v-if="$store.state.pokemonFinded.length == 1">

            <p v-for=" a in $store.state.pokemonFinded " :key="a">
                <button class="nameOfP" @click="showPokemonModal(a)">{{ a['name'] }}</button>

                <button v-if="!$store.state.pokemonsFavorites.includes(a.name)" class="like" @click="handlerFav(a.name)"><i
                        class='bx bxs-star'></i></button>

                <button v-if="$store.state.pokemonsFavorites.includes(a.name)" class="like2" @click="handlerFav(a.name)"><i
                        class='bx bxs-star'></i></button>
            </p>
        </div>


        <transfition name="fade">
            <div class="modal-overlay" v-if="showModal">

            </div>
        </transfition>

        <transition name="fade">
            <div class="modal-cont">
                <div class="modal" v-if="showModal">

                    <img alt="fondo modal" src="../assets/fondoModal.png" class="fondoFoto">

                    <button class="cerrar" @click="closeModal"><i class='bx bxs-x-circle'></i></button>

                    <img :src="selectedPokemon.img" class="fotoPoke">

                    <div class="infoPoke">
                        <div><b>name : </b> {{ selectedPokemon.name }}</div>

                        <div><b>weight : </b> {{ selectedPokemon.weight }}</div>

                        <div><b>height : </b> {{ selectedPokemon.height }}</div>

                        <div><b>types :</b> {{ selectedPokemon.types.join(', ') }}</div>
                    </div>

                    <div class="accionModal">
                        <!-- <button class="share"> Share to my friends</button> -->
                        <button class="share" @click="copiarAlPortapapeles(selectedPokemon)">Share to my friends</button>

                        <button v-if="!$store.state.pokemonsFavorites.includes(selectedPokemon.name)" class="like"
                            @click="handlerFav(selectedPokemon.name)"><i class='bx bxs-star'></i></button>

                        <button v-if="$store.state.pokemonsFavorites.includes(selectedPokemon.name)" class="like2"
                            @click="handlerFav(selectedPokemon.name)"><i class='bx bxs-star'></i></button>
                    </div>
                </div>
            </div>
        </transition>
        <!-- LISTA DE POKEMONES-->
        <div class="list" v-if="$store.state.pokemonFinded.length == 0">
            <p v-for=" a  in  pokemons.results " :key="a">

                <button class="nameOfP" @click="showPokemonModal(a)">{{ a['name']
                }}</button>

                <button v-if="!$store.state.pokemonsFavorites.includes(a.name)" class="like" @click="handlerFav(a.name)"><i
                        class='bx bxs-star'></i></button>

                <button v-if="$store.state.pokemonsFavorites.includes(a.name)" class="like2" @click="handlerFav(a.name)"><i
                        class='bx bxs-star'></i></button>

            </p>
        </div>

        <!-- ERROR EN LA BUSQUEDA-->
        <div class="errorcontent" v-if="$store.state.pokemonFinded.length == 3">

            <p class="errorFirstP">Uh-oh!</p>

            <p class="errorSecondP">You look lost on your journey!</p>

            <div class="errorButtonCont">
                <button @click="switchF"> Go back home</button>
            </div>

        </div>


        <div class="paginate" v-if="$store.state.pokemonFinded.length == 0">

            <button class="paginadoButton" v-if="this.cant > 1" @click="paginaBack"><i
                    class='bx bx-chevron-left'></i></button>

            <b class="numeroDePagina" v-if="this.cant > 1"> {{ this.cant / 20 + 1 }}</b>
            <button class="paginadoButton" @click="paginaNext"><i class='bx bx-chevron-right'></i></button>
        </div>

    </div>

    <!-- FAVORITOS -->
    <div v-if="!this.switch" class="list listFav">

        <p v-for=" name  in $store.state.pokemonsFavorites " :key="name">

            <button v-if="name !== undefined" class="nameOfP" @click="showPokemonModal(name)">
                {{ name }}
            </button>

            <button v-if="name !== undefined && !$store.state.pokemonsFavorites.includes(name)" class="like"
                @click="handlerFav(name)"><i class='bx bxs-star'></i></button>

            <button v-if="name !== undefined && $store.state.pokemonsFavorites.includes(name)" class="like2"
                @click="handlerFav(name)"><i class='bx bxs-star'></i></button>

        </p>

    </div>

    <div class="buttons" v-if="this.switch">
        <button class="gris" @click="switchF"> <i class='bx bx-menu'></i> All </button>

        <button class="rojo" @click="switchT">
            <i class='bx bxs-star'></i> Favorites</button>
    </div>
    <div class="buttons" v-if="!this.switch">
        <button class="rojo" @click="switchF"> <i class='bx bx-menu'></i> All </button>

        <button class="gris" @click="switchT">
            <i class='bx bxs-star'></i> Favorites</button>
    </div>
    <!--PANTALLA DE CARGA -->
    <div v-if="loading" class="loaContent">
        <img src="../assets/poke2bol.png" alt="">
    </div>
</template>
  
<script>

import Search from "./Search.vue";
import VueClipboard from 'vue-clipboard2';


export default {
    name: 'SearchComponent',
    mounted() {
        this.getPokemons()

    },
    data() {
        return {
            switch: 1,
            cant: 0,
            showModal: false,
            pokemons: [],
            pokemonsFavorites: [],
            loading: true
        }
    },
    methods: {
        getPokemons: async function () {
            this.pokemons = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20').then((res) => res.json())
            this.loading = false
        },
        switchF() {
            this.switch = 1
            this.$store.state.pokemonFinded = []
            this.$store.dispatch("pokeFinded")
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
            console.log(this.$store.state.pokemonsFavorites);
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
            this.selectedPokemon = objet;
            this.showModal = true;

        },
        closeModal() {
            this.showModal = false;
        },
        copiarAlPortapapeles(pokemon) {

            const textoACopiar = `${pokemon.name}, weight: ${pokemon.weight}, height: ${pokemon.height}, types: ${pokemon.types.join(', ')}`;

            const inputTemporal = document.createElement('input');

            inputTemporal.setAttribute('value', textoACopiar);

            document.body.appendChild(inputTemporal);

            inputTemporal.select();

            inputTemporal.setSelectionRange(0, 99999);

            document.execCommand('copy');

            document.body.removeChild(inputTemporal);

            alert('¡Nombre y atributos de Pokémon copiados al portapapeles!');
        },

    },
    components: {
        Search
    },
    directives: {
        clipboard: VueClipboard,
    }
}

</script>

<style>
@import '../assets/Site.css'
</style>
