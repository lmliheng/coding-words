const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. 确保启用 CORS

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:3002', 'http://127.0.0.1:3002']
}));



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
    
    // 创建用户表
    await createUserTable();
    //查询用户表
    const [rows] = await db.execute('SELECT * FROM user WHERE id = 1');
    console.log('查询第一个用户数据:', rows);

  } catch (error) {
    console.error('数据库连接失败:', error);
    process.exit(1);
  }
}

// 创建用户表
async function createUserTable() {
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('用户表创建成功');
  } catch (error) {
    console.error('创建用户表失败:', error);
  }
}

// 路由 - 稍后在数据库连接后导入

// 根路径
app.get('/', (req, res) => {
  res.json({ message: '启动后端服务' });
});



// 启动服务器
async function startServer() {
  await connectDB();
  
      // 数据库连接成功后再导入路由
  const authRoutes = require('./routes/auth');
  const uploadRoutes = require('./routes/upload');
  const rankingsRoutes = require('./routes/rankings');
  const manageRoutes = require('./routes/manage');
  const wordRoutes = require('./routes/word');
  const searchRoutes = require('./routes/search');
  app.use('/api/auth', authRoutes);
  app.use('/api/upload', uploadRoutes);
  app.use('/api/rankings', rankingsRoutes);
  app.use('/api/manage', manageRoutes);
  app.use('/api/Onlyword', wordRoutes);
  app.use('/api/search', searchRoutes);
  
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`服务器运行在端口 ${PORT}`);
  });
}




// 导出数据库连接
module.exports = { db };

// 启动服务器
startServer();
