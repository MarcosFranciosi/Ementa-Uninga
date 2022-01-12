<template>
    <div class="container">
        <div class="text-center fw-bold border rounded border-secondary bg-secondary bg-gradient text-white">
            Cadastro de Provas
        </div>
        <form id="cadastro" @submit.prevent="enviar">
            <div class="row">
                <div class="">
                    <div class="fw-bold border rounded border-secondary text-center">Identificação</div>
                    <div class="row">
                        <div class="input-group col pe-0">
                            <label for="curso" class="input-group-text fw-bold" style="width: 15%">Curso: </label>
                            <input type="text" class="form-control bg-white" readonly="true" v-model="cursoNome" placeholder="Selecione o Curso">
                            <button @click="btnModal= 'curso'" class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#selecioneModal">...</button>
                        </div>
                        <div class="input-group col ps-0">
                            <label for="Série:" class="input-group-text fw-bold" style="width: 15%">Turma: </label>
                            <input type="text" class="form-control" v-model="nomeTurma" placeholder="Selecione a Turma">
                            <button v-if="cursoNome == '' " class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#modalAlerta">...</button>
                            <button v-else @click="btnModal='turmas'" class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#selecioneModal">...</button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-group col pe-0">
                            <label for="Disciplina" class="input-group-text fw-bold" style="width: 15%">Disciplina: </label>
                            <input type="text" class="form-control" v-model="nomeDisciplina" placeholder="Selecione a Disciplina">
                            <button v-if="nomeTurma == '' " class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#modalAlerta">...</button>
                            <button v-else @click="btnModal='disciplinas'" class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#selecioneModal">...</button>
                        </div>
                        <div class="input-group col ps-0">
                            <label for="Prova" class="input-group-text fw-bold" style="width: 15%">Plano: </label>
                            <input type="text" class="form-control" v-model="nomePlano" placeholder="Selecione o Plano">
                            <button v-if="nomeDisciplina == '' " class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#modalAlerta">...</button>
                            <button v-else @click="btnModal='planos'" class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#selecioneModal">...</button>
                        </div>
                    </div>
                    <modalAlerta v-if="cursoNome == '' " descricao = "Selecione o curso"/>
                    <modalAlerta v-else-if="nomeTurma == ''" descricao = "Selecione a Turma"/>
                    <modalAlerta v-else descricao = "Selecione a Disciplina"/>

                    <div class="row">
                    <div class="input-group col pe-0">
                        <label for="Professor" class="input-group-text fw-bold" style="width: 15%">Professor: </label>
                        <input type="text" class="form-control" placeholder="ex.: Prof. Me. Hugo" v-model="Professor">
                    </div>
                    <div class="input-group col ps-0">
                            <label for="Prova" class="input-group-text fw-bold" style="width: 15%">Prova: </label>
                            <input type="text" class="form-control" v-model="nomeProva" placeholder="Selecione a Prova">
                            <button class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#modalAlerta">...</button>
                        </div>
                    </div>

                    <div class="fw-bold border rounded border-secondary mt-3 d-flex flex-row-reverse">
                        <span class="flex-grow-1 text-center p-2 fw-bold border rounded border-secondary bg-secondary bg-gradient text-white">Questões</span>
                        <div style="z-index: 1; position: absolute;">
                            <button type="button" @click="adicionar()" class="btn btn-sm btn-primary fw-bold m-1" > + </button>
                            <button type="button" @click="remover()" class="btn btn-sm btn-danger fw-bold m-1"> - </button>
                        </div>
                    </div>
                    <div v-for="qtd in qtds" :key="qtd" class="mb-3">
                        <div class="row">
                            <div class="input-group col pe-0">
                                <label for="Título:" class="input-group-text fw-bold">Título da Questão:<span class="ms-1" style="color: #0d6efd">#{{qtd}}</span></label>
                                <input type="text" class="form-control" placeholder="Digite o título da questão...">
                            </div>
                            <div class="input-group col ps-0">
                                <label for="Título:" class="input-group-text fw-bold">Tópico Vinculado a Questão: </label>
                                <input type="text" class="form-control bg-white" readonly="true" placeholder="Selecione o Tópico">
                                <button @click="btnModal='topicos'" class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#selecioneModal">...</button>
                            </div>
                        </div>
                        <div class="fw-bold border rounded border-secondary ps-3">Enunciado</div>
                        <textarea class="form-control " aria-label="with textarea" rows="4" placeholder="Digite o enunciado da questão..."></textarea>
                    </div>
                    <button  v-if="!this.cursoNome || !this.nomeTurma || !this.nomeDisciplina || !this.nomeProva" type="button" class="btn btn-primary mt-2 float-end" data-bs-toggle="modal" data-bs-target="#modalAlerta">Salvar</button>
                    <button v-else type="submit" class="btn btn-primary mt-2 mb-5 float-end">Salvar</button>
                    <button type="button" @click="imprimir()" class="btn btn-danger mt-2 me-2 mb-5 float-end">Imprimir</button>
                    <button type="button" @click="$router.back()" class="btn btn-info text-white mt-2 me-2 mb-5 float-end">Voltar</button>
                </div>
            </div>
        </form>
    </div>

    <!----- Modal ----->
    <div class="modal fade" id="selecioneModal" tabindex="-1" aria-labelledby="selecioneModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="alert alert-primary d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                    <h5 v-if="btnModal=='curso'" class="modal-title">Selecione o Curso</h5>
                    <h5 v-if="btnModal=='turmas'" class="modal-title">Selecione a Turma</h5>
                    <h5 v-if="btnModal=='disciplinas'" class="modal-title">Selecione a Disciplina</h5>
                </div>
                <div v-if="btnModal=='curso'" class="modal-body d-flex flex-column ">
                    <button class="btn modalHover" @click="cursoSelecionado(curso)" v-for="curso in cursos" :key="curso.nome">{{curso.nome}}</button>
                </div>
                <div v-if="btnModal=='turmas'" class="modal-body d-flex flex-column">
                    <button class="btn modalHover" @click="turmaSelecionada(turma)" v-for="turma in turmaEscolha" :key="turma.descricao">{{turma.descricao}}</button>
                </div>
                <div v-if="btnModal=='disciplinas'" class="modal-body d-flex flex-column">
                    <button class="btn modalHover" @click="disciplinaSelecionada(disciplina)" v-for="disciplina in disciplinaEscolha" :key="disciplina.descricao">{{disciplina.descricao}}</button>
                </div>
                <div v-if="btnModal=='planos'" class="modal-body d-flex flex-column">
                    <button class="btn modalHover" @click="planoSelecionado(plano)" v-for="plano in planoEscolha" :key="plano.nomePlano">{{plano.nomePlano}}</button>
                </div>
                <div v-if="btnModal=='topicos'" class="modal-body d-flex flex-column">
                    <button class="btn modalHover" disabled @click="topicoSelecionado(topicos)" v-for="topico in topicosEscolha" :key="topico.index"> {{topico}}</button>
                </div>


                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="btnEnviarModal(btnModal)">OK</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import modalAlerta from './ModalAlerta.vue'
