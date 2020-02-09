<template>
    <div class="popover search" @mousedown.stop>
        <div class="suggestions aligner aligner--col">
          <a class="aligner aligner--row" v-for="(el, index) in suggestions" :key="index" href="#" @click.stop="routeToQuiz(el.url)">
            <span>{{el.title}}</span>
            <i class="material-icons">arrow_forward</i>
          </a>
        </div>
        <input @input="fetchSuggestions" class="input" placeholder="quiz id" type="text" v-model="inputValue">
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
    },
    fetchSuggestions: async function (event) {
      const url = `http://${process.env.VUE_APP_HOST}:${process.env.VUE_APP_PORT}/suggestion?value=${this.inputValue}`

      try {
        const response = await fetch(url)
        const json = await response.json()

        this.suggestions = json.suggestions
      } catch (e) {
        console.log('err' + e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/scss/const.scss";

  .search {
    background-color: $gray-100;
    border-radius: 8px;

    box-shadow: 0px -1px 8px rgba(0,0,0,0.1);

    align-content: stretch;
  }

  .search .suggestions {
    align-items: stretch;
  }

  .search .suggestions a {
    padding: 12px;
    font-family: Nunito;
    font-size: 1.8rem;
    font-weight: 500;
    color: $gray-600;

    text-decoration: none;

    transition: background-color 0.2s ease-in-out;

    background-color: transparent;
  }

  .search .suggestions a:hover span,
  .search .suggestions a:focus span{
    text-decoration: underline;
  }

  .search .suggestions a:hover i,
  .search .suggestions a:focus i {
    transform: translate(8px, 0px);
  }

  .search .suggestions a span {
    margin-right: auto;
  }

  .search input {
    margin: 0;
    box-shadow: 0px -1px 8px rgba(0,0,0,0.1);
    background: $gray-100;
  }

  .popover {
      z-index: 2;
      position: absolute;
  }
</style>
