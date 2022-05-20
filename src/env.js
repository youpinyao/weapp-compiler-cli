const path = require('path');
const fs = require('fs-extra');
const { projectPath } = require('./config');
const envPath = path.join(projectPath, 'weapp.env.json');
const ENV = {
  DEV: 'development',
  PROD: 'production',
  SIMULATION: 'simulation',
  UNKOWN: 'unkown',
};
let env = {
  env: ENV.UNKOWN,
};

if (fs.pathExistsSync(envPath)) {
  try {
    env = fs.readJSONSync(envPath);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  ENV,
  getEnv: () => env,
  setEnv: (environment) => (env = environment),
};
