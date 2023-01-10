import React from "react";
import './App.css';
import { useState, useEffect } from "react";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
		const todos = JSON.parse(localStorage.getItem('todos'));
		if (todos) {
			setTodos(todos);
		}
	}, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addItem = () => {
    if (todo != "") {
      setTodos([...todos, todo]);
      setTodo("");
    }
  }

  const deleteItem = (text) => {
    const newTodos = todos.filter((todo) => {
      return todo != text;
    });
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h1> React Todo App</h1>

      <div className="input-wrapper">
        <input
          type="text"
          name="todo"
          value={todo}
          placeholder="Create a new todo"
          onChange={(e) => {
            setTodo(e.target.value)
          }}
        />
        <button className="add-button" onClick={addItem}>Add</button>

        {todos.length > 0 ? (
          <ul className="todo-list">
            {todos.map((todo, index) => (
              <div className="todo">
                <li key={index}> {todo} </li>
                <button className="delete-button" onClick={() => { deleteItem(todo) }}>Delete</button>
              </div>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>No task</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default App;