const fs = require('fs-extra');
const path = require('path');
const { parse } = require('yaml');
const configFilePath = path.join(process.cwd(), '.weapp-ci.yaml');
let privateKeyPath = path.resolve(process.cwd(), 'private.key');

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

        config.projectPath = path.resolve(
          process.cwd(),
          config.projectPath || 'dist'
        );
      } else {
        throw new Error('请先初始化，weapp-ci init');
      }
    }
    return config;
  },
  getPrivateKeyPath() {
    if (!fs.pathExistsSync(privateKeyPath)) {
      throw new Error(`${privateKeyPath} is no exist`);
    }
    return privateKeyPath;
  },
};
