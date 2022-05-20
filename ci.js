#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const { ciUpload, ciPreview } = require('./src/ci');
const convertVersionAndDesc = require('./src/convertVersionAndDesc');
const { setEnv } = require('./src/env');

program.version(
  fs.readJSONSync(path.resolve(__dirname, 'package.json')).version
);

program
  .command('preview')
  .option('-d, --desc <desc>', '上传代码时的备注。')
  .option('-q, --quiet', '安静模式，打印减少')
  .option('-e, --env', 'development simulation production')
  .action(async (args) => {
    if (args.env) {
      setEnv({
        env: args.env,
      });
    }
    const result = await ciPreview({
      ...convertVersionAndDesc(args),
    });

    console.log(result);
  });

program
  .command('upload')
  .option('-v, --version <version>', '上传代码，version 指定版本号。')
  .option('-d, --desc <desc>', '上传代码时的备注。')
  .option('-q, --quiet', '安静模式，打印减少')
  .option('-e, --env', 'development simulation production')
  .action(async (args) => {
    if (args.env) {
      setEnv({
        env: args.env,
      });
    }
    const result = await ciUpload({
      ...convertVersionAndDesc(args),
    });
    console.log(result);
  });

program.parse(process.argv);
