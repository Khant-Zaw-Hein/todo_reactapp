import '../Todo/Todo.css';
import React, { useState, useEffect } from 'react';
import ToDoList from '../Todo/TodoList';
import { GetAllTodoList, AddNewTodo, GetAllTodoListByUserAccountId } from '../../api/todoAPI';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

const Todo = () => {
  const [inputValue, setInputValue] = useState("")
  const [itemList, setItemList] = useState([]);
  const [dialogueIsOpen, setDialogIsOpen] = useState(false);

  // useEffect(() => {
  //   const getAllToDo = async () => {
  //     const todoList = await GetAllTodoList()
  //     console.log('todoList', todoList)
  //     setItemList(todoList)
  //   }

  //   getAllToDo()
  // }, [])

  useEffect(() => {
    const getAllToDo = async () => {
      var id = localStorage.getItem("CurrentUserId");
      const todoList = await GetAllTodoListByUserAccountId(id);
      console.log('todoList by UserAccountId', todoList);
      setItemList(todoList);
    }

    getAllToDo()
  }, [])


  async function addTodo(event) {
    if (!inputValue) {
      // alert('Todo description cannot be empty!')
      setDialogIsOpen(true)
      return
    }

    try {
      const responseStatus = await AddNewTodo({ Description: inputValue });
      console.log("responseStatus", responseStatus)
      if (responseStatus === 201) {
        console.log("new todo item has been added")
        //when adding success, refresh the list
        var id = localStorage.getItem("CurrentUserId");
        const todoList = await GetAllTodoListByUserAccountId(id);
        console.log('todoList', todoList)
        setItemList(todoList)
      } else { throw new Error("failed to add new todo item."); }
    } catch (error) {
      console.log("Error in addTodo: ", error);
    }
  }

  const handleInputValueChange = (event) => {
    setInputValue(event.target.value);
    // console.log(event.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === 'Enter') { 
      addTodo();
    }
  }

  const handleDialogueClose = () => {
    setDialogIsOpen(false);
  }

  return (
    <div className='App'>
      {/* To Do List<br /><br /> */}
      
      {/* 1. Input here */}
      <div style={{ display: "flex", gap: "10px", margin: "15px" }}>
        <TextField id="outlined-basic" label="" variant="outlined"
          type='text'
          placeholder='add new item'
          value={inputValue}
          onChange={handleInputValueChange}
          onKeyDown={handleKeyDown}
          style={{ width: "60%", maxWidth: "600px" }}
        />
        <Fab color="primary" aria-label="add" onClick={addTodo}>
          <AddIcon />
        </Fab>

      </div>
      {/* 2. Item List */}
      <ToDoList itemList={itemList} setItemList={setItemList} />

      <Dialog
        open={dialogueIsOpen}
        onClose={handleDialogueClose}
      >
        <DialogContent>
          <DialogContentText>
            Todo description cannot be empty!
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Todo;
