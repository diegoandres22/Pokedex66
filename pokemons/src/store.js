// import Vue from "vue";
import Vuex from 'vuex'

// Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        pokemonsFavorites: []
    },
    mutations: {
        addFavorite(state, poke) {
            let cont = [...state.pokemonsFavorites, poke]
             state.pokemonsFavorites = cont
        }
    },
    actions: {
        addFavorite(context, poke){
            context.commit("addFavorite", poke)
        }
    },
    getters: {

    }
})