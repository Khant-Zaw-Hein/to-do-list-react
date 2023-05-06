
import './App.css';
import React, { useState, useEffect } from 'react';
import ToDoList from './components/TodoList'
import { GetAllTodoList, AddNewTodo } from './todoAPI'

const App = () => {
  const [inputValue, setInputValue] = useState("")
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const getAllToDo = async () => {
      const todoList = await GetAllTodoList()
      console.log('todoList', todoList)
      setItemList(todoList)
    }

    getAllToDo()
  }, [])


  async function addTodo(event) {

    try {
      const responseStatus = await AddNewTodo({ Description: inputValue });
      console.log("responseStatus", responseStatus)
      if (responseStatus === 201) {
        console.log("new todo item has been added")
        //when adding success, refresh the list
        const todoList = await GetAllTodoList()
        console.log('todoList', todoList)
        setItemList(todoList)
      } else { throw new Error("failed to add new todo item."); }
    } catch (error) {
      console.log("Errorrr in addTodo: ", error);
    }
  }

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
    // console.log(event.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter') { addTodo(); }
  }

  return (
    <div className='App'>
      To Do List practice<br /><br />
      {/* 1. Input here */}
      <input
        type='text'
        placeholder='add new item'
        value={inputValue}
        onChange={handleInputValueChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTodo}>➕</button>

      
      {/* 2. Item List */}
      <ToDoList itemList={itemList} setItemList={setItemList}/>
    </div>
  );
}

export default App;
