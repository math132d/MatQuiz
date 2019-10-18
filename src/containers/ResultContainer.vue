<template>
    <div class="aligner aligner--row container">
        <div class="left">
            <h1>GRADE</h1>
            <svg class="grade-visual" viewBox="0 0 128 128">
                <defs>
                    <linearGradient id="gradient" x1="100%" y1="0" x2="0" y2="0">
                        <stop class="light" offset="0%"/>
                        <stop class="dark" offset="100%"/>
                    </linearGradient>
                </defs>
                <circle cx="64" cy="64" r="45" transform="rotate(-90, 64, 64)"/>
                <circle :style="{'stroke-dashoffset': dashOffset}" class="rating" style="" cx="64" cy="64" r="45" transform="rotate(90, 64, 64)"/>
                <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" >{{grade}}</text>
            </svg>
            <p>
                <strong>
                    {{ `${attemptRatio.remainingAttempts} / ${attemptRatio.maxAttempts}` }}
                </strong> <br>
                Attempts <br>
                Remaining
            </p>
        </div>
        <div class="right">
            <div>
                <p class="hs-display"><span class="badge">1</span> COMPLETION TIME </p>
                <h3 class="time-display" >{{quizDuration()}}s</h3>
            </div>
            <div>
                <p class="hs-display"><span class="badge">2</span> STATS</p>
                <div class="answer-stats">
                    <div class="correct" >  {{getAnswerStats().correct}}    <p>Correct</p>      </div>
                    <div class="incorrect"> {{getAnswerStats().incorrect}}  <p>Incorrect</p>    </div>
                    <div>                   {{getAnswerStats().unanswered}}    <p>Unanswered</p>   </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import tools from '../lib/tools.js'

export default {

  data: function () {
    return {
      quiz: this.$parent.quiz,
      quizResponses: this.$parent.quizResponse,
      dashOffset: 283
    }
  },

  methods: {
    getDashOffset: function () {
      let { maxAttempts, remainingAttempts } = this.attemptRatio
      return 283 - ((remainingAttempts / maxAttempts) * 283)
    },

    getAnswerStats: function () {
      let unanswered = 0
      let correct = 0
      let incorrect = 0

      this.quizResponses.forEach((response, questionIndex) => {
        response.answers.forEach((responseAnswer, responseIndex) => {
          if (responseAnswer === '') {
            unanswered++
          } else if (tools.compareStrings(responseAnswer,this.quiz.questions[questionIndex].answers[responseIndex])) {
            correct++
          } else {
            incorrect++
          }
        })
      })

      return {
        correct,
        incorrect,
        unanswered
      }
    },

    quizDuration: function () {
      const duration = this.quizResponses.reduce((result, current) => {
        return result + current.time
      }, 0)

      return tools.formatSeconds(Math.round(duration / 1000))
    }
  },

  computed: {
    grade: function () {
      const { maxAttempts, remainingAttempts } = this.attemptRatio
      const percent = remainingAttempts / maxAttempts
      const grades = ['A+', 'A', 'B+', 'B', 'C', 'D', 'F']
      const step = 6 - Math.floor(Math.pow(percent, 3) * 6)

      return grades[step]
    },
    attemptRatio: function () {
      let maxAttempts = this.quiz.questions.reduce((total, current) => {
        let attempts = (current.answers.length > 1) ? current.answers.length : 2
        console.log(attempts)
        return total + attempts
      }, 0)

      let remainingAttempts = this.quizResponses.reduce((total, current) => {
        return total + current.remainingAttempts
      }, 0)

      return {
        maxAttempts,
        remainingAttempts
      }
    }
  },

  created: function () {
    setTimeout(() => {
      this.dashOffset = this.getDashOffset()
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
    @import 'src/assets/scss/const.scss';

    .container {
        width: 600px;
        border-radius: 3px;

        justify-content: flex-start;

        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }

    .container .left{
        display: flex;
        flex-direction: column;
        align-items: center;

        background-color: $foreground;
        border: 1px solid darken($foreground, 10%);

        padding: 20px;

        border-radius: 3px 0 0 3px;
    }

    .container .left h2 {
        font-weight: 800;
    }

    .container .left p {
        font-size: 0.6rem;
        line-height: 95%;
        text-align: center;
    }

    .container .right{
        display: flex;
        flex-direction: column;

        padding: 20px;

        align-self: stretch;
        flex-grow: 1;

        background-color: lighten($foreground, 5%);
        border: 1px solid darken($foreground, 5%);
        border-left: none;

        border-radius: 0 3px 3px 0;
    }

    .container .right div {
        flex-grow: 1;
    }

    .grade-visual {
        width: 128; height: 128px;
    }

    #gradient .light {
        stop-color: $positive;
    }

    #gradient .dark{
        stop-color: lighten($positive, 15%)
    }

    .grade-visual circle {
        stroke: url(#gradient);
        fill: none;
        stroke-width: 1px;
    }

    .grade-visual .rating {
        filter: drop-shadow(0 0 5px $positive);
        stroke-width: 16px;
        stroke-dasharray: 283 283;
        stroke-dashoffset: 283;

        transition: stroke-dashoffset 2.5s ease-in-out;
    }

    .grade-visual text {
        font-weight: bold;
        font-size: 2.5rem;
    }

    .hs-display {
      color: $text;
      font-size: 0.7rem;
      vertical-align: middle;

      user-select: none;

      margin: 5px;

      transition: all 0.15s ease-out;
    }

    .time-display {
        color: lighten($text, 40%);
        font-size: 2rem;
        margin-top: 0.6rem;
        margin-left: 2rem;
    }

    .hs-display .badge {
      display: inline-block;
      color: $background;
      background: $text;

      line-height: 1rem;

      width: 1rem; height: 1rem;
      border-radius: 50%;

      font-size: 0.7rem;
      text-align: center;
      font-weight: bold;
    }

    .answer-stats {
        display: flex;
        margin-top: 0.6rem;
        margin-left: 2rem
    }

    .answer-stats div {
        color: lighten($text, 40%);
        font-size: 2rem;
        text-align: center;
        font-weight: 800;
    }

    .answer-stats .correct {
        color: $positive;
    }

    .answer-stats .incorrect {
        color: $negative;
    }

    .answer-stats div p {
        font-size: 0.6rem;
        margin-top: -0.5rem;
        font-weight: lighter;
    }

    .answer-stats .correct p {
        color: darken($positive, 20%)
    }

    .answer-stats .incorrect p {
        color: darken($negative, 20%)
    }
</style>
