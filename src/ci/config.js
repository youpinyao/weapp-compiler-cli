const fs = require('fs');
const path = require('path');
const { parse } = require('yaml');
const configFilePath = path.join(process.cwd(), '.weapp-ci.yaml');

const template = `
minifyWXML: true
minifyWXSS: true
minifyJS: true
minify: true
es6: true
es7: true
autoPrefixWXSS: true
projectPath: dist
`;

let config;

module.exports = {
  init() {
    fs.writeFileSync(configFilePath, template);
    console.log('.weapp-ci.yaml 初始化成功');
  },
  getConfig() {
    if (!config) {
      if (fs.existsSync(configFilePath)) {
        const yaml = fs.readFileSync(configFilePath, 'utf-8');

        config = parse(yaml);

        config.projectPath = path.resolve(process.cwd(), config.projectPath || 'dist');
      }
    }
    return config;
  },
};
