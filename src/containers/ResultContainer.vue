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
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" >B</text>
            </svg>
            <p>Attempts <br> Remaining</p>
        </div>
        <div class="right">
            RIGHT
        </div>
    </div>
</template>

<script>
export default {

  data: function () {
    return {
      quiz: this.$parent.quiz,
      quizResponses: this.$parent.quizResponse,
      dashOffset: 330
    }
  },

  methods: {
    getDashOffset: function () {
      let maxAttempts = this.quiz.questions.length * 4
      console.log(maxAttempts)
      let remainingAttempts = this.quizResponses.reduce((total, current) => {
        return total + current.remainingAttempts
      }, 0)
      console.log(remainingAttempts)

      return 330 - ((remainingAttempts / maxAttempts) * 330)
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
        font-weight: 700;
    }

    .container .left p {
        font-size: 0.6rem;
        line-height: 95%;
        text-align: center;
    }

    .container .right{
        align-self: stretch;
        flex-grow: 1;

        background-color: lighten($foreground, 5%);
        border: 1px solid darken($foreground, 5%);
        border-left: none;

        border-radius: 0 3px 3px 0;

        text-align: right;
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
        stroke-dasharray: 330 330;
        stroke-dashoffset: 330;

        transition: stroke-dashoffset 2.5s ease-in-out;
    }

    .grade-visual text {
        font-weight: bold;
        font-size: 2.5rem;
    }

</style>
