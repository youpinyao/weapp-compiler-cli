const path = require('path');
const fs = require('fs-extra');
const { projectPath } = require('./config');
const ENV = require('./ENV');
const envPath = path.join(projectPath, '.weapp');
let env = {
  env: ENV.UNKOWN,
};

console.log('envPath', envPath, fs.existsSync(envPath), fs.pathExistsSync(envPath));

if (fs.pathExistsSync(envPath)) {
  try {
    env = fs.readJSONSync(envPath)
  } catch (error) {
    console.log(error);
  }
}

module.exports = () => env;
