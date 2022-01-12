import { createStore } from 'vuex'
import { HttpService } from '../services/http_service';

import bcrypt from 'bcryptjs';
import router from '../router';

export default createStore({
  strict: true,
  state: {
    cursos: [],
    turmas: [],
    disciplinas: [],
    questoes: [],
    planos: [],
    usuario_logado: {},
    prova: [],
    topicos: []
  },
  getters: {
    cursosFiltrados(state) {
      const usuarioId = state.usuario_logado.id;
      if (!usuarioId) {
        return [];
      }
      return state.cursos;
      // const cursos = state.cursos;
      // if (state.usuario_logado.coordenador) {
      //   return cursos.filter(curso => curso.coordenador_id === usuarioId);
      // }
      // return cursos.reduce((filtered, el) => {
      //   const curso = Object.assign({}, el);
      //   const disciplinas = curso.disciplinas;
      //   if (disciplinas.some(disciplina => disciplina.professores_id.includes(usuarioId))) {
      //     curso.disciplinas = disciplinas.filter(disciplina => disciplina.professores_id.includes(usuarioId));
      //     filtered.push(curso);
      //   }
      //   return filtered;
      // }, []);
    },
  },
  mutations: {
    VINCULAR_QUESTAO_NO_TOPICO(_, payload) {
      if (!payload.topico.questoes_vinculadas.includes(payload.questao)) {
        payload.topico.questoes_vinculadas.push(payload.questao);
      }
    },
    ALTERAR_CURSOS(state, payload) {
      state.cursos = payload;
    },
    ALTERAR_TURMAS(state, payload){
      state.turmas = payload
    },
    ALTERAR_DISCIPLINAS(state, payload) {
      state.disciplinas = payload
    },
    ALTERAR_QUESTOES(state, payload) {
      state.questoes = payload;
    },
    ALTERAR_USUARIO_LOGADO(state, payload) {
      state.usuario_logado = payload;
    },
    ALTERAR_PLANOS(state, payload) {
      state.planos = payload
    },
    ALTERAR_TOPICOS(state, payload) {
      state.topicos = payload
    },
    ENVIAR_EMENTA(state, payload) {
      payload.plano.push(payload.plano)
    }
  },
  actions: {
    async verificarLogin(context) {
      const request = await fetch("http://localhost:3000/logins")

      const response = await request.json();

      context.commit('LOGIN', response);
      context.dispatch('verficarLogin')
    },

    async carregarCursos(context) {
      const response = await HttpService.get('cursos');
      
      context.commit('ALTERAR_CURSOS', response);
    },
    async carregarTurmas(context) {
      const request = await fetch("http://localhost:3000/turmas");

      const response = await request.json();

      context.commit('ALTERAR_TURMAS', response);
    },
    async carregarDisciplinas(context) {
      const request = await fetch ("http://localhost:3000/disciplinas");

      const response = await request.json();

      context.commit('ALTERAR_DISCIPLINAS', response);
    },
    async carregarQuestoes(context) {
      const response = await HttpService.get('questoes');
      
      context.commit('ALTERAR_QUESTOES', response);
    },
    async carregarPlanos(context) {
      const request = await fetch("http://localhost:3000/planos");

      const response = await request.json();
      
      context.commit('ALTERAR_PLANOS', response);
    },
    async carregarTopicos(context) {
      const request = await fetch("http://localhost:3000/topicos");

      const response = await request.json();
      
      context.commit('ALTERAR_TOPICOS', response);
    },
    
    async atualizarCurso(context, payload) {
      // -----------
      // Este trecho, na prática, seria responsabilidade da API realizar, fizemos dessa forma apenas para simular 
      const topico = JSON.parse(JSON.stringify(payload.topico));

      const questao = context.state.questoes.find(questao => questao.id == payload.questao_id);

      if (!topico.questoes_vinculadas.includes(questao)) {
        topico.questoes_vinculadas.push(questao);
      }
      // -----------

      try {
        await HttpService.put('topicos', topico.id, topico);
        
        context.dispatch('carregarCursos');
        context.commit('VINCULAR_QUESTAO_NO_TOPICO', {topico: payload.topico, questao});
      } catch (error) {
        console.error(error)
        alert('Problemas ao acessar a API');
      }
    },
    async logar(context, payload) {   
      // -----------
      // Este trecho, na prática, seria responsabilidade da API realizar, fizemos dessa forma apenas para simular 
      const usuarios = await HttpService.get('usuarios');
      const usuario = usuarios.find(usuario => {
        const isSameLogin = usuario.login === payload.login;
        if (!isSameLogin) return false;
        const isValidBcryptHash = bcrypt.compareSync(payload.senha, usuario.senha);
        return isValidBcryptHash;
      });

      if (usuario) {
        delete usuario.senha;
      }
      // -----------

      if (!usuario) {
        alert('Usuário e/ou senha inválidos...');
        return
      }

      context.commit('ALTERAR_USUARIO_LOGADO', usuario);

      return usuario;
    },
    logout(context) {
      context.commit('ALTERAR_USUARIO_LOGADO', {});
      router.replace('/');
    },
    async enviarPlano(context, payload) {
      const planoEmenta = JSON.parse(JSON.stringify(payload.plano))
      planoEmenta.professor = payload.professor
      planoEmenta.disciplinaId = payload.disciplinaId;
      planoEmenta.topicos = payload.topicos
      planoEmenta.nomePlano = payload.nomeTurma + ' - ' + payload.plano.anoLetivo

      try {
        // await HttpService.post('planos', planoEmenta);
        const planoSalvo = await HttpService.post('planos', planoEmenta);
        router.push({ name: 'Cadastrar-Ementa', params: {id:`${planoSalvo.id}`} });
        alert('Ementa enviada com sucesso!')
      } catch (error) {
        console.log(error)
        alert('Problemas ao enviar ementa para API')
      }
    },
    async enviarTopicos(context, payload) {
      // const topicosSalvos = JSON.parse(JSON.stringify(payload.topicos))
      const topicosSalvos = {}
      topicosSalvos.planoId = parseInt(payload.planoId)
      topicosSalvos.nomeTopico = payload.nomeTopico
      topicosSalvos.descricao = payload.topico
      await HttpService.post('topicos', topicosSalvos)
    }
  },
  modules: {
  }
})
