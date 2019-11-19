<template>
  <div class="fill aligner aligner--col aligner--space">
    <div class="name container container--top px-4" >{{ _quiz_id.replace(/_/g, " ") }}</div>

      <div v-if="isLoading || !isOk"><p>Loading</p></div>
      <question-container v-else @next-question="nextQuestion" :question="currentQuestion" :questionId="questionId" ></question-container>
      
      <div class="aligner aligner--row" style="padding: 8px;">
        <button class="verifyer aligner button button-primary" style="margin-right: 16px;">
          <div class="aligner aligner--col">
            <p class="primary" >VERIFY ANSWERS</p>
            <p class="secondary" ><strong>5</strong> Attempts Remaining</p>
          </div>
          <i class="material-icons">done</i>
        </button>
        <button class="aligner button button-secondary" ><i class="material-icons">arrow_forward</i></button>
      </div>
  </div>
</template>

<script>
import QuestionContainer from "../containers/QuestionContainer"

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
        this.$router.replace({ name: 'result', params: { _quiz_id: this.$props._quiz_id } })
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

  components: {
    QuestionContainer
  },

  created: async function () {
    this.quiz = await this.fetchQuiz()
    this.isLoading = false

    this.quizResponse = new Array(this.quiz.questions.length)
  }
}
</script>

<style lang="scss" scoped>
  .name {
    text-transform: capitalize;
    font-weight: 600;
  }

  .verifyer .aligner {
    align-items: flex-start;
    line-height: 1.1;
    margin: 8px;
  }

  .verifyer .primary {
    font-weight: 400;
    font-size: 1.5rem;
  }

  .verifyer .secondary {
    font-size: 0.875rem;
  }

  .verifyer .secondary strong{
    font-weight: 600;
  }
</style>
