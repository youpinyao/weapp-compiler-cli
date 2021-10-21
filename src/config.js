const path = require('path');
const fs = require('fs-extra');

let cliPath = '/Applications/wechatwebdevtools.app/Contents/MacOS/cli';
let projectDir = path.resolve(process.cwd(), 'dist');

if (process.platform === 'win32') {
  const paths = ['C', 'D', 'E', 'F'];
  const win32Cli =
    ':\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat';

  paths.forEach((p) => {
    if (fs.existsSync(`${p}${win32Cli}`)) {
      cliPath = `${p}${win32Cli}`;
    }
  });
}

if (fs.existsSync(path.resolve(process.cwd(), 'package.json'))) {
  const package = fs.readJSONSync(path.resolve(process.cwd(), 'package.json'));

  if (package.weappCliConfig) {
    if (package.weappCliConfig.cliPath) {
      cliPath = package.weappCliConfig.cliPath;
    }
    if (package.weappCliConfig.projectDir) {
      projectDir = package.weappCliConfig.projectDir;
    }
  }
}

if (!fs.existsSync(cliPath)) {
  throw new Error(`${cliPath} is no exist`);
}

module.exports = {
  projectDir,
  cliPath,
};
