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



router.get('/test', async (req, res) => {
console.log('*************************')
console.log('db 是否存在:', typeof db !== 'undefined');  // 应该是 true
console.log('*************************')
  res.status(200).json({ message: '测试成功' });
});



// 生成随机验证码 
function generateRandomCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


// 验证码存储（使用内存存储，生产环境建议使用Redis）
const verificationCodes = new Map();

// 验证码过期时间（5分钟）
const CODE_EXPIRE_TIME = 5 * 60 * 1000;

// 清理过期验证码的函数
function cleanExpiredCodes() {
  const now = Date.now();
  for (const [email, data] of verificationCodes.entries()) {
    if (now - data.timestamp > CODE_EXPIRE_TIME) {
      verificationCodes.delete(email);
    }
  }
}



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
    const { username, email, password, verificationCode } = req.body;
    
    console.log('*****************************');
    console.log('注册请求:', { username, email, verificationCode });
    console.log('*****************************');
    
    // 验证验证码
    if (!verificationCode) {
      return res.status(400).json({ message: '请输入验证码' });
    }
    
    // 清理过期验证码
    cleanExpiredCodes();
    
    // 获取存储的验证码数据 
    const storedCodeData = verificationCodes.get(email);
    console.log('存储的验证码数据:', storedCodeData);
    
    if (!storedCodeData) {
      return res.status(400).json({ message: '验证码已过期，请重新获取' });
    }
    
    // 验证验证码是否匹配
    if (storedCodeData.code !== verificationCode) {
      return res.status(400).json({ message: '验证码错误' });
    }
    
    // 验证通过后删除验证码
    verificationCodes.delete(email);
    
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



// 发送验证码
router.post('/send-code', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: '请输入邮箱' });
    }
    
    const code = generateRandomCode();
    
    console.log('*****************************');
    console.log(email, '邮箱用户注册账号请求发送验证码');
    console.log('生成验证码:', code, "等待发送");
    console.log('*****************************');
    
    // 清理过期验证码
    cleanExpiredCodes();
    
    // 存储验证码（使用邮箱作为key）！！！
    verificationCodes.set(email, {
      code: code,
      timestamp: Date.now()
    });
    
    console.log('验证码已存储:', verificationCodes.get(email));
    
    // Create a transporter using Ethereal test credentials.
    // For production, replace with your actual SMTP server details.
    const transporter = nodemailer.createTransport({
      host: "smtp.126.com",
      port: 465,
      secure: true, // Use true for port 465, false for port 587
      auth: {
        user: "liheng2137@126.com",
        pass: "TSiDAVDXpTD7rnMD",
      },
    });
    
    console.log('*****************************');
    console.log('Nodemailer transporter 配置完成');
    console.log('*****************************');
    
    // Send an email using async/await
    const info = await transporter.sendMail({
      from: '"李恒" <liheng2137@126.com>',
      to: email,
      subject: "CodeWord 注册验证码",
      text: `您的验证码是: ${code}，有效期5分钟，请勿泄露给他人。`, // Plain-text version of the message
      html: `<b>您的验证码是: ${code}</b><br><br>有效期5分钟，请勿泄露给他人。`, // HTML version of the message
    });
    
    console.log("验证码已发送", info.messageId);
    res.status(200).json({ message: '验证码发送成功' });
    
  } catch (error) {
    console.error('发送验证码失败:', error);
    res.status(500).json({ message: '发送验证码失败，请稍后重试' });
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

// 修改密码
router.post('/updata-password', async (req, res) => {



});



module.exports = router;
