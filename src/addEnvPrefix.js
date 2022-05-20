const dayjs = require('dayjs');
const { getEnv } = require('./env');

module.exports = function addEnvPrefix(str) {
  const { env } = getEnv();

  return `【${env}】【${dayjs().format('YYYY-MM-DD HH:mm:ss')}】${
    str ? `【${str}】` : ''
  }`;
};
