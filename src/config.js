const path = require('path');
const fs = require('fs-extra');

let cliPath = '/Applications/wechatwebdevtools.app/Contents/MacOS/cli';
let projectPath = path.resolve(process.cwd(), 'dist');
let privateKeyPath = path.resolve(process.cwd(), 'private.key');

if (process.platform === 'win32') {
  const paths = ['C', 'D', 'E', 'F'];
  const win32Cli =
    ':\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat';

  paths.forEach((p) => {
    if (fs.pathExistsSync(`${p}${win32Cli}`)) {
      cliPath = `${p}${win32Cli}`;
    }
  });
}

if (fs.pathExistsSync(path.resolve(process.cwd(), 'package.json'))) {
  const package = fs.readJSONSync(path.resolve(process.cwd(), 'package.json'));

  if (package.weappCliConfig) {
    if (package.weappCliConfig.cliPath) {
      cliPath = package.weappCliConfig.cliPath;
    }
    if (package.weappCliConfig.projectPath) {
      projectPath = path.resolve(
        process.cwd(),
        package.weappCliConfig.projectPath
      );
    }
    if (package.weappCliConfig.privateKeyPath) {
      privateKeyPath = path.resolve(
        process.cwd(),
        package.weappCliConfig.privateKeyPath
      );
    }
  }
}

if (!fs.pathExistsSync(projectPath)) {
  throw new Error(`${projectPath} is no exist`);
}

module.exports = {
  projectPath,
  getCliPath() {
    if (!fs.pathExistsSync(cliPath)) {
      throw new Error(`${cliPath} is no exist`);
    }
    return cliPath;
  },
  getPrivateKeyPath() {
    if (!fs.pathExistsSync(privateKeyPath)) {
      throw new Error(`${privateKeyPath} is no exist`);
    }
    return privateKeyPath;
  },
};