import functionsModal from './../mixins/functionModal'

export default {
    name: 'CadastroProva',
    components:{
        modalAlerta,
    },
    data(){
        return{
            Professor: this.usuario,
            qtd: 1,
            qtds: 1,
            cursoNome: '',
            nomeTurma: '',
            nomeDisciplina: '',
            nomeProva: '',
            btnModal: '',
            cursoEscolha: undefined,
            disciplinaEscolha: undefined,
            turmaEscolha: undefined,
            planoEscolha: undefined,
            topicosEscolha: undefined,
            nomePlano: '',
        }
    },
    computed: {
        ...mapState(['cursos', 'turmas', 'disciplinas', 'prova', 'planos', 'topicos'])
    },
    props:{
        usuario: String
    },
    mixins: [
        functionsModal
    ],
    methods:{
        ...mapActions([
            'carregarCursos', 
            'carregarTurmas', 
            'carregarDisciplinas',
            'carregarPlanos',
            'carregarTopicos'
        ]),
        adicionar() {
            this.qtds++
        },
        planoSelecionado(plano){
            this.nomePlanoRecebido = plano.nomePlano
            this.topicosEscolha = this.topicos.filter(topico => topico.planoId === plano.id)
            console.log(this.topicosEscolha.id);
        },
    },
    mounted () {
        this.carregarTopicos()
    }
}
</script>