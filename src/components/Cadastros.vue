<template>
    <div id="professor">
        <h3>{{titulacao}}: {{usuario}} </h3>
    </div>
    <div id="principal">
        <h3>Curso</h3>
        <h3>Turmas</h3>
        <h3>Disciplinas</h3>
        <h3>Planos</h3>
        <h3>Tópicos Ementa</h3>
        <h3>Questões Vinculadas</h3>
        <div class="box">
            <button  @click="selecionaCurso(curso)" v-for="curso in cursos" :key="curso.id" >
                {{curso.nome}}
            </button>
        </div>
        <div class="box">
            <button @click="selecionaTurma(turma)" v-for="turma in turmas" :key="turma.id">
                {{turma.descricao}}
            </button>
        </div>
        <div class="box">
            <button @click="selecionaDisciplina(disciplina)" v-for="disciplina in disciplinas" :key="disciplina.id">
                {{disciplina.descricao}}
            </button>
        </div>
        <div class="box">
            <button @click="selecionaPlano(plano)" v-for="plano in planos" :key="plano.id">
                {{plano.anoLetivo}} ({{plano.periodo}})
            </button>
        </div>
        <div class="box">
            <button @click="selecionaTopico(topico)" v-for="topico in topicos" :key="topico.id">
                {{topico.descricao}}
            </button>
        </div>   
        <div class="box">
            <button v-for="questao in topicoSelecionado.questoes_vinculadas" :key="questao.descricao">
                {{questao.descricao}}
            </button>
        </div>
        <div id="botoes">
            <button class="botao" style="background: #1E65B1;">ATIVAR EDIÇÃO</button>
            <button class="botao" style="background: #F05130;">SALVAR</button>
            <button class="botao" style="background: #B31E39;">IMPRIMIR</button>
        </div>
    </div>
    <div v-if="!!topicoSelecionado.descricao">
        <select @change="selecionaQuestao($event)">
            <option value="">Selecione uma Questão</option>
            <option v-for="questao in questoes" :value="questao.id" :key="questao.id">{{questao.descricao}}</option>
        </select>
        <pre>{{questaoSelecionada}}</pre>
        <button @click="vincularQuestao()">Vincular questão</button>
    </div>

    <div> <button type="button" @click="$router.push('/home')" class="btn btn-info text-white mt-2 me-2">Voltar</button></div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import { HttpService } from '../services/http_service'

    export default {
        name: 'Cadastros',
        props: {
            usuario: String,
            titulacao: String,
        },
        data () {
            return {
                turmas: [],
                disciplinas: [],
                planos: [],
                topicos: [],
                cursoSelecionado: {},
                turmaSelecionada: {},
                disciplinaSelecionada: {},
                planoSelecionado: {},
                topicoSelecionado: {},
                questaoSelecionada: null
            }
        },
        computed: {
            ...mapState(['questoes']),
            ...mapGetters({cursos: 'cursosFiltrados'})
        },
        methods: {
            ...mapActions([
                'atualizarCurso',
                'carregarCursos',
                'carregarQuestoes'
            ]),
            async selecionaCurso(curso) {
                this.turmas = [];
                this.disciplinas = [];
                this.planos = [];
                this.topicos = [];

                this.turmaSelecionada = {};
                this.disciplinaSelecionada = {};
                this.planoSelecionada = {};
                this.topicoSelecionado = {};
                this.questaoSelecionada = null;

                this.cursoSelecionado = curso;

                this.turmas = await HttpService.get(`cursos/${curso.id}/turmas`);
            },
            async selecionaTurma(turma) {
                this.disciplinas = [];
                this.planos = [];
                this.topicos = [];

                this.disciplinaSelecionada = {};
                this.planoSelecionada = {};
                this.topicoSelecionado = {};
                this.questaoSelecionada = null;

                this.turmaSelecionada = turma;

                this.disciplinas = await HttpService.get(`cursos/${this.cursoSelecionado.id}/turmas/${turma.id}/disciplinas`);
            },
            async selecionaDisciplina(disciplina) {
                this.planos = [];
                this.topicos = [];

                this.planoSelecionada = {};
                this.topicoSelecionado = {};
                this.questaoSelecionada = null;

                this.disciplinaSelecionada = disciplina;

                this.planos = await HttpService.get(`cursos/${this.cursoSelecionado.id}/turmas/${this.turmaSelecionada.id}/disciplinas/${disciplina.id}/planos`);
            },
            async selecionaPlano(plano) {
                this.topicos = [];

                this.topicoSelecionado = {};
                this.questaoSelecionada = null;

                this.planoSelecionada = plano;

                this.topicos = await HttpService.get(`cursos/${this.cursoSelecionado.id}/turmas/${this.turmaSelecionada.id}/disciplinas/${this.disciplinaSelecionada.id}/planos/${plano.id}/topicos`);
            },
            selecionaTopico(topico) {
                this.questaoSelecionada = null;
                this.topicoSelecionado = topico;
            },
            selecionaQuestao(event) {
                this.questaoSelecionada = event.target.value;
            },
            vincularQuestao() {
                if (!this.questaoSelecionada) {
                    return alert('Selecione uma questão...');
                }
                this.atualizarCurso({
                    topico: this.topicoSelecionado, 
                    questao_id: this.questaoSelecionada
                });

                // this.disciplinaSelecionada = {};
                // this.topicoSelecionado = {};
                // this.questaoSelecionada = null;
                // this.cursoSelecionado = {};
            }
        },
        mounted() {
            this.carregarCursos();
            this.carregarQuestoes();
        },
    }
</script>

<style scoped>
    * {
        text-align: center;
    } 
    #professor{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
    }
    #principal {
        display: grid;
        grid-template: 
        "titulos" 30px
        "conteudo" 160px/ 1fr 1fr 1fr 1fr 0.5fr;
        grid-gap: 0 10px;
        align-items: center;
        padding: 0 20px;
    }
    #botoes{
        display: flex;
        height: 150px;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        grid-row-start: 2 ;
    }
    .box{
        display: flex;
        border: solid 2px rgba(116, 113, 113, 0.7);
        overflow: auto;
        border-radius: 20px;
        height: 140px;
        grid-row-start: 2;
        flex-direction: column;
        text-align: left;
    }
    .box > button{
        margin-left: 15px;
        margin-top: 4px;
        font-weight: bold;
        color: rgb(87, 85, 85);
        border: none;
        background-color: transparent;
        text-align: left;
        font-size: 15px;
        width: 90%;
    }

    .box > button:hover{
        color:rgb(48, 47, 47);
        transform: scale(1.01);
    }

    h3{
        font-weight: 900;
    }

    .botao{
        padding: 10px;
        border-radius: 10px;
        width: 150px;
        color: white;
        font-weight: bold;
        border: none;
        cursor: pointer;
    }

    .botao:hover{
        transform: scale(1.05);
        opacity: 0.9;
    }

</style>