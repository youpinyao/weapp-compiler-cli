const withCommanderOption = require("./withCommanderOption");

module.exports = (args) => {
  const arr = [];
  for (const arg in args) {
    arr.push(withCommanderOption(arg));
    if (args[arg] && args[arg] !== true) {
      arr.push(args[arg]);
    }
  }
  return arr;
};
