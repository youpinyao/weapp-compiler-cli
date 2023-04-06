const ci = require('miniprogram-ci');
const clearConsole = require('react-dev-utils/clearConsole');
const { getEnv, ENV } = require('../env');
const getProject = require('./getProject');

const onProgressUpdate = (...args) => {
  clearConsole();
  console.log(...args);
};

async function upload({ version, desc, quiet }) {
  const project = getProject();
  let { env } = getEnv();

  const uploadResult = await ci.upload({
    project,
    version,
    desc,
    setting: {
      minifyWXML: true,
      minifyWXSS: true,
      minifyJS: true,
      minify: true,
      es6: true,
      es7: true,
      autoPrefixWXSS: true,
    },
    robot: [ENV.DEV, ENV.SIMULATION, ENV.PROD, ENV.UNKOWN].indexOf(env) + 1,
    onProgressUpdate: (...args) => {
      if (quiet !== true) {
        onProgressUpdate(...[{ version, desc }, '\n', args]);
      }
    },
  });

  return uploadResult;
}

async function preview({ version, desc, quiet }) {
  const project = getProject();
  let { env } = getEnv();

  const previewResult = await ci.preview({
    project,
    desc,
    setting: {
      minifyWXML: true,
      minifyWXSS: true,
      minifyJS: true,
      minify: true,
      es6: true,
      es7: true,
      autoPrefixWXSS: true,
    },
    robot: [ENV.DEV, ENV.SIMULATION, ENV.PROD, ENV.UNKOWN].indexOf(env) + 1,
    onProgressUpdate: (...args) => {
      if (quiet !== true) {
        onProgressUpdate(...[{ version, desc }, '\n', args]);
      }
    },
  });
  return previewResult;
}

module.exports = {
  ciUpload: upload,
  ciPreview: preview,
};
