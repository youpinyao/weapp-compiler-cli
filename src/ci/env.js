const path = require('path');
const fs = require('fs-extra');
const { getConfig } = require('./config');
const envPath = path.join(getConfig().projectPath, 'weapp.env.json');
const ENV = {
  DEV: 'development',
  PROD: 'production',
  SIMULATION: 'simulation',
  UNKNOWN: 'unknown',
};
let env = {
  env: ENV.UNKNOWN,
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
