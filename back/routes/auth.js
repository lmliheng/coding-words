const mysql = require('mysql2/promise');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');




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

router.get('/test', async (req, res) => {
console.log('*************************')
console.log('db 是否存在:', typeof db !== 'undefined');  // 应该是 true
console.log('*************************')
  res.status(200).json({ message: '测试成功' });
});


// 主页身份认证
router.get('/check-auth', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: '未授权' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    console.log('用户ID:', userId,"处于登录状态");
    const [userInfo] = await db.execute(
      'SELECT * FROM user WHERE id = ?',
      [userId]
    );
    res.status(200).json({ message: '授权成功', user: userInfo });
  } catch (error) {
    res.status(401).json({ message: '无效或过期的令牌' });
  }
});



// 注册
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 检查用户是否已存在
    const [existingUsers] = await db.execute(
      'SELECT * FROM user WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      return res.status(400).json({ message: '用户名或邮箱已存在' });
    }

    // 密码加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建新用户
    const [result] = await db.execute(
      'INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );

    // 生成JWT令牌
    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ 
      message: '注册成功',
      user: {
        id: result.insertId,
        username: username,
        email: email
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});





// 登录路由
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('*****************************');
    console.log('邮箱:', email, '密码:', password);
    console.log('*****************************');
    // 检查用户是否存在
    const [existingUsers] = await db.execute(
      'SELECT * FROM user WHERE email = ?',
      [email]
    );

    if (existingUsers.length === 0) {
       console.log('邮箱错误');
      return res.status(400).json({ message: '邮箱或密码错误' });
    }

    const user = existingUsers[0];
   
    console.log('查询到的用户:', user);
    console.log('*****************************');

    // 验证密码
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
         // 密码加密
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
      console.log('密码错误');
      console.log('加密后的密码:', hashedPassword);
      console.log('*****************************');
      return res.status(400).json({ message: '邮箱或密码错误' });
    }

    // 生成JWT令牌
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      console.log('JWT令牌:', token);
      console.log('*****************************');

    res.status(200).json({ 
      status: 200,
      message: '登录成功',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '服务器错误' });
  }
});

// 更新用户信息
router.put('/update-info', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: '未授权' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, email, password } = req.body;
    
    // 验证数据
    if (!username || !email) {
      return res.status(400).json({ message: '用户名和邮箱不能为空' });
    }
    
    // 构建更新语句
    let updateQuery = 'UPDATE user SET username = ?, email = ?';
    let updateParams = [username, email];
    
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
