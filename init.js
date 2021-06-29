const fs = require('fs-extra');
const path = require('path');
const packagePath = path.resolve(__dirname, '../../', 'package.json');

if (fs.existsSync(packagePath)) {
  const package = fs.readJSONSync(packagePath);
  let hasChange = false;

  if (!package.scripts) {
    package.scripts = {};
  }
  if (!package.scripts['weapp-cli:upload']) {
    package.scripts['weapp-cli:upload'] = 'weapp-cli upload';
    hasChange = true;
  }
  if (!package.scripts['weapp-cli:preview']) {
    package.scripts['weapp-cli:preview'] = 'weapp-cli preview';
    hasChange = true;
  }

  if (hasChange) {
    fs.writeFileSync(packagePath, JSON.stringify(package, null, 2));
  }
}
