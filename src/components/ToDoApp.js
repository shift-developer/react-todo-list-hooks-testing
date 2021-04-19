import React, { useReducer, useEffect } from 'react'
import { toDoReducer } from './toDoReducer';
import { useForm } from './hooks/useForm';
import './styles/styles.css';

const init = () => {
    return JSON.parse(localStorage.getItem('toDos')) || [];
}

export const ToDoApp = () => {

    const [ toDos, dispatch ] = useReducer(toDoReducer, [], init);

    const [ { description }, handleInputChange, reset] = useForm({
        description: ""
    })

    useEffect(() => {
        localStorage.setItem('toDos', JSON.stringify(toDos))
    }, [toDos])

    const handleDelete = (toDoID) => {
        dispatch({type: "delete", payload: toDoID});
    }

    const handleToggle = (toDoID) => {
        dispatch({type: 'toggle', payload: toDoID});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(description.trim().length <= 1) {
            return;
        }
        const newToDo = {id: new Date().getTime(), description, done: false};

        dispatch({type: 'add', payload: newToDo});
        reset();
    }

    return (
        <div>
            <h1>ToDo App ( {toDos.length} )</h1>
            <hr />
            <div className="row">
                <div className="col-7">
                    <ul>
                        {toDos.map( (item, i) => (
                            <li
                                key={item.id}
                                className="list-group-item"
                            >
                                <p className={item.done ? "complete" : ""} onClick={ () => handleToggle(item.id)} >{i + 1}. {item.description}</p>
                                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                                    Borrar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="col-5">
                    <h4>Agregar ToDos</h4>
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            name="description"
                            value={description}
                            className="form-control"
                            placeholder="Aprender..."
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                        <button className="btn btn-outline-primary mt-1 btn-block">
                            Agregar
                        </button>
                    </form> 
                </div>
            </div>

            
        </div>
    )
}
