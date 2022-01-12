<template>
    <CadastroEmenta :usuario="usuario_logado.nome" />
</template>

<script>
import { mapState } from 'vuex'

import CadastroEmenta from '../components/CadastroEmenta.vue'

export default {
  components: { 
    CadastroEmenta 
  },
  computed: {
    ...mapState(['usuario_logado'])
  },

}
</script>