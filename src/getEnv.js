const path = require('path');
const fs = require('fs-extra');
const { projectDir } = require('./config');

module.exports = () => {
  const envPath = path.join(projectDir, '.weapp');
  let env = {};

  if (fs.existsSync(envPath)) {
    try {
      env = fs.readJSONSync(envPath) || {};
    } catch (error) {
      // console.log(error);
    }
  }

  return env;
};
