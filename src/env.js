const path = require('path');
const fs = require('fs-extra');
const { getConfig } = require('./config');
const ENV = {
  DEV: 'development',
  PROD: 'production',
  SIMULATION: 'simulation',
  UNKNOWN: 'unknown',
};
let env = {
  env: ENV.UNKNOWN,
};

module.exports = {
  ENV,
  getEnv: () => {
    const envPath = path.join(getConfig().projectPath, 'weapp.env.json');
    if (fs.pathExistsSync(envPath)) {
      try {
        env = fs.readJSONSync(envPath);
      } catch (error) {
        console.log(error);
      }
    } else {
      throw new Error(`${envPath} 不能存在，结构为 {"env": "development" | "production" | "simulation"}`)
    }
    return env;
  },
  setEnv: (environment) => (env = environment),
};
