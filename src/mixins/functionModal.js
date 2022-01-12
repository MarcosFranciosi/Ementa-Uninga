export default {
    methods: {
        btnEnviarModal(btnModal) {
            if(btnModal == 'curso') {
                this.cursoNome = this.cursoEscolha.nome;
                this.coordenador = this.cursoEscolha.coordenador
                this.nomeTurma = ''
                this.nomeDisciplina =''
                this.nomePlano =''
            }
            else if (btnModal == 'turmas') {
                this.nomeTurma = this.nomeTurmaRecebido
                this.nomeDisciplina = ''
            }
            else if (btnModal == 'disciplinas')
                this.nomeDisciplina = this.nomeDisciplinaRecebido
            else if (btnModal == 'planos')
                this.nomePlano = this.nomePlanoRecebido
        },
        cursoSelecionado(curso) {
            this.cursoEscolha = curso
            this.turmaEscolha = this.turmas.filter(turma => turma.cursoId === this.cursoEscolha.id)
        },
        disciplinaSelecionada(disciplina) {
            this.disciplinaId = disciplina.id
            this.nomeDisciplinaRecebido = disciplina.descricao
            if (this.$route.name == 'Cadastrar-Prova')
                this.planoEscolha = this.planos.filter(plano => plano.disciplinaId === this.disciplinaId)
        },
        imprimir() {
            window.print()               
        
        },
        turmaSelecionada(turma){
            this.turmaId = turma.id
            this.nomeTurmaRecebido = turma.descricao
            this.disciplinaEscolha = this.disciplinas.filter(disciplina => disciplina.turmaId === turma.id)
        },
        remover() {
            if(this.qnt > 1)
                this.qnt --
        },
    },
    mounted(){
        this.carregarCursos()
        this.carregarTurmas()
        this.carregarDisciplinas()
        if (this.$route.name == 'Cadastrar-Prova')
            this.carregarPlanos()
    }
}