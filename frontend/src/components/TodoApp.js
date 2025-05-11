import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function TodoApp() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const handleAdd = async () => {
    if (input.trim() === '') return;
  
    try {
      const res = await axios.post('http://localhost:5000/todos', {
        text: input,
      });
      setTodos([...todos, res.data]);
      setInput('');
    } catch (err) {
      console.error(err);
    }
  };
  
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/todos');
      setTodos(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div style={{ padding: '20px' }}>
      <h2>📋 Todo List</h2>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="할 일을 입력하세요" 
      />
      <button onClick={handleAdd}>추가</button>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.text} <button onClick={() => handleDelete(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
