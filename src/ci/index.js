const ci = require('miniprogram-ci');
const clearConsole = require('react-dev-utils/clearConsole');
const getEnv = require('../getEnv');
const getProject = require('./getProject');
const ENV = require('../env');

const onProgressUpdate = (...args) => {
  clearConsole();
  console.log(...args);
};

async function upload({ version, desc, quiet }) {
  const project = getProject();
  const { env } = getEnv();

  const uploadResult = await ci.upload({
    project,
    version,
    desc,
    setting: {
      minifyWXML: true,
      minifyWXSS: true,
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
  const { env } = getEnv();

  const previewResult = await ci.preview({
    project,
    desc,
    setting: {
      minifyWXML: true,
      minifyWXSS: true,
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
