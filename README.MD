
# 文本转Excel脚本

这个 Node.js 脚本用于从文本文件中提取数据并将其写入 Excel 文件。

## 使用方法

1. 确保已经安装了 Node.js。
2. 下载或克隆此存储库。
3. 在终端中导航到脚本文件所在的目录。
4. 运行以下命令安装所需的依赖项:

```bash
npm install
```

5. 执行以下命令运行脚本:

```bash
node index.js
```

按照提示输入输入文件的完整路径和输出文件的文件名(不带后缀)。

## 注意事项

- 确保输入文件包含符合脚本预期格式的数据,以便脚本能够正确运行。
- 脚本将在与输入文件相同的目录中生成一个带有提供的输出文件名的 Excel 文件。

## 脚本说明

- 使用 `readline` 模块从用户输入中获取文件路径和输出文件名。
- 使用 `fs` 模块读取输入文件的内容。
- 使用 `ExcelJS` 模块创建和编辑 Excel 文件。
- 使用 `path` 模块处理文件路径。
- 脚本假定输入文件的格式满足特定的模式,具体请参考脚本中的代码注释。

## 依赖项

- [fs](https://nodejs.org/api/fs.html): Node.js 文件系统模块
- [ExcelJS](https://www.npmjs.com/package/exceljs): 用于在 Node.js 中创建 Excel 文件
- [readline](https://nodejs.org/api/readline.html): Node.js 交互式命令行模块
- [path](https://nodejs.org/api/path.html): Node.js 路径模块

## 许可证

该项目在 MIT 许可下发布 - 有关详细信息,请参阅 [LICENSE](LICENSE) 文件。
