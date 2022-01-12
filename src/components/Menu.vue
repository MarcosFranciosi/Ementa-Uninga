<template>   
 <div class="page">
  <nav class="page__menu menu">
    <ul class="menu__list r-list">
      <li><router-link class="menu__link r-link text-underlined" to="/home" tag="li">Home</router-link></li>
      <li><router-link class="menu__link r-link text-underlined" to="/cadastro-ementa" tag="li">Cadastrar Ementa</router-link></li>
      <li><router-link class="menu__link r-link text-underlined" to="/cadastrar-prova" tag="li">Cadastrar Prova</router-link></li>
      <li><router-link class="menu__link r-link text-underlined" to="/cadastro" tag="li">Visualizar</router-link></li>
      <li><a class="menu__link r-link text-underlined" v-if="!!usuario_logado.id" href="#" @click="logout">Sair</a></li>
    </ul>
  </nav>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'Menu',
    computed: {
      ...mapState(['usuario_logado'])
    },
    methods: {
      ...mapActions(['logout'])
    }
}
</script>

<style>

.r-link[href]{
  color: var(--rLinkColor) !important;
}

.r-list{
  padding-left: var(--rListPaddingLeft, 0) !important;
  /* margin-top: var(--rListMarginTop, 0) !important; */
  margin-bottom: var(--rListMarginBottom, 0) !important;
  list-style: var(--rListListStyle, none) !important;
}

.menu{
  --rLinkColor: var(--menuLinkColor, currentColor);
}

.menu__link{
  display: var(--menuLinkDisplay, block);
  text-decoration: none;
  /* color: black; */
}

.menu:hover .menu__link:not(:hover){
  --rLinkColor: var(--menuLinkColorUnactive, rgba(22, 22, 22, .35));
}

.menu{
  background-color: var(--menuBackgroundColor, #FAFAFA);
  box-shadow: var(--menuBoxShadow, 0 1px 3px 0 rgba(0, 0, 0, .12), 0 1px 2px 0 rgba(0, 0, 0, .24));
}

.menu__list{
  display: flex;  
}

.menu__link{
  padding: var(--menuLinkPadding, 1.5rem 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
}

.text-underlined{
  position: relative;
  overflow: hidden;
  will-change: color;
  transition: color .25s ease-out;  
}

.text-underlined::before, 
.text-underlined::after{
  content: "";
  width: 0;
  height: 3px;
  background-color: var(--textUnderlinedLineColor, currentColor);
  will-change: width;
  transition: width .1s ease-out;
  position: absolute;
  bottom: 0;
}

.text-underlined::before{
  left: 50%;
  transform: translateX(-50%); 
}

.text-underlined::after{
  right: 50%;
  transform: translateX(50%); 
}

.text-underlined:hover::before, 
.text-underlined:hover::after{
  width: 100%;
  transition-duration: .2s;
}

.page{
  margin-bottom: 10px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.308);
}

.page__menu {
    width: 100%;
    justify-content: center;
    display: flex;
}

@media screen and (max-width: 1366px){
  .menu__link{
    padding: var(--menuLinkPadding, 0.9rem 2.5rem);
    font-weight: 700;
    text-transform: uppercase;
  }
}

</style> 

