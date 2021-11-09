module.exports = function formatVersion(ver) {
  let version = `${ver || ''}`.replace(/^v/g, '');

  if (isNaN(parseFloat(version))) {
    version = '1.0.0';
  }

  return version;
};
