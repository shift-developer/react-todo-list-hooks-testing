import React from 'react'
import { useForm } from './hooks/useForm';

export const ToDoAdd = ({handleAddToDo}) => {

    const [ { description }, handleInputChange, reset] = useForm({
        description: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if(description.trim().length <= 1) {
            return;
        }

        handleAddToDo({id: new Date().getTime(), description, done: false});
        reset();
    }
    
    return (
        <>
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
        </>
    )
}
