# Reducers

## ¿Qué es un reducer?

Es una función pura

```javascript
const initialToDoItems = [
    {
        id: 1,
        toDo: "Terminar de leer este readme",
        done: false
    }
];

const todoReducer = (state = initialToDoItems, action) => {
    return state;
}
```

1. No debe tener efectos secundarios
2. No debe realizar tareas asincronas
3. Debe retornar siempre un nuevo estado
4. Usualmente recibe dos argumentos (initial state y action)
5. No debe de requerir más que una acción que puede tener un argumento

La idea es tener en un solo lugar todas las posibles modificaciones que mi app puede ejecutar sobre mi estado, conociendo con exactitud donde estan ubicadas estas acciones. Toda la información por ende, fluye en una sola vía, de una forma completamente controlada.

![Esquema de funcionamiento del reducer](./teoria/reducer.png)

### useReducer en React JS

Separamos los reducers para mantener un código mas ordenado
```javascript
// ./toDoReducer.js
export const toDoReducer = (state = [], action) => {

    switch (action.type) {

        case 'add':
            return [...state, action.payload];
        case 'delete':
            return state.filter( toDo => toDo.id !== action.payload);
        case 'toggle':
            return state.map( toDo => (toDo.id === action.payload) ? {...toDo, done: !toDo.done} : toDo)
        default:
            return state;
    }
}

// Hook useForm
import { useState } from 'react';

export const useForm = ( initialState = {} ) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState)
    }

    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        })
    }

    return [values, handleInputChange, reset]

}

```

Aplicando useReducer ejemplo sencillo
```javascript
import React, { useReducer, useEffect } from 'react'
import { toDoReducer } from './toDoReducer';
import { useForm } from './hooks/useForm';

const init = () => {
    return JSON.parse(localStorage.getItem('toDos')) || [];
}

export const ToDoApp = () => {

    const [ toDos, dispatch ] = useReducer(toDoReducer, initialState);

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
                        {toDos.map( (toDo, i) => (
                            <li
                                key={toDo.id}
                                className="list-group-item"
                            >
                                <p className={toDo.done ? "complete" : ""} onClick={ () => handleToggle(toDo.id)} >{i + 1}. {toDo.description}</p>
                                <button className="btn btn-danger" onClick={() => handleDelete(toDo.id)}>
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

```
