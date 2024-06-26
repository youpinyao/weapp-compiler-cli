const path = require('path');
const fs = require('fs-extra');
const { getConfig } = require('./config');

module.exports = function getProjectConfig() {
  const projectConfigPath = path.resolve(
    getConfig().projectPath,
    'project.config.json'
  );
  let projectConfig = {};

  if (fs.pathExistsSync(projectConfigPath)) {
    projectConfig = fs.readJSONSync(projectConfigPath);
  } else {
    throw new Error(`project.config.json is no exist`);
  }

  return projectConfig;
};
