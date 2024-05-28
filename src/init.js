const fs = require('fs-extra');
const path = require('path');
const packagePath = path.resolve(process.cwd(), 'package.json');

if (fs.existsSync(packagePath)) {
  const package = fs.readJSONSync(packagePath);
  const scripts = {
    'weapp-cli:upload': 'weapp-cli upload',
    'weapp-cli:preview': 'weapp-cli preview',
    'weapp-cli:open': 'weapp-cli open',
    'weapp-cli:close': 'weapp-cli close',
    'weapp-cli:quit': 'weapp-cli quit',
    'weapp-cli:reset-fileutils': 'weapp-cli reset-fileutils',
    'weapp-ci:upload': 'weapp-cli upload',
    'weapp-ci:preview': 'weapp-cli preview'
  };
  let hasChange = false;

  if (!package.scripts) {
    package.scripts = {};
  }

  Object.keys(scripts).forEach((key) => {
    if (!package.scripts[key]) {
      package.scripts[key] = scripts[key];
      hasChange = true;
    }
  });

  if (hasChange) {
    fs.writeFileSync(packagePath, JSON.stringify(package, null, 2));
  }
}
