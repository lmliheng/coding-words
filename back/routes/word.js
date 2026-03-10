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



// 获取单个专业名词详情
router.get('/word/:id', async (req, res) => {
  try {
    const wordId = req.params.id;
    
    // 查询专业名词详情
    const [words] = await db.execute(
      'SELECT id, word_name, content, tag, support_user_id, read_time, created_at, updated_at FROM word WHERE id = ?',
      [wordId]
    );
    
    if (words.length === 0) {
      return res.status(404).json({ message: '专业名词不存在' });
    }
    
    const word = words[0];
    // 解析tag JSON
    word.tag = JSON.parse(word.tag);
    
    res.status(200).json({
      message: '获取专业名词详情成功',
      word
    });
  } catch (error) {
    console.error('获取专业名词详情失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});




// 增加阅读量
router.put('/word/:id/read', async (req, res) => {
  try {
    const wordId = req.params.id;
    
    // 检查专业名词是否存在
    const [existingWords] = await db.execute(
      'SELECT id FROM word WHERE id = ?',
      [wordId]
    );
    
    if (existingWords.length === 0) {
      return res.status(404).json({ message: '专业名词不存在' });
    }
    
    // 增加阅读量
    await db.execute(
      'UPDATE word SET read_time = read_time + 1 WHERE id = ?',
      [wordId]
    );
    
    res.status(200).json({ message: '阅读量增加成功' });
  } catch (error) {
    console.error('增加阅读量失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;