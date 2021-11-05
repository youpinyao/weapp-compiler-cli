const path = require('path');
const fs = require('fs-extra');
const { projectPath } = require('./config');
const ENV = require('./ENV');
const envPath = path.join(projectPath, '.weapp');
let env = {};

if (fs.pathExistsSync(envPath)) {
  try {
    env = fs.readJSONSync(envPath) || {
      env: ENV.UNKOWN,
    };
  } catch (error) {
    // console.log(error);
  }
}

module.exports = () => env;
