
// 在 Node.js 环境中
const fs = require('fs');
var hljs = require('highlight.js'); // https://highlightjs.org/
// node.js, 用“类”的方式：
var MarkdownIt = require('markdown-it');


// 通常的默认值们
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});


//*************************************************** */

var result = md.render('# markdown-it rulezz!');
console.log('解析后result1:', result);
if (result) {
  console.log('解析成功');
} else {
  console.log('解析失败');
}


// 确保文件存在，然后读取
try {
    const markdownText = fs.readFileSync('test.md', 'utf-8');
    const result = md.render(markdownText);
    console.log('解析后result2:', result);
} catch (error) {
    console.error('读取文件失败:', error.message);
    console.log('当前目录:', process.cwd());
}

