# vue3-ts-cms

### 项目编辑器配置(解决不同平台电脑,不同编辑器:如 vscode,webstrom)

.editorconfig 文件,vscode 要安装插件(EditorConfig for VS Code),Vue 官方也是这么配置的.

```js
root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false
```

### 格式代码工具

安装命令

```js
npm install prettier -D
```

.prettierrc 文件,如下

```js
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}

```

解决所有文件格式话命令:

```js
 "prettier": "prettier --write ."
```

创建.prettierignore 忽略文件

```js
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

### 使用 ESLint 检测

安装 eslint 插件,同时执行下面命令:

```js
npm i eslint-plugin-prettier eslint-config-prettier -D
```

.eslintrc.js

```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended' //prettier为准,解决冲突问题
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
```

### git Husky 提交拦截

安装命令

```js
npx husky-init
npm install
```

然后在.husky/pre-commit 里增加检查

```js
npm run lint
```

限制普通 commit 提交
执行安装

```js
npm install commitizen -D
```

初始化

```js
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

package.json 中添加命令

```js
 "commit":"cz"
```

#### 代码提交限制(限制必须采用 npm run commit 提交)

如果我们按照 cz 来规范了提交风格，但是依然有同事通过 `git commit` 按照不规范的格式提交应该怎么办呢？

- 我们可以通过 commitlint 来限制提交；

  1.安装 @commitlint/config-conventional 和 @commitlint/cli

```shell
npm i @commitlint/config-conventional @commitlint/cli -D
```

2.在根目录创建 commitlint.config.js 文件，配置 commitlint

```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

3.使用 husky 生成 commit-msg 文件，验证提交信息：

```shell
npx husky add .husky/commit-msg
```

然后在 commit-msg 文件最后加上

```js
npx --no-install commitlint --edit
```

这样提交只能采用 npm run commit 来提交记录了.
