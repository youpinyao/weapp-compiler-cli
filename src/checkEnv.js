
const { Confirm } = require('enquirer');
const getEnv = require("./getEnv");
const ENV = require('./env');

const { env } = getEnv();

module.exports = async function checkEnv() {
  if (env === ENV.DEV) {
    const res = await new Confirm({
      name: '确认',
      message: '当前为 development，是否继续执行？',
    }).run();
    if (res === false) {
      throw new Error('已取消执行');
    }
  }
};
