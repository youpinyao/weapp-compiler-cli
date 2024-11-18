const path = require('path');
const yaml = require('yaml');
const fse = require('fs-extra');
const weappEnv = path.resolve(process.cwd(), '.weapp.env.yaml');
const { getConfig } = require('./config');
const ENV = {
  DEV: 'development',
  PROD: 'production',
  SIMULATION: 'simulation',
  UNKNOWN: 'unknown',
};

if (fse.existsSync(weappEnv)) {
  Object.assign(ENV, yaml.parse(fse.readFileSync(weappEnv).toString()));
}


let env = {
  env: ENV.UNKNOWN,
};

module.exports = {
  ENV,
  getEnv: () => {
    const envPath = path.join(getConfig().projectPath, 'weapp.env.json');
    if (fse.pathExistsSync(envPath)) {
      try {
        env = fse.readJSONSync(envPath);
      } catch (error) {
        console.log(error);
      }
    } else {
      throw new Error(`${envPath} 不存在，结构为 {"env": "development" | "production" | "simulation" | 自定义}`)
    }
    return env;
  },
  setEnv: (environment) => (env = environment),
};
