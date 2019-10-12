import Vue from 'vue'
import Router from 'vue-router'

// Import containers
import EntryContainer from './containers/EntryContainer.vue'

Vue.use(Router)
export default new Router({
  routes: [
    {
      name: 'entry',
      path: '/home',
      component: EntryContainer,
      children: [
        { path: 'findQuiz', component: FindQuizContainer }
      ]
    },
    {
      name: 'quiz',
      path: '/quiz/:_quiz_id',
      component: QuizContainer,
      children: [
        { path: '', component: QuestionContainer },
        { path: 'result', component: ResultContainer }
      ]
    }

  ]
})
