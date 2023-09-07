<template>
    <div class="landing-content">

        <img alt="Pikachu" src="../assets/pikachu.png">
        <h3>Welcome to Pokédex</h3>
        <h5>The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</h5>
        <button>
            <router-link class="buton" to="/site">Get started</router-link>
        </button>
    </div>
</template>
  
<script>

export default {
    name: 'LandingComponent',
    components: {

    }
}
</script>

<style>
@import '../assets/Landing.css'
</style>
