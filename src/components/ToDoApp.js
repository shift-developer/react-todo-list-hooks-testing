import React, { useReducer, useEffect } from 'react'
import { toDoReducer } from './toDoReducer';
import { ToDoList } from './ToDoList';
import { ToDoAdd } from './ToDoAdd';
import './styles/styles.css';

const init = () => {
    return JSON.parse(localStorage.getItem('toDos')) || [];
}

export const ToDoApp = () => {

    const [ toDos, dispatch ] = useReducer(toDoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('toDos', JSON.stringify(toDos))
    }, [toDos])

    const handleDelete = (toDoID) => {
        dispatch({type: "delete", payload: toDoID});
    }

    const handleToggle = (toDoID) => {
        dispatch({type: 'toggle', payload: toDoID});
    }

    const handleAddToDo = (newToDo) => {
        dispatch({type: 'add', payload: newToDo})
    }

    return (
        <div>
            <h1>ToDo App ( {toDos.length} )</h1>
            <hr />
            <div className="row">
                <div className="col-7">
                    <ToDoList
                        toDos={toDos}
                        handleDelete={handleDelete}
                        handleToggle={handleToggle}
                    />
                </div>
                <div className="col-5">
                    <ToDoAdd 
                        handleAddToDo={handleAddToDo}
                    />
                </div>
            </div>

            
        </div>
    )
}
