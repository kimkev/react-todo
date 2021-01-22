import React, { useState, useEffect } from 'react';
import './App.css';
//importing components
import Form from './components/Form';
import TodoList from './components/TodoList';

function App() {
  //state stuff
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  //run once when app starts
  useEffect(() => {
    getLocalTodos();
  }, [])
  // use effect
  useEffect(() => {
    saveLocalTodos();
    filterHandler();
  }, [todos, status])
  // functions
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed !== true))
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  }
  // save to local
  const saveLocalTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let localTodo = JSON.parse(localStorage.getItem('todos'))
      setTodos(localTodo);
    }
  }

  return (
    <div className="App">
      <header>
        <h1>Kevin's Todo List</h1>
      </header>
      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      />
      <footer className="footer">
        <a href="https://kimkev.github.io/" target="_self">Back to Home Page</a>
      </footer>
    </div>
  );
}

export default App;
