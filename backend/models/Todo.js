// backend/models/Todo.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Todo', todoSchema);
