import React, { useState } from 'react';
import { GetAllTodoList, DeleteTodoById, EditTodoById } from '../todoAPI'
const TodoItem = ({ item, setItemList }) => {
    const { ID, Description } = item;
    const [description, setDescription] = useState(Description)
    const [isEditing, setIsEditing] = useState(false)

    const handleDelete = async () => {
        //  console.log('handleDelete, ID:', ID)

        try {
            const responseCode = await DeleteTodoById(ID);
            console.log("responseCode", responseCode);
            if (responseCode === 200) {
                console.log(`todo item ${ID} deleted`)
                const todoList = await GetAllTodoList()
                setItemList(todoList)
            } else {
                throw new Error(`failed to remove item ${ID}`);
            }

        } catch (err) {
            console.log("error in deleteTodoById", err)
        }

    };

    const handleEdit = () => {
        console.log('handleEdit, ID:', ID, description)
        setIsEditing(true)
    }

    const handleEditCancel = () => setIsEditing(false)
    const handleSubmit = async () => {
        setIsEditing(false)
        // submit to backened
        try {
            const responseCode = await EditTodoById(ID, description);
            console.log("res code: ", responseCode)
            if (responseCode === 200) {
                console.log(`todo item ${ID} updated`)
                const todoList = await GetAllTodoList()
                setItemList(todoList)
                // console.log('submitting to backend', ID, description)

            } else {
                throw new Error(`failed to update item ${ID}`);
            }
        } catch (err) {
            console.log("error in submitting the todoEdit", err);
        }


    }

    const handleTodoChange = (event) => {
        // console.log('todoChange', event.target.value)
        setDescription(event.target.value)
    }

    return <div key={ID} style={{
        display: 'flex',
        gap: '10px',
        margin: '5px'
    }}>
        <div>
            {
                isEditing ?
                    <input type="text" value={description} onChange={handleTodoChange} />
                    :
                    <span>{description}</span>
            }
        </div>
        <div>
            {
                isEditing ?
                    <div>
                        <button onClick={handleSubmit} >Submit</button> {" "}
                        <button onClick={handleEditCancel} >Cancel</button>
                    </div>
                    : <button onClick={handleEdit} >Edit</button>
            }

        </div>
        <div><button onClick={() => handleDelete(ID)}>Delete</button></div>
    </div>
}

export default TodoItem