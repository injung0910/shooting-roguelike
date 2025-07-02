// db/client.js
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',        // Docker 컨테이너 외부에서 접속 시에는 로컬 DB IP
  port: 5432,
  user: 'devuser',
  password: 'devpass',     // 비밀번호는 실제 설정에 따라 변경
  database: 'devdb',
});

client.connect();

module.exports = client;