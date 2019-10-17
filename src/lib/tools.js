export default {
  formatSeconds: (seconds) => {
    return `${
      ('0' + Math.floor(seconds / 60)).slice(-2)
    }:${
      ('0' + Math.floor(seconds % 60)).slice(-2)
    }`
  }
}
