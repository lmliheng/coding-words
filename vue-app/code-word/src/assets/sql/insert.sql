INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  2,
  '单例模式',
  '["前端","后端"]',
  '# 单例模式详解\n\n单例模式（Singleton Pattern）是一种创建型设计模式，它保证一个类只有一个实例，并提供一个全局访问点。\n\n## 核心思想\n\n- 私有构造函数\n- 静态实例变量\n- 全局唯一访问入口\n\n## 常见实现方式\n\n### 1. 饿汉式（线程安全）\n```java\npublic class Singleton {\n    private static final Singleton instance = new Singleton();\n    private Singleton() {}\n    public static Singleton getInstance() {\n        return instance;\n    }\n}\n```\n\n### 2. 懒汉式（双重校验锁）\n```java\npublic class Singleton {\n    private static volatile Singleton instance;\n    private Singleton() {}\n    public static Singleton getInstance() {\n        if (instance == null) {\n            synchronized (Singleton.class) {\n                if (instance == null) {\n                    instance = new Singleton();\n                }\n            }\n        }\n        return instance;\n    }\n}\n```\n\n## 应用场景\n\n- 数据库连接池\n- 日志管理器\n- 配置中心\n- 缓存服务\n\n单例模式在前后端系统中都非常常见，合理使用可以避免资源浪费并保证数据一致性。',
  1,
  34,
  '2026-03-10 03:21:38',
  '2026-04-22 14:43:08'
);


INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  15,
  '中文网页中的字体选型及开发指南',
  '["前端"]',
  '# 中文网页字体选型与开发指南\n\n在中大型前端项目中，中文字体选型直接影响性能与体验。\n\n## 核心原则\n\n- **可读性优先**：正文首选无衬线字体\n- **性能可控**：避免超大字体文件\n- **系统兜底**：优先使用操作系统自带字体\n\n## 推荐字体栈\n\n```css\nfont-family: -apple-system, BlinkMacSystemFont, "PingFang SC",\n             "Microsoft YaHei", sans-serif;\n```\n\n## 实践要点\n\n- 使用 `@font-face` 仅加载必要字重\n- 配合 `unicode-range` 拆分字体包\n- 正文 14–16px，行高 1.6–1.8\n\n合理的字体策略，能在不增加复杂度的前提下显著提升页面质感与加载速度。',
  1,
  4,
  '2026-03-11 15:40:58',
  '2026-03-12 16:31:00'
);


INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  16,
  'CSS <text>文本溢出 CSS 截断',
  '["前端"]',
  '# CSS 文本溢出与截断机制\n\n文本截断是前端布局中的高频需求，本质是对 **盒模型 + 文本流** 的控制。\n\n## 单行截断\n\n```css\n.truncate {\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\n```\n\n## 多行截断（WebKit 内核）\n\n```css\n.multi-truncate {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n}\n```\n\n## 原理简析\n\n- `white-space: nowrap` 强制单行\n- `ellipsis` 在溢出时渲染省略符\n- `-webkit-line-clamp` 限制行数\n\n掌握这些属性，可以避免大量不必要的 JS 计算。',
  1,
  2,
  '2026-03-11 15:52:38',
  '2026-03-12 16:31:00'
);







INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  18,
  '实现注册业务中的邮箱验证码功能',
  '["前端","后端","移动开发"]',
  '# 邮箱验证码注册流程设计\n\n邮箱验证码是注册与风控的基础能力，核心在于 **时效性 + 一次性**。\n\n## 典型流程\n\n1. 前端发起发送验证码请求\n2. 后端生成 code + Redis TTL\n3. 邮件服务发送验证码\n4. 注册接口校验 code\n\n## 前端要点\n\n- 倒计时禁用重复发送\n- 输入长度与格式校验\n\n## 后端要点\n\n- code 随机 6 位数字\n- Redis key：`email:code:{email}`\n- TTL 通常 5–10 分钟\n\n该方案兼顾安全与用户体验，适用于 Web / App 注册体系。',
  1,
  1,
  '2026-03-12 08:59:40',
  '2026-03-13 11:09:03'
);


INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  19,
  '聚合登录的实现',
  '["前端"]',
  '# 聚合登录实现原理\n\n聚合登录通过统一 OAuth / OpenID 层，屏蔽各平台差异。\n\n## 常见方案\n\n- OAuth2（授权码模式）\n- OpenID Connect\n- 第三方 SDK（微信 / QQ / GitHub）\n\n## 前端职责\n\n- 跳转授权地址\n- 接收回调 `code`\n- 调用后端登录接口\n\n## 简化流程\n\n```text\n前端 → 授权服务器 → 回调(code) → 后端 → 登录态\n```\n\n聚合登录减少了重复开发，同时提高了账号体系的扩展性。',
  1,
  0,
  '2026-03-12 09:07:33',
  '2026-03-12 16:31:00'
);




INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  20,
  'HTML自定义模态框优选大全',
  '["前端"]',
  '# HTML 自定义模态框方案对比\n\n模态框是 Web 交互的核心组件，实现方式主要有三类。\n\n## 1️⃣ 原生 Dialog\n\n```html\n<dialog id="dlg">内容</dialog>\n```\n```js\ndlg.showModal();\n```\n\n- ✅ 语义好、可访问性高\n- ❌ 兼容性需考虑\n\n## 2️⃣ CSS + JS 实现\n\n- `position: fixed`
- 遮罩层 z-index 管理\n- ESC / 点击遮罩关闭\n\n## 3️⃣ 组件库方案\n\n- Element Plus / Ant Design\n- 功能完备但体积大\n\n在追求可控性和性能的项目中，推荐原生 `dialog` + 轻量封装。',
  5,
  1,
  '2026-03-12 15:53:42',
  '2026-03-13 11:08:28'
);


INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  21,
  'psql',
  '["后端"]',
  '# psql 与前端开发者的关系\n\n虽然 psql 是数据库 CLI，但在 Node / SSR 项目中，前端工程师不可避免会接触。\n\n## 常见使用场景\n\n- 本地调试 SQL\n- 验证 Prisma / TypeORM 生成语句\n- 排查生产数据问题\n\n## 必备命令速查\n\n```sql\n\\l        -- 列出数据库\n\\dt       -- 列出表\n\\d table  -- 表结构\nSELECT * FROM users LIMIT 10;\n```\n\n## 与前端联调\n\n- 通过 `pg` / `postgres` npm 包连接\n- 使用参数化查询防止 SQL 注入\n\n熟悉 psql，可以让前后端协作更高效、更安全。',
  1,
  39,
  '2026-03-13 03:34:07',
  '2026-03-13 13:27:48'
);



INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  22,
  'markdown解析渲染测试',
  '["前端"]',
  '# Markdown 渲染测试（前端视角）\n\nMarkdown 在前端通常经历三个阶段：\n\n1. **解析（parse）**：Markdown → AST\n2. **转换（transform）**：AST → HTML\n3. **渲染（render）**：HTML + CSS\n\n## 常见方案\n\n- `marked`（快，插件少）
- `markdown-it`（可扩展，工业级）
- `remark / rehype`（生态最完整）
\n\n## 渲染注意点\n\n- 代码高亮（highlight.js / prism）
- XSS 清洗（DOMPurify）
- 样式隔离（`.markdown-body`）
\n\nMarkdown 渲染质量，直接决定文档站与博客的用户体验。',
  1,
  2,
  '2026-03-13 11:05:18',
  '2026-03-13 13:20:58'
);


INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  24,
  'WebAssembly 与 EMCC',
  '["前端"]',
  '# WebAssembly 与 Emscripten（EMCC）\n\nWebAssembly（WASM）是一种可在浏览器中运行的低级字节码格式，旨在接近原生性能。\n\n## 核心优势\n\n- 高性能计算（音视频、加密、仿真）
- 复用 C / C++ / Rust 代码
- 与 JS 互操作能力强\n\n## EMCC 是什么\n\nEmscripten 是将 C/C++ 编译为 WASM 的工具链：\n\n```bash\nemcc hello.c -o hello.html\n```\n\n## 前端集成方式\n\n```javascript\nWebAssembly.instantiateStreaming(fetch(\'demo.wasm\'))\n  .then(({instance}) => {\n    instance.exports.add(1, 2);\n  });\n```\n\nWASM 并非取代 JS，而是补足 JS 在性能和系统级能力上的短板。',
  7,
  0,
  '2026-03-13 13:26:54',
  '2026-03-13 13:26:54'
);


INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  35,
  'Vue3 响应式源码结构',
  '["前端","Vue","源码"]',
  '# Vue 3 响应式系统源码结构\n\nVue 3 响应式核心位于 `@vue/reactivity` 包，主要模块如下：\n\n## 核心文件\n\n- `reactive.ts`：Proxy 包装入口\n- `effect.ts`：副作用管理与调度\n- `baseHandlers.ts`：get / set 拦截器\n- `track.ts / trigger.ts`：依赖收集与触发\n\n## 执行流程\n\n```text\n组件渲染 → effect → track → Proxy.get\n              ↑           ↓\n           trigger ← Proxy.set\n```\n\n## 面试要点\n\n- activeEffect 的作用\n- WeakMap / Map / Set 的依赖关系结构\n- effect 的 stop / cleanup 机制\n\n理解源码结构，是深入 Vue 3 响应式的必经之路。',
  1,
  0,
  NOW(),
  NOW()
);


INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  38,
  'Vue3 runtime-core 流程',
  '["前端","Vue","源码"]',
  '# Vue 3 runtime-core 执行流程\n\nruntime-core 是 Vue 3 跨平台能力的核心。\n\n## 关键模块\n\n- `createApp`\n- `mount`\n- `patch`\n- `componentUpdateFn`\n\n## 挂载流程\n\n```text\ncreateApp → createVNode → mount → patch\n```\n\n## diff 策略\n\n- 同层比较\n- PatchFlag 跳过静态节点\n- LIS 优化节点移动\n\nruntime 与 compiler 的配合，是 Vue 3 高性能的根本原因。',
  1,
  0,
  NOW(),
  NOW()
);



INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  40,
  'Vue WASM 图像滤镜实战',
  '["前端","WASM","实战"]',
  '# Vue + WASM 图像滤镜实战\n\n使用 Rust + WASM 在 Vue 中实现高性能图像滤镜。\n\n## 技术栈\n\n- Rust（image crate）\n- wasm-pack\n- Vue 3 + Vite\n\n## 核心逻辑\n\n1. JS 读取 ImageData\n2. 转入 WASM 线性内存\n3. Rust 处理像素\n4. JS 写回 Canvas\n\n## 关键代码\n\n```rust\n#[wasm_bindgen]\npub fn apply_grayscale(ptr: *mut u8, len: usize) {\n    let slice = unsafe { std::slice::from_raw_parts_mut(ptr, len) };\n    for i in (0..len).step_by(4) {\n        let gray = (slice[i] as f32 * 0.299 +\n                    slice[i+1] as f32 * 0.587 +\n                    slice[i+2] as f32 * 0.114) as u8;\n        slice[i..i+3].fill(gray);\n    }\n}\n```\n\n该方案性能远超纯 JS，适合实时滤镜场景。',
  1,
  0,
  NOW(),
  NOW()
);


INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  43,
  'WASM 前端定位与边界',
  '["前端","WASM"]',
  '# WASM 在前端的定位与边界\n\nWASM 的定位是 **JS 的性能补充**，而非替代。\n\n## 适合的场景\n- 密集计算\n- 音视频编解码\n- 加密算法\n\n## 不适合的场景\n- DOM 操作\n- 高频 UI 状态变更\n\n## 核心原则\n\n> **JS 管交互，WASM 管计算**\n\n理解边界，才能在设计上发挥 WASM 的最大价值。',
  1,
  0,
  NOW(),
  NOW()
);



INSERT INTO `word` (
  `id`,
  `word_name`,
  `tag`,
  `content`,
  `support_user_id`,
  `read_time`,
  `created_at`,
  `updated_at`
) VALUES (
  44,
  'Vue WASM 性能陷阱',
  '["前端","Vue","WASM"]',
  '# Vue 3 + WASM 常见性能陷阱\n\n## 1️⃣ 过度跨边界调用\n- JS ↔ WASM 调用成本高\n\n## 2️⃣ 错误的数据传递方式\n- 频繁拷贝 ArrayBuffer\n\n## 3️⃣ 阻塞主线程\n- 长时间 WASM 计算未拆分\n\n## 优化方案\n\n- 批量处理数据\n- 使用 Worker + WASM\n- 合理拆分计算任务\n\n真实项目中，架构设计往往比算法本身更影响性能。',
  1,
  0,
  NOW(),
  NOW()
);