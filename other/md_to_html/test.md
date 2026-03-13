# Markdown 元素示例

此文档展示了如何将常见的Markdown元素渲染为HTML，并应用"GitHub Markdown CSS"样式。

## 1. 表格

一个展示不同编程语言特性的简单表格：

| 语言 | 类型 | 主要用途 |
|------|------|----------|
| Python | 动态，解释型 | Web开发，数据科学，AI |
| JavaScript | 动态，解释型 | Web前端，服务器端（Node.js） |
| Java | 静态，编译型 | 企业级应用，安卓开发 |
| C++ | 静态，编译型 | 系统/游戏开发，高性能计算 |

## 2. 列表

### 无序列表（项目符号）

- 前端技术栈
  - HTML
  - CSS
  - JavaScript
- 版本控制系统
  - Git

### 有序列表（编号）

1. 打开命令行/终端
2. 进入项目目录：`cd your-project`
3. 初始化Git仓库：`git init`
4. 添加文件到暂存区：`git add .`

## 3. 代码段

### 行内代码

在段落中使用 `console.log('Hello World')` 来打印信息。

### 代码块（无语法高亮）

```markdown
# 这是一个Markdown标题
## 这是一个二级标题
这是一个普通段落。
```
### 代码块（有语法高亮）

```javascript
function add(a, b) {
    return a + b;
}
```



## 4. 引用

> 这是Markdown中的引用块（Blockquote）。它通常用于突出显示来自其他来源的文字，或者表示一段重要的论述。
>
> 引用块内可以包含多个段落、列表，甚至其他Markdown元素。

> 嵌套引用示例：
> 
> > 这是一段被嵌套的引用。

## 5. 强调文本与分隔线

文本可以设置为**粗体（加粗）**或*斜体（强调）*，甚至可以***粗斜体结合***。

---

上面是一条水平分隔线，用于分割不同的内容区块。

## 6. 链接与图片

这是一个指向[GitHub官网](https://www.github.com)的链接。

这是一个图片示例（由于文档中没有包含实际的图片标签，此处仅用替代文本表示，在真实Markdown中会被渲染为img标签）：

![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

## 7. 任务列表

- [ ] 未完成的任务
- [x] 已完成的任务
- [ ] 另一个待办项

以上内容涵盖了Markdown中常用的核心元素，当被Markdown解析器转换并由`github-markdown.css`渲染后，会呈现与GitHub风格一致的视觉效果。