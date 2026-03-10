// 您提供的原始数据
const data = '[{"id":7,"word_name":"openSSL","tag":"[\"区块链\"]","content":"openSSL.md","support_user_id":2,"read_time":3,"created_at":"2026-03-10T05:29:39.000Z","updated_at":"2026-03-10T15:54:26.000Z"}]';

// 方法1：直接使用JSON.parse()解析
const parsedData = JSON.parse(data);

console.log(parsedData);