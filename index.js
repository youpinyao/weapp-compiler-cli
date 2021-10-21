#!/usr/bin/env node

const program = require('commander');
const { Confirm } = require('enquirer');
const fs = require('fs-extra');
const path = require('path');
const commanderActionToExecArgs = require('./src/commanderActionToExecArgs');
const exec = require('./src/exec');
const getEnv = require('./src/getEnv');
const getGitTagAndMessage = require('./src/getGitTagAndMessage');

program.version(
  fs.readJSONSync(path.resolve(__dirname, 'package.json')).version
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
  .action(async (args) => {
    const { tag, message } = getGitTagAndMessage();
    const { env } = getEnv();

    // 如果upload 的是测试版本，就提示选择是否继续
    if (env === 'development') {
      const res = await new Confirm({
        name: '确认',
        message: '当前为 development，是否继续执行？',
      }).run();
      if (res === false) {
        console.log('------------');
        console.log('已取消执行');
        console.log('------------');
        return;
      }
    }

    if (!tag && (!args.version || !args.desc)) {
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

program.command('open').action((args) => {
  exec(['open', ...commanderActionToExecArgs(args)]);
});
program.command('close').action((args) => {
  exec(['close', ...commanderActionToExecArgs(args)]);
});
program.command('quit').action((args) => {
  exec(['quit', ...commanderActionToExecArgs(args)]);
});
program.command('reset-fileutils').action((args) => {
  exec(['reset-fileutils', ...commanderActionToExecArgs(args)]);
});

program.parse(process.argv);
