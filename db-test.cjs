const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'devuser',        // 사용자 이름
  password: 'devpass', // 비밀번호
  database: 'devdb',       // 데이터베이스 이름
});

client.connect()
  .then(() => {
    console.log('✅ PostgreSQL 연결 성공!');
    return client.query('SELECT NOW()');
  })
  .then(res => {
    console.log('🕒 현재 시간:', res.rows[0]);
  })
  .catch(err => {
    console.error('❌ 연결 실패:', err);
  })
  .finally(() => {
    client.end();
  });