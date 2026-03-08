psql
===

PostgresSQL 数据库系统命令行工具

## 介绍
`psql` 是 PostgresSQL 数据库系统中自带的一个非常强大的命令行工具。它允许用户与 PostgreSQL 数据库进行交互，执行 SQL 查询，管理数据库和表空间，以及执行各种数据库相关的管理任务。`psql` 类似于 MySQL 的 `mysql` 命令行客户端，但它提供了更多功能和更高级的特性。

以下是一些 `psql` 的关键特性和使用方法：

### 连接到数据库
你可以使用以下命令连接到 PostgreSQL 数据库：
```bash
psql [options] [dbname] [username]
```
例如：
```bash
psql -h localhost -p 5432 -U myuser mydatabase
```
这里 `-h` 指定主机名，`-p` 指定端口号，`-U` 指定用户名，`mydatabase` 是你要连接的数据库名称。

### 执行 SQL 查询
一旦连接到数据库，你就可以在 `psql` 提示符下输入 SQL 查询并执行它们：
```sql
SELECT * FROM mytable;
```

### 使用元命令
`psql` 支持一系列以斜杠开头的元命令，例如：
- `\d` 显示所有模式下的所有表
- `\dt` 显示当前模式下的所有表
- `\du` 显示数据库中的所有用户
- `\l` 列出所有数据库
- `\q` 退出 `psql`

### 自动补全和历史记录
`psql` 提供了命令行历史和自动补全功能，使用户能够更高效地工作：
- 使用 Tab 键进行自动补全
- 使用向上和向下箭头键浏览命令历史

### 事务控制
默认情况下，`psql` 中的 SQL 命令会自动提交。但你也可以手动控制事务：
```sql
BEGIN;
-- 执行一些 SQL 命令
COMMIT; -- 或者 ROLLBACK;
```

### 输出格式化
`psql` 支持多种输出格式，例如：
- `\pset format unaligned` 设置输出为非对齐格式
- `\pset tuples_only` 只显示查询结果，不显示标题和计数

### 导入和导出数据
`psql` 可以用于导入和导出数据，例如从 SQL 文件导入数据：
```bash
psql -h localhost -U myuser mydatabase < data.sql
```

### 脚本和批处理
你可以将 SQL 命令写入脚本文件，并使用 `psql` 执行它们：
```bash
psql -h localhost -U myuser mydatabase -f script.sql
```

### 插件和扩展
`psql` 支持插件，允许用户扩展其功能。例如，`pgcli` 就是一个为 `psql` 提供增强功能的插件。

### 文档和帮助
`psql` 提供了详细的在线帮助：
```sql
\help
```
这将列出所有可用的元命令及其描述。

`psql` 是 PostgreSQL 数据库管理员和开发人员的必备工具，它提供了灵活和高效的方式来管理数据库。