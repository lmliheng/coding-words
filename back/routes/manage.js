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
    console.log("token中间件验证成功");
    console.log("*******************")
    next();
  } catch (error) {
    return res.status(401).json({ message: '无效或过期的令牌' });
  }
}

//*************************************************************************************************************** */


// 获取用户上传的专业名词（带分页）
router.get('/words', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    
    console.log("*******************");
    console.log("分页参数:");
    console.log("当前页码:", page);
    console.log("每页数量:", limit);
    console.log("偏移量:", offset);
    console.log("*******************");
    console.log('参数检查:', {
        userId: typeof userId,  // 应该是数字
        limit: typeof limit,    // 应该是数字
        limitValue: limit,
        offset: typeof offset,  // 应该是数字
        offsetValue: offset
    });
    console.log("*******************");

// 在 MySQL 8.0.22 及部分 mysql2 版本中，LIMIT 占位符参数如果是纯数字类型，可能会触发此错误。
// 原因分析 该问题常见于分页查询时，LIMIT ?, ? 的参数被直接传入数字类型，而 mysql2 在某些版本中会将其解析为不兼容的类型，导致执行失败。另外，如果在计算偏移量时进行了数值运算（如 pageNumber * 20），结果仍为数字，也会触发相同问题。
// 解决方法 可以通过将数字参数转换为字符串，或直接在 SQL 中拼接数值来避免此错误

    // 查询用户上传的专业名词
    const [words] = await db.execute(
      'SELECT id, word_name, tag, read_time, created_at FROM word WHERE support_user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [userId.toString(), limit.toString(), offset.toString()]  //Q: 为什么要转换为字符串？
    );


    console.log("*******************");
    console.log("数据库查询完毕....");
    console.log("*******************")
    
    // 解析tag JSON
    const formattedWords = words.map(word => ({
      ...word,
      tag: JSON.parse(word.tag)
    }));
    
    // 查询总数
    const [countResult] = await db.execute('SELECT COUNT(*) as total FROM word WHERE support_user_id = ?', [userId]);
    const total = countResult[0].total;
    
    res.status(200).json({
      message: '获取专业名词成功',
      words: formattedWords,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('获取专业名词失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});



// 删除专业名词
router.delete('/word/:id', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const wordId = req.params.id;
    
    // 检查专业名词是否存在且属于当前用户
    const [existingWords] = await db.execute(
      'SELECT id FROM word WHERE id = ? AND support_user_id = ?',
      [wordId, userId]
    );
    
    if (existingWords.length === 0) {
      return res.status(404).json({ message: '专业名词不存在或不属于当前用户' });
    }
    
    // 执行删除
    await db.execute('DELETE FROM word WHERE id = ?', [wordId]);
    console.log("*******************");
    console.log("专业名词删除成功");
    console.log("*******************");
    await db.execute(
      'UPDATE user SET contribution_value = contribution_value - 1 WHERE id = ?',
      [userId]

    );
    console.log("用户"+userId+"贡献值减1成功");
    console.log("*******************");
    
    res.status(200).json({ message: '专业名词删除成功' });
  } catch (error) {
    console.error('删除专业名词失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});


module.exports = router;