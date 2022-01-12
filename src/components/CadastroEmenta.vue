<template>
    <div class="container">
        <div class="text-center fw-bold border rounded border-secondary bg-secondary bg-gradient text-white">
            Plano de Ensino
        </div>
        <form id="cadastro">
            <div class="row">
                <div class="col pe-0">
                    <div class="fw-bold border rounded border-secondary text-center ">Identificação</div>
                    <div class="input-group">
                        <label for="curso" class="input-group-text fw-bold w-25">Curso: </label>
                        <input type="text" placeholder="Selecione o Curso" @click="btnModal= 'curso'" class="form-control bg-white" readonly="true" v-model="cursoNome" data-bs-toggle="modal" data-bs-target="#selecioneModal">
                        <button @click="btnModal= 'curso'" class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#selecioneModal">...</button>
                    </div>
                    <div class="input-group">
                        <label for="Série:" class="input-group-text fw-bold w-25">Turma: </label>
                        <input v-if="cursoNome == ''  " type="text" placeholder="Selecione a Turma" @click="btnModal='turmas'"  v-model="nomeTurma" class="form-control" data-bs-toggle="modal" data-bs-target="#modalAlerta" >
                        <input v-else @click="btnModal='turmas'" type="text" placeholder="Selecione a Turma" v-model="nomeTurma" class="form-control" data-bs-toggle="modal" data-bs-target="#selecioneModal" >
                        <button v-if="cursoNome == ''  " class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#modalAlerta">...</button>
                        <button v-else @click="btnModal='turmas'" class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#selecioneModal" >...</button>
                    </div>
                    <div class="input-group">
                        <label for="Disciplina" class="input-group-text fw-bold w-25">Disciplina: </label>
                        <input v-if="nomeTurma == ''" type="text" placeholder="Selecione a Disciplina" class="form-control" v-model="nomeDisciplina" data-bs-toggle="modal" data-bs-target="#modalAlerta">
                        <input v-else type="text" placeholder="Selecione a Disciplina" class="form-control" @click="btnModal='disciplinas'" data-bs-toggle="modal" data-bs-target="#selecioneModal" v-model="nomeDisciplina">
                        <button v-if="nomeTurma == '' " class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#modalAlerta">...</button>
                        <button v-else @click="btnModal='disciplinas'" class="btn btn-outline-secondary fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#selecioneModal">...</button>
                    </div>
                    <modalAlerta v-if="cursoNome == '' " descricao = "Selecione o curso"/>
                    <modalAlerta v-else-if="nomeTurma == ''" descricao = "Selecione a Turma"/>
                    <modalAlerta v-else descricao = "Selecione a Disciplina"/>
                    <div class="input-group">
                        <label for="Professor" class="input-group-text fw-bold w-25">Professor: </label>
                        <input type="text" class="form-control bg-white" readonly="true" v-model="Professor">
                    </div>
                    <div class="input-group">
                        <label for="Coordenador:" class="input-group-text fw-bold w-25">Coordenador: </label>
                        <input type="text" class="form-control bg-white" readonly="true" placeholder="Selecione o Curso" v-model="coordenador">
                    </div>
                    <div class="input-group">
                        <label for="Ano Letivo:" class="input-group-text fw-bold w-25">Ano Letivo: </label>
                        <input type="text" class="form-control" placeholder="ex.: 2021" v-model="plano.anoLetivo">
                        <label for="Modalidade:" class="input-group-text fw-bold w-25">Modalidade: </label>
                        <input type="text" class="form-control" placeholder="ex.: Presencial" v-model="plano.modalidade">
                    </div>
                    <div class="input-group">
                        <label for="Período:" class="input-group-text fw-bold w-25">Período: </label>
                        <input type="text" class="form-control" placeholder="ex.: Noturno" v-model="plano.periodo">
                        <label for="Carga Horaria:" class="input-group-text fw-bold w-25">Carga Horaria: </label>
                        <input type="text" class="form-control" placeholder="ex.: 100 h-a" v-model="plano.cargaHoraria">
                    </div>
                </div>
                <div class="col ps-0">
                    <div class="fw-bold border rounded border-secondary text-center">Objetivo Geral</div>
                    <div class="input-group">
                        <textarea class="form-control p-0" aria-label="with textarea" rows="11" v-model="plano.ObjetivoGeral"></textarea>
                    </div>
                </div>
            </div>
            <div class="fw-bold border rounded border-secondary ps-3 mt-1">Ementa</div>
            <textarea class="form-control p-0" aria-label="with textarea" rows="3"></textarea>
            <div v-if="this.planoId=3">
                <div class="fw-bold border rounded border-secondary ps-3 mt-1">
                        <div class="d-flex">
                            <span class="align-self-center">Conteúdo Programático</span>
                            <button type="button" @click="adicionar()" class="ms-auto btn btn-sm btn-outline-primary fw-bold m-1"> + </button>
                            <button type="button" @click="remover()" class="btn btn-sm btn-outline-danger fw-bold m-1" > - </button>
                        </div>
                </div>
                <div class="row m-0">
                    <div class="col fw-bold border border-secondary text-center p-0 ">Objetivos de Aprendizagem</div>
                    <div class="col-3 fw-bold border border-secondary text-center p-0 ">
                        <div class="d-flex w-5">
                            <span class="ms-2">Conteúdos</span>
                            <button type="button" @click="adicionarItem()" class="ms-auto btn btn-sm btn-outline-primary fw-bold m-1 p-1"> + </button>
                            <button type="button" @click="removerItem()" class="btn btn-sm btn-outline-danger fw-bold m-1 p-1" > - </button>
                        </div>
                    </div>
                    <div class="col-1 fw-bold border border-secondary text-center p-0">C.H.</div>
                    <div class="col fw-bold border border-secondary text-center p-0">Estratégias</div>
                    <div class="col fw-bold border border-secondary text-center p-0">Avaliação</div>
                    <div class="col-1 fw-bold border border-secondary text-center p-0">Referências</div>
                </div>
                <!--<div v-show="qtd > 1"  class="row m-0" v-for="qtd in qnt" :key="qtd" :id="qtd">
                    <textarea rows="5" class="col"></textarea>
                    <label class="col-3 border border-secondary text-center">
                        <p>{{nomeTopico}}</p>
                        //<p v-for="item in conteudoAdd[nomeTopico]" :key="item">{{item}}</p>
                        <p v-for="item in conteudoAdd" :key="item">{{item}}</p>
                    </label>
                    <textarea rows="5" class="col-1"></textarea>
                    <textarea rows="5" class="col"></textarea>
                    <textarea rows="5" class="col"></textarea>
                    <textarea rows="5" class="col-1"></textarea>
                </div> -->
                <div class="row m-0" v-for="qtd in qnt" :key="qtd" :id="qtd">
                    <textarea rows="5" class="col"></textarea>
                    <label class="col-3 border border-secondary text-center">
                        <input type="text" class="form-control" placeholder="Nome do Topico" v-model="nomeTopico" @keyup.enter="addNome" v-show="exibeNome">
                        <p v-show="!exibeNome">{{ nomeTopico }}</p>
                        <p v-for="item in conteudoAdd" :key="item.index">{{ item }}</p>
                        
                        <!-- <input v-for="qtdCont in qntConteudo" :key="qtdCont" type="text" class="form-control mt-1" placeholder="ex.: 1.1 - Ementa" v-model="conteudo[qtdCont]" @keypress.enter="salvaConteudo"> -->
                        <!-- <input v-for="(teste, index) in qntConteudo" :key="teste.index" type="text" class="form-control mt-1" placeholder="ex.: 1.1 - Ementa" v-model="conteudo[index]"> -->
                        <input type="text" class="form-control" placeholder="ex.: 1.1 - Ementa" v-model="conteudo" @keyup.enter="addConteudo">
                    </label>
                    <textarea rows="5" class="col-1"></textarea>
                    <textarea rows="5" class="col"></textarea>
                    <textarea rows="5" class="col"></textarea>
                    <textarea rows="5" class="col-1"></textarea>
                </div>

                <div class="fw-bold border rounded border-secondary ps-3 mt-1">Outros Critérios de Avaliação</div>
                <textarea class="form-control p-0" aria-label="with textarea" rows="3" v-model="plano.outros"></textarea>
                <div class="fw-bold border rounded border-secondary ps-3 mt-1">Observações Gerais</div>
                <textarea class="form-control p-0" aria-label="with textarea" rows="3" v-model="plano.observacao"></textarea>
                <div class="fw-bold border rounded border-secondary ps-3 mt-1">Referências</div>
                <textarea class="form-control p-0" aria-label="with textarea" rows="3" v-model="plano.referencias"></textarea>
                <div class="fw-bold border rounded border-secondary ps-3 mt-1">Validação</div>
                <div class="row m-0">
                    <div class="col fw-bold border rounded border-secondary ps-3">Assinatura do Professor</div>
                    <div class="col fw-bold border rounded border-secondary ps-3">Assinatura do Coordenador</div>
                </div>         
                <div class="row m-0">
                    <textarea class="col form-control p-0" aria-label="with textarea" rows="3"> 
                        
                        Maringá,    /     /</textarea>
                    <textarea class="col form-control p-0" aria-label="with textarea" rows="3">  
                        
                        Maringá,    /     /</textarea>
                </div>
            </div>
            <button v-if="!this.cursoNome || !this.nomeTurma || !this.nomeDisciplina" type="button" class="btn btn-primary mt-2 float-end" data-bs-toggle="modal" data-bs-target="#modalAlerta">Salvar</button>
            <button v-else type="button" @click="enviar" class="btn btn-primary mt-2 mb-5 float-end">Salvar</button>
            <button type="button" @click="imprimir" class="btn btn-danger mt-2 me-2 mb-5 float-end">Imprimir</button>
            <button v-if="btn" type="button" @click="$router.back()" class="btn btn-info text-white mt-2 me-2 mb-5 float-end">Voltar</button>
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
    name: 'CadastroEmenta',
    components: {
        modalAlerta,
    },
    computed: {
        ...mapState(['cursos', 'turmas', 'disciplinas'])
    },
    props: {
        usuario: String
    },
    mixins: [
        functionsModal
    ],
    data() {
        return {
            btn: true,
            btnModal: '',
            conteudo: '',
            coordenador: '',            
            cursoEscolha: undefined,
            cursoNome: '',
            disciplinaEscolha: undefined,
            nomeDisciplina: '',
            nomeTopico: '',
            nomeTurma: '',            
            qnt: 1,
            qntConteudo: 1,
            plano: {},
            planoId: '',
            Professor: this.usuario,
            turmaEscolha: undefined,
            conteudoAdd: [],
            exibeNome: true
        }
    },
    methods: {
        ...mapActions([
            'carregarCursos', 
            'carregarTurmas', 
            'carregarDisciplinas',
            'carregarPlanos',
            'enviarPlano',
            'enviarTopicos'
        ]),
        salvaConteudo() {
            // let id = this.qnt
            // this.conteudoAdd[this.nomeTopico] = Object.assign({}, this.conteudo)
            // this.conteudoAdd[id] = Object.assign({}, {
            //     description: this.nomeTopico,
            //     topicos: Object.assign({}, this.conteudo)
            // })
            // this.adicionarItem()
            // console.log(this.conteudoAdd);

        },
        addNome() {
            this.exibeNome = !this.exibeNome
        },
        addConteudo() {
            this.conteudoAdd.push(this.conteudo)
            console.log(this.conteudoAdd)
        },
        adicionar() {
            this.qnt ++
            this.qntConteudo = 1
            console.log(this.conteudo)
            this.enviarTopicos({
                planoId: 3,
                nomeTopico: this.nomeTopico,
                topico: this.conteudoAdd
            })
            this.nomeTopico = ''
            this.conteudoAdd = []
        },
        adicionarItem() {
            this.qntConteudo ++
        },
        // enviar() {
        //     if (!this.planoId) {
        //         this.enviarPlano({
        //             cursoId: this.cursoEscolha.id,
        //             turmaId: this.turmaId,
        //             disciplinaId: this.disciplinaId,
        //             professor: this.Professor,
        //             plano: this.plano,
        //             nomeTurma: this.nomeTurma,
        //         })
        //     }
        //     else if (this.planoId) {
        //         this.enviarTopicos ({
        //             topicos: this.conteudoAdd,
        //             planoId: this.planoId
        //         })
        //         this.resetar()
        //     }
        // },
        removerItem() {
            if(this.qntConteudo > 1)
                this.qntConteudo --
        },
        resetar() {
            this.coordenador = ''
            this.cursoEscolha = undefined
            this.cursoNome = ''
            this.disciplinaEscolha = undefined
            this.nomeDisciplina = ''
            this.nomeTurma = ''
            this.plano = {}
            this.turmaEscolha = undefined
        },
    },
    watch: {
        '$route'(to) {
            this.planoId = to.params.id
        },

    }
}
</script>

<style scoped>
    .container{
        display: grid;
    }
    .modalHover:hover {
        background-color: #aaa6a667;
    }
</style>
