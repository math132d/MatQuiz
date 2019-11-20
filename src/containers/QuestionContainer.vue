<template>
  <div class="aligner aligner--col">
    <div class="description">
      Translate the English words into their correct Danish Form:
    </div>
    <div class="question container p-2" >
      <template v-for="(chunk, index) in question.sentence.split('_')" >
        <question-input
          v-if="index > 0"
          ref="input"

          :key="index"
          :isDone="isDone"
          :placeholder="question.placeholders[index-1]"
          :answer="question.answers[index-1]"
        />
        {{chunk}}
      </template>
    </div>
  </div>
</template>

<script>
import QuestionInput from '../components/QuestionInput'
import tools from '../lib/tools'

export default {

  props: [
    'question',
    'questionId',
    'isDone'
  ],

  methods: {
    verifyInputs: function () { // Emits true if all unputs are correct, false otherwise
      let questionValid = true
      let questionResponse = []

      this.$refs.input.forEach((component, index) => {
        const inputValid = tools.compareStrings(component.value, this.question.answers[index])

        questionResponse.push(component.value)

        if (!inputValid) { questionValid = false }

        component.setValid(inputValid)
      })

      this.$emit('verify-response', {
        questionValid,
        questionResponse
      })
    }
  },

  components: {
    QuestionInput
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/assets/scss/const.scss';

  .question {
    text-align: center;
    line-height: 1.5;
    font-size: 1.5rem;
  }

  .description {
    padding: 0px 16px;
    color: $gray-600;
    font-size: 1.25rem;
  }

</style>
