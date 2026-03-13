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

// 验证token中间件
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: '未授权' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    console.log("*******************");
    console.log("上传的用户ID为:", req.userId);
    console.log("*******************")
    next();
  } catch (error) {
    return res.status(401).json({ message: '无效或过期的令牌' });
  }
}


// 上传专业名词
router.post('/word', verifyToken, async (req, res) => {
  try {
    const { word_name, tags, content } = req.body;
    const support_user_id = req.userId;

    // 验证数据
    if (!word_name || !content || !tags || !Array.isArray(tags)) {
      return res.status(400).json({ message: '专业名词名称、内容和标签不能为空' });
    }
    
    // // 确保标签数组不为空
    // if (tags.length === 0) {
    //   return res.status(400).json({ message: '请至少选择一个标签' });
    // }
    
    // 确保用户ID存在
    if (!support_user_id) {
      return res.status(400).json({ message: '用户ID不能为空' });
    }
    
 
    // 插入数据
    const [result] = await db.execute(
      'INSERT INTO word (word_name, content, tag, support_user_id) VALUES (?, ?, ?, ?)',
      [word_name, content, JSON.stringify(tags), support_user_id]
    );
    
    console.log("*******************");
    console.log("插入数据成功, 插入的id为:", result.insertId);
    console.log("*******************")

    res.status(201).json({
      message: '专业名词上传成功',
      word: {
        id: result.insertId,
        word_name,
        content,
        tags,
        support_user_id,
        created_at: new Date()
      }
    });

    console.log("*******************");
    console.log("上传成功,上传的专业名词为:", word_name,"上传用户ID为:", support_user_id);
    console.log("*******************")


    //上传成功后，在user表中增加上传贡献
    // 增加上传贡献
    await db.execute(
      'UPDATE user SET contribution_value = contribution_value + 1 WHERE id = ?',
      [support_user_id]
    );

    console.log("*******************");
    console.log("上传成功,上传用户ID为:", support_user_id,"上传贡献增加1");
    console.log("*******************")


  } catch (error) {
    console.error('上传专业名词失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});






// 更新专业名词 
router.put('/word/:id', verifyToken, async (req, res) => {
  try {
    const { word_name, tags, content } = req.body;
    const support_user_id = req.userId;

    // 验证数据
    if (!word_name || !content || !tags || !Array.isArray(tags)) {
      return res.status(400).json({ message: '专业名词名称、内容和标签不能为空' });
    }
    
    // // 确保标签数组不为空
    // if (tags.length === 0) {
    //   return res.status(400).json({ message: '请至少选择一个标签' });
    // }
    
    // 确保用户ID存在
    if (!support_user_id) {
      return res.status(400).json({ message: '用户ID不能为空' });
    }
    
 
    // 插入数据
    const [result] = await db.execute(
      'UPDATE word SET word_name = ?, content = ?, tag = ? WHERE id = ? AND support_user_id = ?',
      [word_name, content, JSON.stringify(tags), req.params.id, support_user_id]
    );
    
    console.log("*******************");
    console.log("更新数据成功, 更新的id为:", req.params.id);
    console.log("*******************")

    res.status(201).json({
      message: '专业名词上传成功',
      word: {
        id: result.insertId,
        word_name,
        content,
        tags,
        support_user_id,
        created_at: new Date()
      }
    });

    console.log("*******************");
    console.log("更新成功,更新的专业名词为:", word_name,"更新用户ID为:", support_user_id);
    console.log("*******************")

  } catch (error) {
    console.error('更新专业名词失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});



module.exports = router;