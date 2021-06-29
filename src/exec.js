const fs = require('fs');
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

module.exports = (
  args,
  options = {
    stdio: 'inherit',
  }
) => {
  args.push('--project', path.resolve(process.cwd(), 'dist'));

  return spawn.sync(cli, args, options);
};
