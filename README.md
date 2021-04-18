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

        default:
            return state;
    }
}

// Hooks useForm
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
import React, { useReducer } from 'react'
import { toDoReducer } from './toDoReducer';
import { useForm } from './hooks/useForm';

const initialState = [
    {
        id: new Date().getTime(),
        description: "Aprender React",
        done: false
    }
]

export const ToDoApp = () => {

    const [ toDos, dispatch ] = useReducer(toDoReducer, initialState);

    const [ { description }, handleInputChange, reset] = useForm({
        description: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        if(description.trim().length <= 1) {
            return;
        }
        const newToDo = {id: new Date().getTime(), description, done: false};

        const action = {
            type: "add",
            payload: newToDo
        };

        dispatch(action);
        reset();
    }

    return (
        <div>
            <h1>ToDo App ( {toDos.length} )</h1>
            <hr />
            <div>
                <div>
                    <ul>
                        {toDos.map( (item, i) => (
                            <li
                                key={item.id}
                            >
                                <p>{i + 1}. {item.description}</p>
                                <button>
                                    Borrar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h4>Agregar ToDos</h4>
                    <hr />

                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text"
                            name="description"
                            value={description}
                            placeholder="Aprender..."
                            autoComplete="off"
                            onChange={handleInputChange}
                        />
                        <button>
                            Agregar
                        </button>
                    </form> 
                </div>
            </div>

            
        </div>
    )
}

```
