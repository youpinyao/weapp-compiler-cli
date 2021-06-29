#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');
const commanderActionToExecArgs = require('./src/commanderActionToExecArgs');
const exec = require('./src/exec');
const getGitTagAndMessage = require('./src/getGitTagAndMessage');

program.version(
  fs.readFileSync(path.resolve(__dirname, 'package.json')).toJSON().version
);

program
  .command('preview')
  .option(
    '-f, --qr-format [format]',
    '可选。二维码格式，选项：terminal, image, base64。默认terminal'
  )
  .option(
    '-s, --qr-size [size]',
    '可选。二维码大小，仅在 qr-format=terminal 时生效，选项：small, default。默认 default（工具版本 1.05.2105072 起）'
  )
  .option('-o, --qr-output <output>', '可选。二维码会被输出到给定路径')
  .option('-i, --info-output <info output>', '可选。相关信息会被输出到给定路径')
  .action((args) => {
    exec(['preview', ...commanderActionToExecArgs(args)]);
  });

program
  .command('upload')
  .option(
    '-v, --version <version>',
    '上传代码，version 指定版本号，project_root 指定项目根路径。'
  )
  .option('-d, --desc <desc>', '上传代码时的备注。')
  .option(
    '-i, --info-output <info output>',
    '可选。指定后，会将本次上传的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息。'
  )
  .action((args) => {
    const { tag, message } = getGitTagAndMessage();

    if (!tag) {
      throw new Error('当前 git 还没有打 tag');
    }

    if (!args.version) {
      args.version = tag;
    }
    if (!args.desc) {
      args.desc = message || tag;
    }
    exec(['upload', ...commanderActionToExecArgs(args)]);
  });

program.parse(process.argv);
