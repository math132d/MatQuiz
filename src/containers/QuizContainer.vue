<template>
    <div>
        <h3>QuizContainer {{_quiz_id}}</h3>
        <div class="fill aligner">
            <div v-if="isLoading || !isOk"><p>Loading</p></div>
            <router-view v-else></router-view>
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
      answers: [],
      questionId: 0,
      isLoading: true,
      isOk: true
    }
  },
  methods: {
    nextQuestion: function () {
      // TODO push answers from current question to global answer list
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
  created: async function () {
    this.quiz = await this.fetchQuiz()
    this.isLoading = false

    this.answers = this.quiz.questions.map((question) => {
      return new Array(question.answers.length).fill('')
    })
  }
}
</script>

<style scoped>

</style>
