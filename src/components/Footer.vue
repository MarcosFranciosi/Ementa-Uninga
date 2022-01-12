<template>
        <div id="footer">
            <footer>
            <h6>Copyright © Todos os direitos reservados - Proibida cópia de conteúdo sem autorização.</h6>
            </footer>
        </div>
</template>

<script>
    export default {
        name: 'Footer',
    }
</script>

<style scoped>

    footer{
        background: #0f4d91;
        height: 30px;
        width: 100%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
    }
    h6{
        padding: 0;
        margin: 0;
        font-size: 14px;
    }

    @media screen and (max-width: 1366px){
        footer{
            height: 20px;
        }
    }
</style>