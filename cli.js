#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const checkEnv = require('./src/checkEnv');
const commanderActionToExecArgs = require('./src/commanderActionToExecArgs');
const convertVersionAndDesc = require('./src/convertVersionAndDesc');
const exec = require('./src/exec');

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
  .option('-v, --version <version>', '上传代码，version 指定版本号。')
  .option('-d, --desc <desc>', '上传代码时的备注。')
  .option(
    '-i, --info-output <info output>',
    '可选。指定后，会将本次上传的额外信息以 json 格式输出至指定路径，如代码包大小、分包大小信息。'
  )
  .action(async (args) => {
    // 如果upload 的是测试版本，就提示选择是否继续
    await checkEnv();

    exec(['upload', ...commanderActionToExecArgs(convertVersionAndDesc(args))]);
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
