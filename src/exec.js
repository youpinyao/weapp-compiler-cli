const spawn = require('cross-spawn');
const { projectPath, cliPath } = require('./config');

module.exports = (
  args,
  options = {
    stdio: 'inherit',
  }
) => {
  args.push('--project', projectPath);

  console.log(cliPath, args);

  return spawn.sync(cliPath, args, options);
};
