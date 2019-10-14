<template>
    <div class="popover">
        <input placeholder="quiz id" type="text" v-model="inputValue">
        <button @click="routeToQuiz(inputValue)" >-></button>
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
        position: absolute;
    }
</style>
