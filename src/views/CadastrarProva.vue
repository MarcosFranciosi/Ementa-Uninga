<template>
  <CadastroProva :usuario="usuario_logado.nome"/>
</template>

<script>
import { mapState } from 'vuex'
import CadastroProva from '../components/CadastrarProva.vue'

export default {
    components: {
        CadastroProva
    },
     computed: {
    ...mapState(['usuario_logado'])
  },
}
</script>