const spawn = require('cross-spawn');

module.exports = function getGitLastCommitMessage() {
  const getString = (output) => output.stdout.toString().trim();
  const msg = spawn.sync('git', ['show']);
  const message = getString(msg)
    .split('\n')
    .filter((item) => !!item)
    .join(' ');

  return message;
};
