#!/usr/bin/env node

const program = require('commander');
const terminalImg = require('./src/lib/terminal-img/index');
const chalk = require('chalk');

const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

program.version(
  fs.readJSONSync(path.resolve(__dirname, 'package.json')).version
);

program.action(async () => {
  const browser = await puppeteer.launch({
    // headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://mp.weixin.qq.com/');

  page.on('console', (msg) => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(chalk.green(msg.text()));
  });

  console.log(chalk.green('获取登录二维码'));

  // 检测是否进入登录页
  await page.waitForFunction(() => {
    const qrcode = document.querySelector(
      '.login__type__container__scan__qrcode'
    );
    return !!(qrcode && qrcode.getAttribute('src') && qrcode.complete);
  });

  // 获取二维码
  const qrcode = await page.evaluate(() => {
    const qrcode = document.querySelector(
      '.login__type__container__scan__qrcode'
    );
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = qrcode.width * 4;
    const height = qrcode.height * 4;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(qrcode, 0, 0, width, height);

    return canvas.toDataURL();
  });
  const qrcodePath = path.join(__dirname, 'qrcode.png');

  // 保存二维码图片
  fs.writeFileSync(
    qrcodePath,
    Buffer.from(qrcode.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  );

  // 画二维码图
  await terminalImg.draw(qrcodePath, {
    width: 100,
    height: 100,
  });

  console.log(chalk.green('请扫码登录'));
  fs.unlinkSync(qrcodePath);

  // 检测是否进入页面
  await page.waitForFunction(() => {
    const items = document.querySelectorAll('.menu_item');
    const item = [...items].filter(
      (item) => item.querySelector('a').innerText.trim() === '版本管理'
    )[0];

    return !!item;
  });
  console.log(chalk.green('登录成功'));

  const versionPageButton = await page.evaluateHandle(() => {
    const items = document.querySelectorAll('.menu_item');
    const item = [...items].filter(
      (item) => item.querySelector('a').innerText.trim() === '版本管理'
    )[0];

    return item;
  });

  if (versionPageButton) {
    versionPageButton.click();
  }

  console.log(chalk.green('跳转【版本管理】'));

  await page.waitForFunction(() => {
    const items = document.querySelectorAll('.mod_default_hd.test_version');
    const item = [...items].filter(
      (item) => item.querySelector('h4').innerText.trim() === '审核版本'
    )[0];

    return !!item;
  });

  const status = await page.evaluate(() => {
    const status = document.querySelector(
      '.mod_default_bd.default_box.test_version .code_version_log_hd .simple_preview_item .status_tag'
    );

    if (status) {
      return status.innerText.trim();
    }
    return status;
  });

  if (!status) {
    console.log(chalk.red('无审核版本'));
    await browser.close();
    return;
  }

  const desc = await page.evaluate(() => {
    const desc = document.querySelector(
      '.mod_default_bd.default_box.test_version .default_box_inner'
    );

    if (desc) {
      return desc.innerText.trim().replace(/\r|\n|\\s/g, '|');
    }
    return desc;
  });

  console.log(chalk.green(desc));

  if (status === '审核中') {
    console.log(chalk.red('版本审核中'));
    await browser.close();
    return;
  }

  console.log(chalk.green('检测到可发布版本'));

  // 点击提交发布按钮
  const beforeSubmitButton = await page.evaluateHandle(() => {
    const buttons = document.querySelectorAll(
      '.mod_default_bd.default_box.test_version .default_box_inner .user_status .weui-desktop-btn_wrp .weui-desktop-btn.weui-desktop-btn_primary'
    );
    const button = [...buttons].filter(
      (item) => item.innerText.trim() === '提交发布'
    )[0];

    return button;
  });

  if (beforeSubmitButton) {
    console.log(chalk.green('点击提交发布按钮'));
    beforeSubmitButton.click();
  }

  // 检测是否出现提交弹窗
  await page.waitForFunction(() => {
    const buttons = document.querySelectorAll(
      '.weui-desktop-dialog .weui-desktop-dialog__ft .weui-desktop-btn_wrp .weui-desktop-btn.weui-desktop-btn_primary'
    );
    const button = [...buttons].filter(
      (item) => item.innerText.trim() === '提交'
    )[0];


    return !!button;
  });

  // 点击提交按钮
  const submitButton = await page.evaluateHandle(() => {
    const buttons = document.querySelectorAll(
      '.weui-desktop-dialog .weui-desktop-dialog__ft .weui-desktop-btn_wrp .weui-desktop-btn.weui-desktop-btn_primary'
    );
    const button = [...buttons].filter(
      (item) => item.innerText.trim() === '提交'
    )[0];

    return button;
  });

  if (submitButton) {
    console.log(chalk.green('点击提交按钮'));
    submitButton.click();
  }

  // 检测是否显示发布二维码弹窗
  await page.waitForFunction(() => {
    const submitQrcode = document.querySelector(
      '.weui-desktop-dialog__bd .dialog_bd .weui-desktop-qrcheck .weui-desktop-qrcheck__qrcode-area .weui-desktop-qrcheck__img'
    );
    return !!(submitQrcode && submitQrcode.getAttribute('src') && submitQrcode.complete);
  });

  // 获取二维码
  const submitQrcode = await page.evaluate(() => {
    const submitQrcode = document.querySelector(
      '.weui-desktop-dialog__bd .dialog_bd .weui-desktop-qrcheck .weui-desktop-qrcheck__qrcode-area .weui-desktop-qrcheck__img'
    );
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = submitQrcode.width * 4;
    const height = submitQrcode.height * 4;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(submitQrcode, 0, 0, width, height);

    return canvas.toDataURL();
  });
  const submitQrcodePath = path.join(__dirname, 'submit-qrcode.png');

  // 保存二维码图片
  fs.writeFileSync(
    submitQrcodePath,
    Buffer.from(submitQrcode.replace(/^data:image\/\w+;base64,/, ''), 'base64')
  );

  // 画二维码图
  await terminalImg.draw(submitQrcodePath, {
    width: 100,
    height: 100,
  });

  console.log(chalk.green('请扫码发布'));
  fs.unlinkSync(submitQrcodePath);

  await page.waitForFunction(() => {
    const status = document.querySelector(
      '.mod_default_bd.default_box.test_version .code_version_log_hd .simple_preview_item .status_tag'
    );
    return !status;
  });

  console.log(chalk.green('发布成功'));

  await browser.close();
});

program.parse(process.argv);
