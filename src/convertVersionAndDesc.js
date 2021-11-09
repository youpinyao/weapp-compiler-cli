const addEnvPrefix = require('./addEnvPrefix');
const getGitLastTagAndMessage = require('./getGitLastTagAndMessage');
const getGitLastCommitMessage = require('./getGitLastCommitMessage');
const getEnv = require('./getEnv');
const ENV = require('./env');
const formatVersion = require('./formatVersion');

module.exports = function convertVersionAndDesc(args) {
  const params = {...args};
  const { tag, message } = getGitLastTagAndMessage();
  const commitMessage = getGitLastCommitMessage();
  const { env } = getEnv();

  if (!params.version) {
    params.version = tag;
  }
  if (!params.desc) {
    params.desc = message;
  }

  if (env !== ENV.PROD) {
    params.desc = commitMessage;
  }

  params.version = formatVersion(params.version);
  params.desc = addEnvPrefix(params.desc);

  return params;
};
