const spawn = require('cross-spawn');
const { projectPath, getCliPath } = require('./config');

module.exports = (
  args,
  options = {
    stdio: 'inherit',
  }
) => {
  const cliPath = getCliPath();

  args.push('--project', projectPath);

  console.log(cliPath, args);

  return spawn.sync(cliPath, args, options);
};
