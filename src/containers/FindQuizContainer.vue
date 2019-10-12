<template>
    <div class="popover">
        <input placeholder="quiz id" type="text" v-model="inputValue">
        <button @click="routeToQuiz(inputValue)" >-></button>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            inputValue: ''
        }
    },
    methods:{
        routeToQuiz: function(quiz_id){
            if(quiz_id.length > 0){
                this.$router.push({ name: 'quiz', params: { _quiz_id: quiz_id } })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .popover {
        position: absolute;
    }
</style>