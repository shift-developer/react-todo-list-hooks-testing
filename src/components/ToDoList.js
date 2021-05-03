import React from 'react';
import { ToDoListItem } from './ToDoListItem';

export const ToDoList = ({toDos, handleDelete, handleToggle}) => {
    return (
        <>
            {toDos.map( (toDo, index) => (
                <ToDoListItem 
                    key={toDo.id}
                    handleDelete={handleDelete} 
                    handleToggle={handleToggle} 
                    toDo={toDo} 
                    index={index}
                />
            ))}
        </>
    )
}
