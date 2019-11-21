<template>
    <div class="popover container aligner">
        <input class="input input-sm" placeholder="quiz id" type="text" v-model="inputValue">
        <button class="aligner button button-sm button-primary" @click="routeToQuiz(inputValue)" >
          <i class="material-icons">arrow_forward</i>
        </button>
    </div>
</template>

<script>
export default {
  data: function () {
    return {
      inputValue: ''
    }
  },
  methods: {
    routeToQuiz: function (quizId) {
      if (quizId.length > 0) {
        this.$router.push({ name: 'quiz', params: { _quiz_id: quizId } })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .popover {
        z-index: 2;
        position: absolute;
    }
</style>
