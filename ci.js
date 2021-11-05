#!/usr/bin/env node

const program = require('commander');
const fs = require('fs-extra');
const path = require('path');
const { ciUpload, ciPreview } = require('./src/cli');
const convertVersionAndDesc = require('./src/convertVersionAndDesc');

program.version(
  fs.readJSONSync(path.resolve(__dirname, 'package.json')).version
);

program.command('preview').action(async (args) => {
  const result = await ciPreview({
    ...convertVersionAndDesc(args),
  });

  console.log(result);
});

program
  .command('upload')
  .option('-v, --version <version>', '上传代码，version 指定版本号。')
  .option('-d, --desc <desc>', '上传代码时的备注。')
  .action(async (args) => {
    const result = await ciUpload({
      ...convertVersionAndDesc(args),
    });
    console.log(result);
  });

program.parse(process.argv);
