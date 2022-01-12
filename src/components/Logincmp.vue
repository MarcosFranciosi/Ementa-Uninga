<template>
    <div id="main">
        <input v-model="login" type="text" placeholder="LOGIN">
        <input v-model="senha" @keyup.enter="logar" type="password" placeholder="SENHA">
        <button  @click="logar">ACESSAR</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: "login",
    data() { 
        return {
            login: '',
            senha: ''
        };
    },

    methods: {
        ...mapActions({'logarAction': 'logar'}),
        async logar() {
            const login = this.login;
            const senha = this.senha;

            if (!login || !senha) {
                return alert('Informe usuário e senha');
            }
            const usuario = await this.logarAction({login, senha});

            if (usuario) {
                this.$router.replace("home");
            }
        }
    },
};
</script>

<style scoped>

    #main{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 3vh;
    }

    button{
        height: 38px;
        margin-top: 15px;
        background: #1E65B1;
        color: #FFFBFB;
        border-radius: 10px;
        width: 294px;
        font-weight: bold;
        border: 1px solid #AAA6A6;
        box-sizing: content-box;
        cursor: pointer;
    }

    input{
        font-weight: bold;
        margin-top: 15px ;
        background: #FAFAFA;
        color: black;
        border-radius: 10px;
        width: 294px;
        height: 38px;
        text-align: center;
        outline: none;        
        border: 1px solid #AAA6A6;
    }

    input:focus::-webkit-input-placeholder {
        color: transparent;
}
    input:focus:-moz-placeholder { /* Firefox 18- */
        color: transparent;  
}
    input:focus::-moz-placeholder {  /* Firefox 19+ */
        color: transparent;  
}
    input:focus:-ms-input-placeholder {  
        color: transparent;  
}

</style> 