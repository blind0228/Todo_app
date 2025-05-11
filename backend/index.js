const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터
let todos = [];

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
    const { text } = req.body;
    const newTodo = { id: Date.now(), text };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  });

app.delete('/todos/:id', (req, res) => {
const { id } = req.params;
todos = todos.filter(todo => todo.id !== Number(id));
res.status(204).send(); // 삭제 성공, 반환할 데이터 없음
});
  

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);
});