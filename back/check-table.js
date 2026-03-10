const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

async function checkTableStructure() {
  try {
    // 连接数据库
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
    
    console.log('数据库连接成功');
    
    // 检查word表结构
    console.log('检查word表结构:');
    const [wordTable] = await db.execute('DESCRIBE word');
    console.table(wordTable);
    
    // 检查user表结构
    console.log('\n检查user表结构:');
    const [userTable] = await db.execute('DESCRIBE user');
    console.table(userTable);
    
    // 关闭连接
    await db.end();
  } catch (error) {
    console.error('检查表结构失败:', error);
  }
}

checkTableStructure();