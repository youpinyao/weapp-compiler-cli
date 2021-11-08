const path = require('path');
const fs = require('fs-extra');
const { projectPath } = require('./config');
const ENV = require('./ENV');
const envPath = path.join(projectPath, 'weapp.env.json');
let env = {
  env: ENV.UNKOWN,
};

if (fs.pathExistsSync(envPath)) {
  try {
    env = fs.readJSONSync(envPath)
  } catch (error) {
    console.log(error);
  }
}

module.exports = () => env;
