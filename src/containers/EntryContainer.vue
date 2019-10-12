<template>
    <div class="aligner aligner--col fill">
        <div :class="{ blur : (findActive || createActive) }">
            <button @click="onFindClick" class="big-button"> Find Quiz</button>
            <button class="big-button" disabled> Create Quiz</button>
        </div>
        <find-quiz-container v-if="findActive"/>
    </div>
</template>

<script>
import FindQuizContainer from './FindQuizContainer';

export default {
    data: function(){
        return {
            findActive: false,
            createActive: false,
        }
    },
    methods: {
        onFindClick: function(){
            this.findActive = !this.findActive;

            if(this.createActive){
                this.createActive = false;
            }
        }
    },
    components: {
        FindQuizContainer
    }
}
</script>

<style lang="scss" scoped>
    @import "../assets/scss/const.scss";

    div {
        transition: all 0.2s;
    }

    .blur {
        opacity: 0.3;
    }

    .big-button {
        width: 5rem;
        height: 5rem;

        margin: 1rem;

        color: $text;
        font-size: 1.2rem;
        font-family: inherit;

        border: solid $positive 1px;
        border-radius: 5px;
        background: rgba($positive, .05);
    }

    .big-button:disabled {
        border: solid $foreground 1px;
        border-radius: 5px;
        background: rgba($foreground, .05);
    }

    .big-button:hover:enabled, .big-button:focus:enabled{
        border-width: 2px;
        background: rgba($positive, .1);
    }

    .big-button:active:enabled{
        background: rgba($positive, .2);
    }

</style>
