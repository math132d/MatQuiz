import Vue from 'vue'
import Router from 'vue-router'

// Import containers
import EntryContainer from './containers/EntryContainer.vue'
import QuizContainer from './containers/QuizContainer.vue'
import QuestionContainer from './containers/QuestionContainer.vue'
import ResultContainer from './containers/ResultContainer.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      name: 'entry',
      path: '/home',
      component: EntryContainer
    },
    {
      name: 'quiz',
      path: '/quiz/:_quiz_id',
      component: QuizContainer,
      children: [
        { path: '', component: QuestionContainer, props: true },
        { path: 'result', component: ResultContainer }
      ]
    }

  ]
})
