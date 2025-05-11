const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// 라우터
const Todo = require('./models/Todo');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('✅ MongoDB 연결 성공')).catch(err => console.error('❌ MongoDB 연결 실패:', err));

app.get('/todos', async (req, res) => {
const todos = await Todo.find().sort({ createdAt: -1 }); // 최신순 정렬
res.json(todos);
});


app.post('/todos', async (req, res) => {
    const { text } = req.body;
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.status(201).json(newTodo);
});

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
});
  
  

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중`);
});
