const addEnvPrefix = require('./addEnvPrefix');
const getGitLastTagAndMessage = require('./getGitLastTagAndMessage');
const getGitLastCommitMessage = require('./getGitLastCommitMessage');
const getEnv = require('./getEnv');
const ENV = require('./env');
const formatVersion = require('./formatVersion');

module.exports = function convertVersionAndDesc(args) {
  const params = { ...args };
  const { tag, message } = getGitLastTagAndMessage();
  const commitMessage = getGitLastCommitMessage();
  let { env } = getEnv();

  // 如果存在env 变量 就取值
  if (params.env) {
    env = params.env;
  }

  // 如果参数没传，默认去 git last tag
  if (!params.version) {
    params.version = tag;
  }

  // 如果参数没传，默认去 git last message，非正式环境取 last commit message
  if (!params.desc) {
    params.desc = message;
    if (env !== ENV.PROD) {
      params.desc = commitMessage;
    }
  }

  params.version = formatVersion(params.version);
  params.desc = addEnvPrefix(params.desc);

  return params;
};
