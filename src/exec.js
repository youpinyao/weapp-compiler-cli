const spawn = require('cross-spawn');
const { projectDir, cliPath } = require('./config');

module.exports = (
  args,
  options = {
    stdio: 'inherit',
  }
) => {
  args.push('--project', projectDir);

  console.log(cliPath, args);

  return spawn.sync(cliPath, args, options);
};
