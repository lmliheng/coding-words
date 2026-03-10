const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

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
    console.log('上传模块数据库连接成功');
  } catch (error) {
    console.error('上传模块数据库连接失败:', error);
    process.exit(1);
  }
}

connectDB();


//*************************************************************************************************************** */

router.get('/', async (req, res) => {
  const searchTerm = req.query.q;
  if (!searchTerm) {
    return res.status(400).json({ message: '请输入搜索关键词' });
  }
  console.log("***************************************")
  console.log(`用户搜索关键词: ${searchTerm}`);

  try {
    // 连接数据库
    if (!db) {
      await connectDB();
    }

    // 执行搜索查询
    const [results] = await db.execute(
      `SELECT * FROM word WHERE 
       word_name LIKE ? `,
      [`%${searchTerm}%`]
    );
    console.log("***************************************")
    console.log(`数据库搜索结果: ${results}`);
    console.log("***************************************")
 
    // 返回搜索结果
    res.json(results);

  } catch (error) {
    console.error('搜索失败:', error);
    res.status(500).json({ message: '搜索失败，请稍后重试' });
  }
});

module.exports = router;

