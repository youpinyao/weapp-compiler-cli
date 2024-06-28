const ci = require('miniprogram-ci');
const { getPrivateKeyPath } = require('./config');
const getProjectConfig = require('./projectConfig');
const { getConfig } = require('./config');

module.exports = function getProject() {
  const { appid } = getProjectConfig();
  const config = getConfig();
  const ignores = ['assets/**/*', '**/*.map', '*.map'];

  const project = new ci.Project({
    appid,
    type: 'miniProgram',
    projectPath: config.projectPath,
    privateKeyPath: getPrivateKeyPath(),
    ignores,
  });
  return project;
};
