<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">

  @import "./assets/scss/const.scss";

  *{
    padding: 0px;
    margin: 0px;
  }

  .material-icons{
    transform: none;
    transition: transform 0.15s ease-out;
  }

  #app{
    font-family: Nunito;
    background-color: $background;
    color: $text;
  }

  .fill{
    width: 100vw;
    height: 100vh;
  }

  .aligner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .aligner--col {
    flex-direction: column;
  }

  .aligner--row {
    flex-direction: row;
  }

  .aligner--start {
    align-self: flex-start;
  }

  .aligner--end {
    align-self: flex-end;
  }

</style>
