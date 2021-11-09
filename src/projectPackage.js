const fs = require('fs-extra');
const path = require('path');
let projectPackage = {};
const projectPackagePath = path.resolve(process.cwd(), 'package.json');

if (fs.pathExistsSync(projectPackagePath)) {
  projectPackage = fs.readJSONSync(projectPackagePath);
}

module.exports = projectPackage;
