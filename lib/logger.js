var chalk = require('chalk');

const color = {
  error   : chalk.red,
  success : chalk.green,
  warn    : chalk.yellow,
  process : chalk.blue
};

module.exports = {
  error: (msg) => {
    console.log(color.error(msg));
  },
  warn: (msg) => {
    console.log(color.warn(msg));
  },
  success: (msg) => {
    console.log(color.success(msg));
  },
  process: (msg) => {
    console.log(color.process(msg));
  }
}
