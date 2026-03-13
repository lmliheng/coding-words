<script src="https://cdn.jsdelivr.net/npm/@oblivionocean/minigfm@latest/dist/index.min.js"></script>
// 创建配置实例
const md = new MiniGFM({
    unsafe: true, // 允许原始HTML渲染
    hljs: hljs,   // 使用highlight.js处理代码块
});

// 解析Markdown
const html = md.parse('# Hello World'); 
console.log(html); // <h1>Hello World</h1>