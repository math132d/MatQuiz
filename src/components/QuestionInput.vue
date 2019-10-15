<template>
    <span class="input-container">
        <input class="inline-input" v-model="value" :placeholder="placeholder" :valid="isValid" :disabled="isValid" :invalid="isValid==false" type="text" name="answer" />
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
  props: ['placeholder', 'prevResponse'], // Defining variables passed to and used within this component
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
      if (this.validState >= 0) {
        return this.validState === 1 // Return the state if it is set
      } else {
        return null // And null if it has not yet been modified
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/assets/scss/const.scss';

    input{
        font-family: Nunito;
        font-size: 1.2rem;
        text-align: center;
        color: $text;

        margin: 0px 2px;

        max-width: 6rem;

        background-color: transparent;

        border: 0;
        border-radius: 3px;
    }

    .inline-input:focus ~ .underline .focus,
    .inline-input[valid] ~ .underline .correct,
    .inline-input[invalid] ~ .underline .incorrect{
        stroke-dasharray: 30, 30;
        stroke-dashoffset: 0;
        opacity: 1;
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
        opacity: 0;

        stroke-dasharray: 0, 100;
        stroke-dashoffset: -15;

        transition: all 0.2s;
        transition-timing-function: ease-out;
    }

    .underline .correct{
        stroke: $positive;
        opacity: 0;

        stroke-width: 4px;

        stroke-dasharray: 0, 100;
        stroke-dashoffset: -15;

        transition: all 0.2s;
        transition-timing-function: ease-out;
    }

    .underline .incorrect{
        stroke: $negative;
        opacity: 0;

        stroke-width: 4px;

        stroke-dasharray: 0, 100;
        stroke-dashoffset: -15;

        transition: all 0.2s;
        transition-timing-function: ease-out;
    }
</style>
