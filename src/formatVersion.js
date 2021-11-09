const projectPackage = require("./projectPackage");

module.exports = function formatVersion(ver) {
  let version = `${ver || ''}`.replace(/^v/g, '');

  // 错误 取 package.json version
  if (isNaN(parseFloat(version))) {
    version = projectPackage.version;
  }
  // 错误 默认 1.0.0
  if (isNaN(parseFloat(version))) {
    version = '1.0.0';
  }

  return version;
};
