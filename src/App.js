import React, { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState('');

  const handleInputChange = (event) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: newTodo }]);
    setNewTodo('');
  };

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleEditClick = (id, text) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  const handleEditChange = (event) => {
    setEditedTodoText(event.target.value);
  };

  const handleSaveEdit = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editedTodoText } : todo
    );
    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditedTodoText('');
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a new todo"
          value={newTodo}
          onChange={handleInputChange}
        />
        <button className='button' onClick={handleAddTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodoId === todo.id ? (
              <div>
                <input
                  type="text"
                  value={editedTodoText}
                  onChange={handleEditChange}
                /><br/>
                <button className='button' onClick={() => handleSaveEdit(todo.id)}>Save</button>
              </div>
            ) : (
              <div>
                {todo.text}
                <button className='button float' onClick={() => handleEditClick(todo.id, todo.text)}>Edit</button>
                <button className='button float' onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
