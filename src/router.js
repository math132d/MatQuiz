import Vue from 'vue'
import Router from 'vue-router'
import VueMeta from 'vue-meta'

// Import containers
import EntryContainer from './containers/EntryContainer.vue'
import QuizContainer from './containers/QuizContainer.vue'

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
      name: 'quiz',
      path: '/quiz/:_quiz_id',
      component: QuizContainer,
      props: true
    }

  ]
})
