<template>
  <Header />
  <Menu v-if="!!usuario_logado.id" />
  <router-view />
  <Footer />
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import Header from './components/Header.vue'
  import Menu from './components/Menu.vue'
  import Footer from './components/Footer.vue'
  
  export default {
    components: {
      Header,
      Menu,
      Footer,
    },
    computed: {
      ...mapState(['usuario_logado'])
    },
    methods: {
      ...mapActions(['logout'])
    },
  }
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

 @font-face {
    font-family: 'UniNeue';
    src: url('../src/fonts/Fontfabric - UniNeueHeavy.otf') format('opentype');
  }

#app {
  font-family: 'UniNeue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  position: relative;
}

#nav {
  padding: 30px;
  text-align: center;

}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin: 15px
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
