<template>
    <div>
        <Cadastros :usuario="usuario_logado.nome" :titulacao="usuario_logado.coordenador ? 'Coordenador' : 'Professor'" />
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Cadastros from '../components/Cadastros.vue';

export default {
  name: 'Cadastro',
  components: {
    Cadastros,
  },
  computed: {
    ...mapState(['usuario_logado'])
  }
}
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
  }
  .editor{
    padding: 10px 20px;
  }
   

</style>