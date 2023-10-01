import React, { useState, useEffect } from 'react';
import { GetAllTodoList, DeleteTodoById, EditTodoById, UpdateTodoCheckboxById, GetAllTodoListByUserAccountId } from '../../api/todoAPI';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Todo.css'

const TodoItem = ({ item, setItemList }) => {
    const { ID, Description, isChecked } = item;
    const [description, setDescription] = useState(Description);
    const [isLoading, setIsLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(isChecked);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const updateCheckboxStatus = async () => {
            try{
                const responseCode = await UpdateTodoCheckboxById(ID, isCompleted);
                
                console.log("res code:", responseCode);
                if(responseCode === 200) {
                    console.log(`todo item ${ID} updated the checkbox`);
                    const todoList = await GetAllTodoList();
                    setItemList(todoList);
                    
                } else{
                    throw new Error(`failed to update the checkbox for id: ${ID}`);
                }
    
            } catch (err) {
                console.log("error in handleCheckboxStatusToggle");
                throw err;
            };
        }

        // updateCheckboxStatus()
    }, [isCompleted])

    const handleDelete = async () => {
        try {
            const responseCode = await DeleteTodoById(ID);
            console.log("responseCode", responseCode);
            if (responseCode === 200) {
                console.log(`todo item ${ID} deleted`);
                // const todoList = await GetAllTodoList();
                var id = localStorage.getItem("CurrentUserId");
                const todoList = await GetAllTodoListByUserAccountId(id);
                setItemList(todoList);
            } else {
                throw new Error(`failed to remove item ${ID}`);
            }
        } catch (err) {
            console.log("error in deleteTodoById", err);
        }
    };

    const handleEdit = () => {
        console.log('handleEdit, ID:', ID, description);
        setIsEditing(true);
    };

    const handleEditCancel = () => setIsEditing(false);

    const handleSubmit = async () => {
        setIsEditing(false);
        try {
            console.log("editing description to:", description);
            const responseCode = await EditTodoById(ID, description);
            console.log("res code: ", responseCode);
            if (responseCode === 200) {
                console.log(`todo item ${ID} updated`);
                // const todoList = await GetAllTodoList();
                var id = localStorage.getItem("CurrentUserId");
                const todoList = await GetAllTodoListByUserAccountId(id);
                setItemList(todoList);
            } else {
                throw new Error(`failed to update item ${ID}`);
            }
        } catch (err) {
            console.log("error in submitting the todoEdit", err);
        }
    };

    const handleTodoChange = (event) => {
        setDescription(event.target.value);
    };

    const handleCheckboxStatusToggle = async () => { 
        setIsLoading(true)
        try{
            const responseCode = await UpdateTodoCheckboxById(ID, !isCompleted);
            
            
            console.log("res code:", responseCode);
            if(responseCode === 200) {
                setIsCompleted(!isCompleted)
                console.log(`todo item ${ID} updated the checkbox`);
                // const todoList = await GetAllTodoList();
                // setItemList(todoList);
                
            } else{
                throw new Error(`failed to update the checkbox for id: ${ID}`);
            }

        } catch (err) {
            console.log("error in handleCheckboxStatusToggle");
            throw err;
        }
        finally {
            setIsLoading(false)
        }
    }

    const label = { inputProps: { 'aria-label': 'todo checkbox' } };

    return (
        <Box sx={{ flexGrow: 1 }} key={ID}>
            <Grid 
                display="flex"
                alignItems="center"
                container spacing={{xs:2, sm:2, md:2}}>
                <Grid item xs={0.5} className="checkbox-grid">
                    <Checkbox {...label} 
                        checked={isCompleted} 
                        onClick={handleCheckboxStatusToggle} 
                        disabled={isLoading}
                    />
                </Grid>

                {/* Text field */}
                <Grid item xs={7} md={3}>
                    {isEditing ? (
                        <TextField variant="outlined" defaultValue={description} onChange={handleTodoChange} size="small" style={{ width: "100%" }}/>
                        // <input type="text" value={description} onChange={handleTodoChange} />
                    ) : (
                        
                        <span style={ isCompleted ? { textDecoration: "line-through" }: {}}>{description}</span>

                    )}
                </Grid>
                <Grid item xs={2}>
                    {isEditing ? (
                        <div>
                            <Button variant="contained" onClick={handleSubmit}>Submit</Button>{" "}
                            <Button variant="contained" onClick={handleEditCancel}>Cancel</Button>
                        </div>
                    ) : (
                        <Button variant="contained" onClick={handleEdit}>Edit</Button>
                    )}
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" onClick={handleDelete}>Delete</Button>
                </Grid>
            </Grid>
        </Box>
    );
};
export default TodoItem;