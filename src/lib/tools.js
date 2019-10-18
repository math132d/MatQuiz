export default {
  formatSeconds: (seconds) => {
    return `${
      ('0' + Math.floor(seconds / 60)).slice(-2)
    }:${
      ('0' + Math.floor(seconds % 60)).slice(-2)
    }`
  },
  compareStrings: (input, target) => { // Returns true if inputs are similar, false if not
    return input.toLowerCase() === target.toLowerCase()
  }
}
