const mysql = require('mysql2/promise');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");

dotenv.config();

// 数据库连接
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
    console.log('数据库连接成功');
 
    //查询用户表
    const [rows] = await db.execute('SELECT * FROM user WHERE id = 1');
    console.log('查询第一个用户数据:', rows);

  } catch (error) {
    console.error('数据库连接失败:', error);
    process.exit(1);
  }
}

connectDB();



// 更新用户信息
router.put('/update-info', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: '未授权' });
  }
  
  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, password } = req.body;
    
    // 验证数据
    if (!username) {
      return res.status(400).json({ message: '用户名不能为空' });
    }
    
    // 构建更新语句
    let updateQuery = 'UPDATE user SET username = ?';
    let updateParams = [username];
    
    // 如果提供了密码，添加到更新语句
    if (password) {
      // 密码加密
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateQuery += ', password = ?';
      updateParams.push(hashedPassword);
    }
    
    updateQuery += ' WHERE id = ?';
    updateParams.push(decoded.id);
    
    // 执行更新
    await db.execute(updateQuery, updateParams);
    
    // 获取更新后的用户信息
    const [updatedUser] = await db.execute(
      'SELECT id, username, email, contribution_value, created_at, updated_at FROM user WHERE id = ?',
      [decoded.id]
    );
    
    res.status(200).json({
      message: '个人信息更新成功',
      user: updatedUser[0]
    });
  } catch (error) {
    console.error('更新用户信息失败:', error);
    res.status(500).json({ message: '服务器错误' });
  }
});

module.exports = router;
