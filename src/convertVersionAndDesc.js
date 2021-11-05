const addEnvPrefix = require('./addEnvPrefix');
const getGitLastTagAndMessage = require('./getGitLastTagAndMessage');
const getGitLastCommitMessage = require('./getGitLastCommitMessage');
const getEnv = require('./getEnv');
const ENV = require('./ENV');

module.exports = function convertVersionAndDesc(args) {
  const params = {...args};
  const { tag, message } = getGitLastTagAndMessage();
  const commitMessage = getGitLastCommitMessage();
  const { env } = getEnv();

  if (!params.version) {
    params.version = tag || '1.0.0';
  }
  if (!params.desc) {
    params.desc = message || tag;
  }

  if (env !== ENV.PROD) {
    params.desc = commitMessage;
  }

  params.desc = addEnvPrefix(params.desc);

  return params;
};
