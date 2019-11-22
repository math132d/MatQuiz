<template>
    <div class="aligner aligner--row">
        <div class="result container p-2 aligner aligner--col">
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
            <div class="score aligner aligner--col" >
              <p>
                <b>
                  {{ `${attemptRatio.remainingAttempts} / ${attemptRatio.maxAttempts}` }}
                </b>
              </p>
              <small>Attempts</small>
              <small>Remaining</small>
            </div>
        </div>
    </div>
</template>

<script>
import tools from '../lib/tools.js'

export default {

  props: ['quiz', 'quizResponse'],

  data: function () {
    return {
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

      this.quizResponse.forEach((response, questionIndex) => {
        response.answers.forEach((responseAnswer, responseIndex) => {
          if (responseAnswer === '') {
            unanswered++
          } else if (tools.compareStrings(responseAnswer, this.quiz.questions[questionIndex].answers[responseIndex])) {
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
      const duration = this.quizResponse.reduce((result, current) => {
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

      let remainingAttempts = this.quizResponse.reduce((total, current) => {
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

    h1 {
      font-size: 2.5rem;
      font-weight: 600;  
    }

    .result {
      animation: breathe 1.5s ease-in-out infinite alternate-reverse;
    }

    .score {
      font-size: 1.25rem;
      line-height: 1.1;
    }

    .grade-visual {
        width: 256; height: 256px;
        margin: 8px auto;
    }

    #gradient .light {
        stop-color: $primary-600;
    }

    #gradient .dark{
        stop-color: $primary-400;
    }

    .grade-visual circle {
        stroke: url(#gradient);
        fill: none;
        stroke-width: 1px;
    }

    .grade-visual .rating {
        filter: drop-shadow(0 0 5px $primary-400);
        stroke-linecap: round;
        stroke-width: 16px;
        stroke-dasharray: 283 283;
        stroke-dashoffset: 283;

        transition: stroke-dashoffset 2.5s ease-in-out;
    }

    .grade-visual text {
        font-weight: bold;
        font-size: 2.5rem;
    }

    @keyframes breathe {
      from {
        transform: scale(1.0);
      }
      to {
        transform: scale(1.05)
      }
    }
  
</style>
