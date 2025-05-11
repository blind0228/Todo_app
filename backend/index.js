const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터
app.get('/', (req, res) => {
  res.send('백엔드 서버 동작 중!');
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);
});