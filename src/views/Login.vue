<template>
    <div>
        <Logincmp />
    </div>
</template>

<script>

    import Logincmp from '../components/Logincmp.vue'
    
    export default {
  name: 'Login',
  components: {
    Logincmp,
  }
}


</script>

<style scoped>
*{
    padding: 0;
    margin: 0;
}

div{
    display: flex;
    justify-content: center;
}
</style>