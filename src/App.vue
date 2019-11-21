<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  methods: {
    getViewportContent: function () {
      if (screen.width < 411) {
        return `width=411, initial-scale=${screen.width / 411}, user-scalable=no`
      } else {
        return `width=device-width, initial-scale=1.0, user-scalable=no`
      }
    }
  },

  metaInfo: function() {
    return {
      meta: [
        { charset: 'utf-8' },
        { name: 'google', content: 'notranslate' },
        { name: 'viewport', content: this.getViewportContent()}
      ],

      title: 'Quizz'
    }
  }
}
</script>

<style lang="scss">

  @import "./assets/scss/const.scss";

  :root {
    --base-padding: 8px;
  }

  *{
    padding: 0px;
    margin: 0px;
  }

  .material-icons{
    font-family: 'Material Icons Round';
    font-style: normal;
    transform: none;
    transition: transform 0.15s ease-out;
  }

  #app{
    font-family: Nunito;

    width: 100vw;
    height: 100vh;

    font-weight: 300;
    background-color: $gray-200;
    color: $gray-700;
  }

  .fill{
    width: 100%;
    height: 100%;
  }

  .aligner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .aligner--space {
    justify-content: space-between;
  }

  .aligner--col {
    flex-direction: column;
  }

  .aligner--row {
    flex-direction: row;
  }

  .aligner--start {
    justify-self: flex-start;
  }

  .aligner--end {
    justify-self: flex-end;
  }

  /* ################### */
  /*      BUTTONS        */
  /* ################### */

  .button {
    position: relative;
    max-height: 64px;
    margin: 8px;

    font-family: Nunito;
    font-size: 1.8rem;

    background-color: $gray-400;
    color: $gray-100;

    border: none;
    border-radius: 8px;
    padding: 8px;

    transform: translate(0, 0);
    box-shadow: 0px 2px 8px rgba(0,0,0,0.2);

    transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
  }

  .button::-moz-focus-inner {
    outline: none;
    border: 0;
  }

  .button i {
    font-size: 2.5rem;
    margin: 0.25rem;
  }

  .button:active:enabled {
    transform: translate(0, -4px);
    box-shadow: 0px 6px 10px rgba(0,0,0,0.2);
  }

  .button:focus {
    outline-style: none;
  }

  .button-sm {
    font-size: 1rem;
    max-height: 40px;
  }

  .button-sm i {
    font-size: 1rem;
  }

  .button-primary {
    z-index: 1;
    background: linear-gradient(to right, $primary-600, $primary-500);
    color: $primary-100;
  }

  .button-primary:disabled {
    background: linear-gradient(to right, $primary-500, $primary-400);
    filter: saturate(0%);
  }

  .button-primary::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    border-radius: inherit;

    background: linear-gradient(to right, $primary-600, $primary-600);

    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    z-index: -1;
  }

  .button-primary:hover:enabled::before,
  .button-primary:focus:enabled::before {
    opacity: 1;
  }

  .button-secondary {
    z-index: 1;
    background: linear-gradient(to right, $gray-700, $gray-600);
    color: $gray-100;
  }

  .button-secondary:disabled {
    background: linear-gradient(to right, $gray-500, $gray-400);
    filter: saturate(0%);
  }

  .button-secondary::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    border-radius: inherit;

    background: linear-gradient(to right, $gray-700, $gray-700);

    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    z-index: -1;
  }

  .button-secondary:hover:enabled::before,
  .button-secondary:focus:enabled::before {
    opacity: 1;
  }

  .button-warning {
    z-index: 1;
    background: linear-gradient(to right, $warning-600, $warning-500);
    color: $warning-100;
  }

  .button-warning::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    border-radius: inherit;

    background: linear-gradient(to right, $warning-600, $warning-600);

    opacity: 0;
    transition: opacity 0.1s ease-in-out;
    z-index: -1;
  }

  .button-warning:hover::before,
  .button-warning:focus::before {
    opacity: 1;
  }

  /* ################### */
  /*      INPUT          */
  /* ################### */

  .input {
    max-height: 64px;
    margin: 8px;

    font-family: Nunito;
    font-size: 1.8rem;

    background-color: $gray-200;
    color: $gray-700;

    border: none;
    border-radius: 8px;
    padding: 8px;
  }

  .input-sm {
    font-size: 1rem;
    max-height: 40px;
  }

  /* ################### */
  /*      CONTAINER      */
  /* ################### */

  .container {
    background-color: $gray-100;
    padding: 4px;
    border-radius: 16px;

    margin: 16px;

    box-shadow: 0px 2px 8px rgba(0,0,0,0.2);
  }

  .container--top {
    border-radius: 0px 0px 16px 16px;
    margin: 0px 8px;
  }

  .container--bottom {
    border-radius: 16px 16px 0px 0px;
    margin: 0px 8px;
  }

  /* ################### */
  /*      PADDING        */
  /*         &           */
  /*      MARGIN         */
  /* ################### */

  .p-1 {
    padding: var(--base-padding);
  }

  .p-2 {
    padding: calc(var(--base-padding) * 2);
  }

  .p-3 {
    padding: calc(var(--base-padding) * 3);
  }

  .p-4 {
    padding: calc(var(--base-padding) * 4);
  }

  //==== x-axis ====

  .px-1 {
    padding-left: var(--base-padding);
    padding-right: var(--base-padding);
  }

  .px-2 {
    padding-left: calc(var(--base-padding) * 2);
    padding-right: calc(var(--base-padding) * 2);
  }

  .px-3 {
    padding-left: calc(var(--base-padding) * 3);
    padding-right: calc(var(--base-padding) * 3);
  }

  .px-4 {
    padding-left: calc(var(--base-padding) * 4);
    padding-right: calc(var(--base-padding) * 4);
  }

</style>
