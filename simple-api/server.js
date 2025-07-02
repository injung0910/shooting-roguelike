// server.js
const express = require('express');
const client = require('./db/client');

const app = express();
app.use(express.json());

// 점수 리스트 조회
app.get('/scores', async (req, res) => {
  const result = await client.query('SELECT * FROM scores ORDER BY score DESC');
  res.json(result.rows);
});

// 점수 저장
app.post('/scores', async (req, res) => {
  const { username, score } = req.body;
  await client.query('INSERT INTO scores (username, score) VALUES ($1, $2)', [username, score]);
  res.send('저장 완료!');
});

app.listen(3001, () => {
  console.log('✅ 서버 실행 중: http://localhost:3001');
});