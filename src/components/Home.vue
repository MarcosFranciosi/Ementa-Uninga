<template>
    <div class="usuario">
        <span>{{usuario_logado.nome}}</span>
    </div>      
    <div class="imagem">
        <img src="../assets/bem-vindo.png" alt="">
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'NavBar',
    computed: {
      ...mapState(['usuario_logado'])
    },
}

</script>

<style scoped>

.usuario{
    margin-top: 5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 30px;
    color: #09539e
}

.imagem{
    width: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
    padding: 30px;
}
  
  @media screen and (max-width: 1366px){
   img{
       width: 50%;
       height: 50%;
   }

}
</style>