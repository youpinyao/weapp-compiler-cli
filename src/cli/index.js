const ci = require('miniprogram-ci');
const clearConsole = require('react-dev-utils/clearConsole');
const getEnv = require('../getEnv');
const getProject = require('./getProject');
const ENV = require('../ENV');

const onProgressUpdate = (...args) => {
  clearConsole();
  console.log(...args);
};

async function upload({ version, desc }) {
  const project = getProject();
  const { env } = getEnv();

  const uploadResult = await ci.upload({
    project,
    version,
    desc,
    setting: {
      minify: true,
    },
    robot: [ENV.DEV, ENV.SIMULATION, ENV.PROD, ENV.UNKOWN].indexOf(env) + 1,
    onProgressUpdate: (...args) =>
      onProgressUpdate(...[{ version, desc }, '\n', args]),
  });

  return uploadResult;
}

async function preview() {
  const project = getProject();

  const previewResult = await ci.preview({
    project,
    setting: {
      minify: true,
    },
    onProgressUpdate,
  });
  return previewResult;
}

module.exports = {
  ciUpload: upload,
  ciPreview: preview,
};
