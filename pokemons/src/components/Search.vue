<template>
    <div class="site-content">
        <input class="searchbar" placeholder="Search" type="text" v-model="searchInput" @keyup.enter="logSearchInput" >
        <button class="magnifyer" :disabled="searchInput.length === 0" @click="logSearchInput"><i class='bx bx-search-alt-2'></i></button>
    </div>
</template>

<script>

export default {
    name: 'SearchComponent',
    data() {
        return {
            searchInput: ''
        };
    },
    methods: {
        logSearchInput: async function () {

            const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + this.searchInput);
            if (response.ok) {
                const finded = await response.json();
                // const types = finded.types.map(typeObj => typeObj.type.name);

                const objFinded = {
                    name: finded.name,
                    weight: finded.weight,
                    height: finded.height,
                    // types: types
                }

                this.$store.state.pokemonFinded = [objFinded]
            } else {
                this.$store.state.pokemonFinded = ["THERE", "IS", "NOTHING"]
            }

            this.$store.dispatch("pokeFinded")
            this.searchInput = '';

        }
    }
}
</script>
  
<style>
@import '../assets/Search.css'
</style>

  
  
  
  
  