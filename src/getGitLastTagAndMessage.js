const spawn = require('cross-spawn');

module.exports = () => {
  const getString = (output) => (output.stdout || output.stderr || 'undefined').toString().trim();
  const tag = spawn.sync('git', ['describe', '--abbrev=0', '--tags']);
  const msg = spawn.sync('git', ['show', '-q', getString(tag)]);
  const message = getString(msg)
    .split('\n')
    .filter((item) => !!item)
    .splice(0, 10)
    .join(' ');

  return {
    tag: getString(tag).replace(/^v/g, ''),
    message,
  };
};
