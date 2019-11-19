<template>
    <span class="input-container">

        <transition name="fade" mode="out-in">
          <p v-if="isDone && !isValid" class="answer" :style="{width: (inputWidth+2) + 'ch'}">
            <span>
              {{firstAnswer}}
            </span>
          </p>

          <input
            class="inline-input"
            name="answer"
            type="text"

            v-else
            v-model="value"

            :style="{width: (inputWidth+2) + 'ch'}"

            :placeholder="placeholder"
            :valid="isValid"
            :invalid="isValid==false"
            :disabled="isValid || isDone"
          />
        </transition>

        <svg preserveAspectRatio="none" viewBox="0 0 32 7" class="underline">
          <line x1="1" y1="4" x2="31" y2="4"/>
          <line x1="1" y1="4" x2="31" y2="4" class="focus"/>
          <line x1="1" y1="4" x2="31" y2="4" class="correct"/>
          <line x1="1" y1="4" x2="31" y2="4" class="incorrect"/>
        </svg>

      </span>
</template>

<script>
export default {
  props: ['placeholder', 'answer', 'isDone'], // Defining variables passed to and used within this component
  data: function () {
    return {
      validState: -1,
      value: ''
    }
  },
  methods: {
    setValid: function (value) {
      this.validState = (value === true) ? 1 : 0
    }
  },
  computed: {
    isValid: function () {
      if (this.validState >= 0) { //Has the input been modified? 
        return this.validState === 1 // Returns the valid state true : false
      } else {
        return null // Returns null if unmodified
      }
    },
    inputWidth: function () { //Returns the length of either the placeholder or the answer, whichever is longest
      return (this.$props.placeholder.length > this.$props.answer.length) ? this.placeholder.length : this.answer.length
    },
    firstAnswer: function () { //Returns the first correct answer if there are multiple correct answers
      return Array.isArray(this.answer) ? this.answer[0] : this.answer
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/assets/scss/const.scss';

    input{
        display: inline-block;
        font-family: Nunito;
        font-size: 1.2rem;
        text-align: center;
        color: $text;

        background-color: transparent;

        border: 0;
        border-radius: 3px;
    }

    .inline-input:focus {
      outline: none;
    }

    .inline-input:focus ~ .underline .focus,
    .inline-input[valid] ~ .underline .correct,
    .inline-input[invalid] ~ .underline .incorrect{
        stroke-dasharray: 30, 30;
        stroke-dashoffset: 0;
    }

    .answer {
      display: inline-block;
      font-family: Nunito;
      font-size: 1.2rem;

      text-align: center;
      vertical-align: baseline;

      color: $background;
    }

    .answer span {
      display: inline-block;
      background-color: $negative;
      border-radius: 3px 3px 0 0;

      font-style: italic;
      padding: 0 4px;

      line-height: 115%;

      transition: height 0.2s ease-out;
    }

    .input-container{
        position: relative;
    }

    .underline {
        position: absolute; left: 0px; bottom: 0px;
        width: 100%;
        height: 2px;
    }

    .underline line {
        stroke: $text;
        stroke-width: 5px;

        opacity: 0.2;
    }

    .underline .focus{
        stroke-dasharray: 0, 100;
        stroke-dashoffset: -15;

        opacity: 1.0;

        transition: all 0.2s;
        transition-timing-function: ease-out;
    }

    .underline .correct{
        stroke: $positive;

        stroke-width: 4px;

        stroke-dasharray: 0, 100;
        stroke-dashoffset: -15;

        opacity: 1.0;

        transition: all 0.2s;
        transition-timing-function: ease-out;
    }

    .underline .incorrect{
        stroke: $negative;
        opacity: 0;

        stroke-width: 4px;

        stroke-dasharray: 0, 100;
        stroke-dashoffset: -15;

        opacity: 1.0;

        transition: all 0.2s;
        transition-timing-function: ease-out;
    }

    // TRANSITIONS

    .fade-enter-active, .fade-leave-active {
      transition: opacity .25s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

</style>
