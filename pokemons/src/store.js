// import Vue from "vue";
import Vuex from 'vuex'

// Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pokemonsFavorites: [],
        pokemonFinded: []
    },
    mutations: {
        addFavorite(state, poke) {
            let cont = [...state.pokemonsFavorites, poke]
            state.pokemonsFavorites = cont

        },
        pokeFinded(state, poke) {

            state.pokemonFinded = [poke]

            console.log(state.pokemonFinded);
        }
    },
    actions: {
        addFavorite(context, poke) {
            context.commit("addFavorite", poke)
        },

    },
    getters: {

    }
}) 