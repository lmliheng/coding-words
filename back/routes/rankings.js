const express = require('express');
const router = express.Router();

// 数据库连接
const mysql = require('mysql2/promise');
let db;

async function connectDB() {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    console.log('排行榜模块数据库连接成功');
  } catch (error) {
    console.error('排行榜模块数据库连接失败:', error);
    process.exit(1);
  }
}

connectDB();

// 获取热搜榜
router.get('/hot-search', async (req, res) => {
  try {
    // 查询word表中read_time最大的5个记录
    const [words] = await db.execute(
      'SELECT id, word_name, read_time FROM word ORDER BY read_time DESC LIMIT 5'
    );
    
    res.status(200).json({
      message: '获取热搜榜成功',
      hotSearch: words
    });
  } catch (error) {
    console.error('获取热搜榜失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 获取贡献榜
router.get('/contribution', async (req, res) => {
  try {
    // 查询user表中contribution_value最大的5个记录
    const [users] = await db.execute(
      'SELECT id, username, contribution_value FROM user ORDER BY contribution_value DESC LIMIT 5'
    );
    
    res.status(200).json({
      message: '获取贡献榜成功',
      contribution: users
    });
  } catch (error) {
    console.error('获取贡献榜失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;