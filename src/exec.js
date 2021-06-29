const fs = require('fs-extra');
const path = require('path');
const spawn = require('cross-spawn');

let cli = '/Applications/wechatwebdevtools.app/Contents/MacOS/cli';

if (process.platform === 'win32') {
  const paths = ['C', 'D', 'E', 'F'];
  const win32Cli =
    ':\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat';

  paths.forEach((p) => {
    if (fs.existsSync(`${p}${win32Cli}`)) {
      cli = `${p}${win32Cli}`;
    }
  });
}

if (fs.existsSync(path.resolve(process.cwd(), 'package.json'))) {
  const package = fs.readJSONSync(path.resolve(process.cwd(), 'package.json'));

  if (package.weappCliConfig && package.weappCliConfig.path) {
    cli = package.weappCliConfig.path;
  }
}

if (!fs.existsSync(cli)) {
  throw new Error(`${cli} is no exist`)
}

module.exports = (
  args,
  options = {
    stdio: 'inherit',
  }
) => {
  args.push('--project', path.resolve(process.cwd(), 'dist'));

  console.log(cli, args);

  return spawn.sync(cli, args, options);
};
