-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: codeword
-- ------------------------------------------------------
-- Server version	8.0.45

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `word`
--

DROP TABLE IF EXISTS `word`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `word` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `word_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '词汇名称',
  `tag` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT '' COMMENT '标签（分类）',
  `content` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '文件路径（指向对应md文件）',
  `support_user_id` int DEFAULT '0' COMMENT '提供用户ID',
  `read_time` int DEFAULT '0' COMMENT '阅读',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_word_name` (`word_name`),
  KEY `idx_word_name` (`word_name`),
  KEY `idx_tag` (`tag`),
  KEY `idx_support_user_id` (`support_user_id`),
  KEY `idx_read_time` (`read_time`),
  CONSTRAINT `chk_read_time` CHECK ((`read_time` >= 0)),
  CONSTRAINT `chk_support_user` CHECK ((`support_user_id` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='词汇表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `word`
--

/*!40000 ALTER TABLE `word` DISABLE KEYS */;
INSERT INTO `word` VALUES (2,'单例模式','[\"前端\",\"后端\"]','111',1,34,'2026-03-10 03:21:38','2026-04-22 14:43:08'),(4,'java','[\"后端\"]','java\n===\n\n面向对象编程语言\n\n## java',1,78,'2026-03-10 03:26:23','2026-03-13 12:21:53'),(5,'Crontab','[\"后端\"]','Crontab.md',1,11,'2026-03-10 05:28:36','2026-03-13 10:58:28'),(6,'make','[\"后端\"]','make.md',1,8,'2026-03-10 05:29:14','2026-03-13 10:48:49'),(7,'openSSL','[\"区块链\"]','openSSL.md',1,6,'2026-03-10 05:29:39','2026-03-13 05:20:13'),(8,'pgAdmin','[\"后端\"]','pgAdmin.md',1,0,'2026-03-10 05:29:54','2026-03-12 16:31:00'),(9,'HTML DOM Input Search 对象','[\"前端\"]','1',1,0,'2026-03-11 13:45:52','2026-03-12 16:31:00'),(10,'HTML DOM Document 对象','[\"前端\"]','1',1,0,'2026-03-11 13:45:58','2026-03-12 16:31:00'),(11,'CSS中<a>标签的属性归类','[\"前端\"]','CSS主要通过伪类来管理<a>标签的不同交互状态，并结合盒模型、视觉效果、布局等属性来定义其最终外观和行为，实现从基础链接到复杂交互组件的样式控制。在CSS中，通常不直接设置<a>标签的属性（如href），而是通过CSS选择器来为其添加样式。\n',1,2,'2026-03-11 14:00:49','2026-03-13 11:08:47'),(12,'JSON格式','[\"前端\"]','11',1,0,'2026-03-11 14:15:06','2026-03-12 16:31:00'),(13,'logo设计网站汇总','[\"艺术\"]','钙网 https://www.uugai.com/',1,1,'2026-03-11 15:01:15','2026-03-12 16:31:00'),(14,'抠图网站推荐','[\"艺术\"]','https://www.remove.bg/',1,0,'2026-03-11 15:25:32','2026-03-12 16:31:00'),(15,'中文网页中的字体选型及开发指南','[\"前端\"]','https://weixiang.github.io/posts/the-font-selection-and-development-guide-in-chinese-web-pages/',1,4,'2026-03-11 15:40:58','2026-03-12 16:31:00'),(16,'CSS <text>文本溢出 CSS 截断','[\"前端\"]','1',1,2,'2026-03-11 15:52:38','2026-03-12 16:31:00'),(17,'css<input>密码框密码的隐显','[\"前端\"]','<input type=\"password\" placeholder=\"密码\" data-password=\"password\">',1,0,'2026-03-11 16:11:16','2026-03-12 16:31:00'),(18,'实现注册业务中的邮箱验证码功能','[\"前端\",\"后端\",\"移动开发\"]','https://blog.csdn.net/qq_42263280/article/details/129584017',1,1,'2026-03-12 08:59:40','2026-03-13 11:09:03'),(19,'聚合登录的实现','[\"前端\"]','https://uniqueker.top/',1,0,'2026-03-12 09:07:33','2026-03-12 16:31:00'),(20,'HTML自定义模态框优选大全','[\"前端\"]','111',5,1,'2026-03-12 15:53:42','2026-03-13 11:08:28'),(21,'psql','[\"后端\"]','psql\n ===\n\nPostgresSQL 数据库系统命令行工具\n\n## 介绍\n`psql` 是 PostgresSQL 数据库系统中自带的一个非常强大的命令行工具。它允许用户与 PostgreSQL 数据库进行交互，执行 SQL 查询，管理数据库和表空间，以及执行各种数据库相关的管理任务。`psql` 类似于 MySQL 的 `mysql` 命令行客户端，但它提供了更多功能和更高级的特性。\n\n以下是一些 `psql` 的关键特性和使用方法：\n\n### 连接到数据库\n你可以使用以下命令连接到 PostgreSQL 数据库：\n```bash\npsql [options] [dbname] [username]\n```\n例如：\n```bash\npsql -h localhost -p 5432 -U myuser mydatabase\n```\n这里 `-h` 指定主机名，`-p` 指定端口号，`-U` 指定用户名，`mydatabase` 是你要连接的数据库名称。\n\n### 执行 SQL 查询\n一旦连接到数据库，你就可以在 `psql` 提示符下输入 SQL 查询并执行它们：\n```sql\nSELECT * FROM mytable;\n```\n\n### 使用元命令\n`psql` 支持一系列以斜杠开头的元命令，例如：\n- `\\d` 显示所有模式下的所有表\n- `\\dt` 显示当前模式下的所有表\n- `\\du` 显示数据库中的所有用户\n- `\\l` 列出所有数据库\n- `\\q` 退出 `psql`\n\n### 自动补全和历史记录\n`psql` 提供了命令行历史和自动补全功能，使用户能够更高效地工作：\n- 使用 Tab 键进行自动补全\n- 使用向上和向下箭头键浏览命令历史\n\n### 事务控制\n默认情况下，`psql` 中的 SQL 命令会自动提交。但你也可以手动控制事务：\n```sql\nBEGIN;\n-- 执行一些 SQL 命令\nCOMMIT; -- 或者 ROLLBACK;\n```\n\n### 输出格式化\n`psql` 支持多种输出格式，例如：\n- `\\pset format unaligned` 设置输出为非对齐格式\n- `\\pset tuples_only` 只显示查询结果，不显示标题和计数\n\n### 导入和导出数据\n`psql` 可以用于导入和导出数据，例如从 SQL 文件导入数据：\n```bash\npsql -h localhost -U myuser mydatabase < data.sql\n```\n\n### 脚本和批处理\n你可以将 SQL 命令写入脚本文件，并使用 `psql` 执行它们：\n```bash\npsql -h localhost -U myuser mydatabase -f script.sql\n```\n\n### 插件和扩展\n`psql` 支持插件，允许用户扩展其功能。例如，`pgcli` 就是一个为 `psql` 提供增强功能的插件。\n\n### 文档和帮助\n`psql` 提供了详细的在线帮助：\n```sql\n\\help\n```\n这将列出所有可用的元命令及其描述。\n\n`psql` 是 PostgreSQL 数据库管理员和开发人员的必备工具，它提供了灵活和高效的方式来管理数据库。',1,39,'2026-03-13 03:34:07','2026-03-13 13:27:48'),(22,'markdown解析渲染测试','[\"前端\"]','# Markdown 元素示例\n\n此文档展示了如何将常见的Markdown元素渲染为HTML，并应用\"GitHub Markdown CSS\"样式。\n\n## 1. 表格\n\n一个展示不同编程语言特性的简单表格：\n\n| 语言 | 类型 | 主要用途 |\n|------|------|----------|\n| Python | 动态，解释型 | Web开发，数据科学，AI |\n| JavaScript | 动态，解释型 | Web前端，服务器端（Node.js） |\n| Java | 静态，编译型 | 企业级应用，安卓开发 |\n| C++ | 静态，编译型 | 系统/游戏开发，高性能计算 |\n\n## 2. 列表\n\n### 无序列表（项目符号）\n\n- 前端技术栈\n  - HTML\n  - CSS\n  - JavaScript\n- 版本控制系统\n  - Git\n\n### 有序列表（编号）\n\n1. 打开命令行/终端\n2. 进入项目目录：`cd your-project`\n3. 初始化Git仓库：`git init`\n4. 添加文件到暂存区：`git add .`\n\n## 3. 代码段\n\n### 行内代码\n\n在段落中使用 `console.log(\'Hello World\')` 来打印信息。\n\n### 代码块（无语法高亮）\n\n```markdown\n# 这是一个Markdown标题\n## 这是一个二级标题\n这是一个普通段落。\n```\n### 代码块（有语法高亮）\n\n```javascript\nfunction add(a, b) {\n    return a + b;\n}\n```\n\n\n\n## 4. 引用\n\n> 这是Markdown中的引用块（Blockquote）。它通常用于突出显示来自其他来源的文字，或者表示一段重要的论述。\n>\n> 引用块内可以包含多个段落、列表，甚至其他Markdown元素。\n\n> 嵌套引用示例：\n> \n> > 这是一段被嵌套的引用。\n\n## 5. 强调文本与分隔线\n\n文本可以设置为**粗体（加粗）**或*斜体（强调）*，甚至可以***粗斜体结合***。\n\n---\n\n上面是一条水平分隔线，用于分割不同的内容区块。\n\n## 6. 链接与图片\n\n这是一个指向[GitHub官网](https://www.github.com)的链接。\n\n这是一个图片示例（由于文档中没有包含实际的图片标签，此处仅用替代文本表示，在真实Markdown中会被渲染为img标签）：\n\n![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)\n\n## 7. 任务列表\n\n- [ ] 未完成的任务\n- [x] 已完成的任务\n- [ ] 另一个待办项\n\n以上内容涵盖了Markdown中常用的核心元素，当被Markdown解析器转换并由`github-markdown.css`渲染后，会呈现与GitHub风格一致的视觉效果。',1,2,'2026-03-13 11:05:18','2026-03-13 13:20:58'),(23,'Markdown解析，渲染，编辑','[\"前端\"]','## 解析器\n\n### markdown-it\n\nmarkdown-it 是一个现代化的Markdown解析器，具有以下特点：\n\n### 引入\n\n```javascript\n// 通过npm安装\nnpm install markdown-it --save\n\n// 在JavaScript中引入\nconst MarkdownIt = require(\'markdown-it\');\n// 或ES6模块导入\nimport MarkdownIt from \'markdown-it\';\n\n// 创建实例\nconst md = new MarkdownIt();\n\n// 解析Markdown\nconst result = md.render(\'# 标题\\n\\n这是一段文本。\');\nconsole.log(result);\n```\n\n### 基本用法\n\n```javascript\n// 基本配置\nconst md = new MarkdownIt({\n  html: true,         // 启用HTML标签\n  breaks: true,       // 将换行符转换为<br>\n  linkify: true,      // 自动转换URL为链接\n  typographer: true,  // 启用排版优化\n});\n\n// 解析Markdown内容\nconst markdownContent = `\n# 主标题\n\n这是一个段落，包含**粗体**和*斜体*文本。\n\n- 列表项1\n- 列表项2\n- 列表项3\n\n[链接示例](https://example.com)\n`;\n\nconst htmlOutput = md.render(markdownContent);\ndocument.getElementById(\'content\').innerHTML = htmlOutput;\n```\n\n## 渲染器：GitHub-markdown-css\n\nGitHub-markdown-css 是GitHub风格的Markdown样式表。\n\n### 使用\n\n```html\n<!DOCTYPE html>\n<html lang=\"zh-CN\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Markdown渲染示例</title>\n    \n    <!-- 引入GitHub-markdown-css -->\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.5.0/github-markdown.min.css\">\n    \n    <style>\n        .markdown-body {\n            box-sizing: border-box;\n            min-width: 200px;\n            max-width: 980px;\n            margin: 0 auto;\n            padding: 45px;\n        }\n        \n        @media (max-width: 767px) {\n            .markdown-body {\n                padding: 15px;\n            }\n        }\n    </style>\n</head>\n<body>\n    <article class=\"markdown-body\" id=\"content\">\n        <!-- Markdown生成的HTML将在这里显示 -->\n    </article>\n\n    <script>\n        // Markdown内容\n        const markdownContent = `# Markdown文章示例\n\n## 章节标题\n\n这是一段示例文本，展示如何将Markdown转换为带样式的HTML。\n\n### 功能特点\n- 支持代码高亮\n- 表格渲染\n- 任务列表\n- 数学公式\n\n\\`\\`\\`javascript\n// 代码示例\nfunction helloWorld() {\n    console.log(\"Hello, World!\");\n}\n\\`\\`\\`\n\n> 引用：这是GitHub风格的Markdown渲染。`;\n\n        // 解析Markdown\n        const md = new MarkdownIt({\n            html: true,\n            breaks: true,\n            linkify: true,\n            typographer: true,\n            highlight: function (str, lang) {\n                if (lang && hljs.getLanguage(lang)) {\n                    try {\n                        return hljs.highlight(str, { language: lang }).value;\n                    } catch (__) {}\n                }\n                return \'\';\n            }\n        });\n\n        // 渲染到页面\n        document.getElementById(\'content\').innerHTML = md.render(markdownContent);\n    </script>\n</body>\n</html>\n```\n\n## 编辑器\n\n1. Vditor\n2. bytemd\n\n\n\n',1,2,'2026-03-13 13:08:09','2026-03-13 13:27:26'),(24,'哈哈哈哈','[]','1111\n\n',7,0,'2026-03-13 13:26:54','2026-03-13 13:26:54');
/*!40000 ALTER TABLE `word` ENABLE KEYS */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-23 15:45:42
