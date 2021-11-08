const ci = require('miniprogram-ci');
const { projectPath, getPrivateKeyPath } = require('../config');
const projectConfig = require('../projectConfig');

module.exports = function getProject() {
  const { appid } = projectConfig;
  const ignores = ['assets/**/*', '**/*.map', '*.map'];


  const project = new ci.Project({
    appid,
    type: 'miniProgram',
    projectPath,
    privateKeyPath: getPrivateKeyPath(),
    ignores,
  });
  return project;
};
