const spawn = require('cross-spawn');
const formatVersion = require('./formatVersion');

module.exports = () => {
  const getString = (output) => (output.stdout || output.stderr || '').toString().trim();
  const tag = getString(spawn.sync('git', ['describe', '--abbrev=0', '--tags']));
  const msg = spawn.sync('git', ['show', '-q', tag]);
  const message = getString(msg)
    .split('\n')
    .filter((item) => !!item)
    .splice(0, 10)
    .join(' ');

  return {
    tag: formatVersion(tag),
    message,
  };
};
