<template>
    <div>
      <transition mode="out-in" name="question">
        <form :key="questionId" @submit.prevent="verifyQuestion()" class="question-container" autocomplete="off">
          <div class="top">
            <template v-for="word in question.sentence.split(' ')" >
              <template v-if="word == '_'">
                <quiz-input :key="getInputId()" ref="input" :placeholder="question.placeholders[getInputId()]" />
                {{incrementInputId()}}
              </template>
              <template v-else>
                {{word}}
              </template>
            </template>
          </div>
          <div class="bottom">
            <button type="button" class="info"><i class="material-icons">info_outline</i></button>
            <button type="submit" class="verify" >
              <template v-if="isQuestionCorrect" >
                <i class="material-icons">arrow_forward</i>
              </template>
              <template v-else >
                <i class="material-icons">done</i>
              </template>
            </button>
          </div>
        </form>
      </transition>
   </div>
</template>

<script>
export default {

  inputId: 0,

  props: [
    'question',
    'questionId'
  ],

  methods: {
    getInputId: function(){
      return this.inputId
    },
    incrementInputId: function(){
      this.inputId++;
    }
  },
}
</script>

<style scoped>

</style>
