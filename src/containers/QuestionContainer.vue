<template>
    <div>
      <transition mode="out-in" name="question">
        <form class="question-container" :key="questionId" @submit.prevent="verifyQuestion()" autocomplete="off">
          <div class="top">
            <template v-for="word in question.sentence.split(' ')" >
              <template v-if="word == '_'">
                <question-input ref="input" :key="getInputId()" :placeholder="question.placeholders[getInputId()]" />
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
              <template v-if="isVerified" >
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
import QuestionInput from '../components/QuestionInput'

export default {

  inputId: 1,

  data: function () {
    return {
      isVerified: false
    }
  },

  props: [
    'question',
    'questionId'
  ],

  methods: {
    getInputId: function () {
      return this.inputId
    },
    incrementInputId: function () {
      this.inputId++
    },
    verifyQuestion: function () {
      if (this.isVerified) {
        const answers = this.$refs.input.map((input) => {
          return input.value
        })
        this.$emit('next-question', answers)
      } else {
        let questionValid = true

        this.$refs.input.forEach((component, index) => {
          const inputValid = component.value.toLowerCase() === this.question.answers[index]

          if (!inputValid) { questionValid = false }

          component.setValid(inputValid)
        })

        this.isVerified = questionValid
      }
    }
  },

  watch: {
    questionId: function () {
      this.isVerified = false
    }
  },

  components: {
    QuestionInput
  },

  created: function () {
    this.inputId = 0
  },
  beforeUpdate: function () {
    this.inputId = 0
  }
}
</script>

<style lang="scss" scoped>
  @import 'src/assets/scss/const.scss';

  .question-container{
    max-width: 600px;

    border-radius: 3px;

    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  .question-container .top{
    background-color: $foreground;
    border: 1px solid darken($foreground, 10%);
    border-bottom: none;

    border-radius: 3px 3px 0 0;

    padding: 20px;
  }

  .question-container .bottom{
    display: flex;

    background-color: lighten($foreground, 5%);
    border: 1px solid darken($foreground, 5%);
    border-top: none;

    border-radius: 0 0 3px 3px;

    text-align: right;
  }

  .question-container button {
    margin: 0;
    width: 2.2rem;
    height: 2.2rem;
    text-align: center;
    line-height: 50%;
    border: none;

    transition: background-color 0.15s ease-out;
    background:none;
  }

  .question-container .bottom .info{
    color: $text;
    opacity: 0.3;
    transition: opacity 0.15s ease-out;
  }

  .question-container .bottom .info:hover{
    color: $text;
    opacity: 0.6;
  }

  .question-container .bottom .verify{
    margin-left: auto;
    margin-right: -1;
    margin-left: -1;
    color: white;
    border-radius: 0 0 3px 0;
    background-color: $positive;
  }

  .question-container .bottom .verify:focus,
  .question-container .bottom .verify:hover{
    background-color: darken($positive, 10%);
  }

  .question-container .bottom .verify{
    outline-color: lighten($positive, 10%);
    outline-width: 2px;
  }

  .question-container .bottom .verify:focus > i,
  .question-container .bottom .verify:hover > i {
    transform: translate(3px, 0px);
  }

  .question-container .bottom .verify:active > i {
    transform: scale(0.95);
  }
</style>
