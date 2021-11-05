const path = require('path');
const fs = require('fs-extra');
const { projectPath } = require('./config');
const projectConfigPath = path.resolve(projectPath, 'project.config.json');
let projectConfig = {};

if (fs.pathExistsSync(projectConfigPath)) {
  projectConfig = fs.readJSONSync(projectConfigPath);
} else {
  throw new Error(`${projectConfig} is no exist`);
}

module.exports = projectConfig;
