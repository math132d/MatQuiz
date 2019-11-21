import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta'

// Import containers
import EntryContainer from './containers/EntryContainer.vue'
import QuizContainer from './containers/QuizContainer.vue'
import QuestionContainer from './containers/QuestionContainer.vue'
import ResultContainer from './containers/ResultContainer.vue'

Vue.use(Router)
Vue.use(VueMeta)

export default new Router({
  routes: [
    {
      name: 'entry',
      path: '',
      component: EntryContainer
    },
    {
      path: '/quiz/:_quiz_id',
      component: QuizContainer,
      props: true,
      children: [
        { name: 'quiz', path: '', component: QuestionContainer, props: true },
        { name: 'result', path: 'result', component: ResultContainer }
      ]
    }

  ]
})
