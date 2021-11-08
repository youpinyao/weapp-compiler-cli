const spawn = require('cross-spawn');

module.exports = function getGitLastCommitMessage() {
  const getString = (output) => (output.stdout || output.stderr || '').toString().trim();
  const msg = spawn.sync('git', ['show', '-q']);
  const message = getString(msg)
    .split('\n')
    .filter((item) => !!item)
    .splice(0, 10)
    .join(' ');

  return message;
};
