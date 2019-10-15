<template>
    <div>
        <div class="fill aligner">
            <div v-if="isLoading || !isOk"><p>Loading</p></div>
            <router-view v-else @next-question="nextQuestion" :question="currentQuestion" :questionId="questionId" ></router-view>
        </div>
    </div>
</template>

<script>
export default {
  props: [
    '_quiz_id'
  ],

  data: function () {
    return {
      quiz: {},
      quizResponse: [],
      questionId: 0,
      isLoading: true,
      isOk: true
    }
  },

  methods: {
    nextQuestion: function (questionResponse) {
      this.quizResponse[this.questionId] = questionResponse

      if (this.questionId < this.quiz.questions.length - 1) {
        this.questionId++
      } else {
        this.$router.push({ name: 'result', params: { _quiz_id: this.$props._quiz_id } })
      }
    },
    fetchQuiz: async function () {
      const url = `questions/${this._quiz_id}.json`
      console.log(`Fetching quiz from: ${url}`)
      const response = await fetch(url)

      if (response.ok) {
        return response.json()
      } else {
        this.isOk = false
        console.error(`Response not OK. Fetching ${url} failed`)
      }
    }
  },

  computed: {
    currentQuestion: function () {
      return this.quiz.questions[this.questionId]
    }
  },

  created: async function () {
    this.quiz = await this.fetchQuiz()
    this.isLoading = false

    this.quizResponse = new Array(this.quiz.questions.length)
  }
}
</script>
