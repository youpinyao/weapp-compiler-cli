# weapp-cli

```text
通过命令行调用安装完成的工具可执行文件，完成登录、预览、上传、自动化测试等操作。

要使用命令行，注意首先需要在开发者工具的设置 -> 安全设置中开启服务端口。

命令行工具所在位置：

macOS: <安装路径>/Contents/MacOS/cli

Windows: <安装路径>/cli.bat
```

[https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html)

## 配置

- 配置微信开发者工具安装路径（正常不需要配置，除非使用者安装在特定的目录）

```json
// 项目根目录 package.json

{
  "weappCliConfig": {
    "path": "/Applications/wechatwebdevtools.app/Contents/MacOS/cli",
    "path": "C:\\Program Files (x86)\\Tencent\\微信web开发者工具\\cli.bat"
  }
}
```

## preview 预览

- [官方 API](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html#预览)

```cmd
weapp-cli preview
```

## upload 上传代码

- [官方 API](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html#上传代码)
- 自动填写 最新 git tag 和 message

```cmd
weapp-cli upload
```

## open 启动工具

- [官方 API](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html#启动工具)

```cmd
weapp-cli open
```

## open 关闭项目窗口

- [官方 API](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html#关闭项目窗口)

```cmd
weapp-cli close
```

## open 关闭工具

- [官方 API](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html#关闭工具)

```cmd
weapp-cli quit
```
## open 重建文件监听

- [官方 API](https://developers.weixin.qq.com/miniprogram/dev/devtools/cli.html#重建文件监听)

```cmd
weapp-cli reset-fileutils
```
