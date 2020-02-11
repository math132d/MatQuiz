<template>
    <div class="aligner aligner--col fill">
        <transition name="slide">
          <find-quiz-container v-show="findActive"/>
        </transition>
        <div class="aligner aligner--row" :class="{ blur : (findActive || createActive) }">
            <button @click="onFindClick" class="button button-primary aligner aligner--col">
              <img src="/images/undraw_searching_p5ux.svg" alt="Searching">
              <p>Search</p>
            </button>
            <button class="button button-secondary aligner aligner--col" disabled>
              <img src="/images/undraw_typewriter_i8xd.svg" alt="Typewriter">
              <p>Create</p>
            </button>
        </div>
    </div>
</template>

<script>
import FindQuizContainer from './FindQuizContainer'

export default {
  data: function () {
    return {
      findActive: false,
      createActive: false
    }
  },
  methods: {
    onFindClick: function () {
      this.findActive = !this.findActive

      if (this.createActive) {
        this.createActive = false
      }
    }
  },

  created: function () {
    document.addEventListener('mousedown', event => {
      this.findActive = false
    })
  },
  
  components: {
    FindQuizContainer
  }
}
</script>

<style lang="scss" scoped>
    @import "../assets/scss/const.scss";

    img {
      width: 96px;
      margin-bottom: 16px;
    }

    button {
      width: 128px;
      height: 128px;
      max-height: none;
      border-radius: 16px;
    }

    button p {
      font-size: 1.2rem;
      font-weight: 600;
    }

    .slide-enter-active, .slide-leave-active {
      transition: all 0.25s ease-in-out;
      opacity: 1;
    }

    .slide-enter, .slide-leave-to {
      transform: translate(0, -100%);
      opacity: 0;
    }

</style>
