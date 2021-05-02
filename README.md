# React Hooks, useReducer, useContext y testing

## Indice
- [Reducers](#Reducers)
- [Context](#Context)
- [Pruebas unitarias y de integración sobre hooks](#Unit-And-Integration-Testing)
### Reducers

#### ¿Qué es un reducer?

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

#### useReducer en React JS

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


### Context

Un problema que se nos plantea en React es cuando tenemos que pasar handlers entre varios hijos de un componente.

[Problemas en React muchos subcomponentes](./teoria/componentsProblem.png)

Y una buena solución que nos brinda React es la posiblidad de usar context
[Context React](./teoria/contextReact.png)

React Router
```javascript
// NavBar.js
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <nav>
            <ul>
                <NavLink exact activeClassName="active" to="./">Home</NavLink>
                <NavLink exact activeClassName="active" to="/about">About</NavLink>
                <NavLink exact activeClassName="active" to="/login">Login</NavLink>
            </ul>
        </nav>
    )
}

// AppRouter.js

import React from 'react'
import {    
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom'
import { AboutScreen } from './AboutScreen'
import { HomeScreen } from './HomeScreen'
import { LoginScreen } from './LoginScreen'
import { NavBar } from './NavBar'

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <NavBar/>
                <Switch>
                    <Route exact path="/about" component={AboutScreen}/>
                    <Route exact path="/login" component={LoginScreen}/>
                    <Route exact path="/" component={HomeScreen}/>
                    <Redirect to="/"/>
                </Switch>
            </div>
        </Router>
    )
}

// MainApp.js
import React from 'react'
import { AppRouter } from './AppRouter'

export const MainApp = () => {
    return <AppRouter/>
}
```

#### Create Context y useContext
Creamos UserContext

```javascript
// UserContext.js
import { createContext } from 'react';

export const UserContext = createContext(null);

// MainApp.js
import React, { useState } from 'react'
import { AppRouter } from './AppRouter'
import { UserContext } from './UserContext'

export const MainApp = () => {

    const [user, setUser] = useState({});

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }}>
            <AppRouter/>
        </UserContext.Provider>
    )
}

// HomeScreen.js
import React, { useContext } from 'react'
import { UserContext } from './UserContext'

export const HomeScreen = () => {

    const {user, setUser} = useContext(UserContext);

    return (
        <div>
            <h1>HomeScreen</h1>
            <hr/>
        </div>
    )
}
```

### Unit-And-Integration-Testing

Usamos:
[Enzyme JS](https://enzymejs.github.io/enzyme/)
[Enzyme to JSON npm package](https://www.npmjs.com/package/enzyme-to-json)
[React v17 Enzyme Adapter](https://github.com/wojtekmaj/enzyme-adapter-react-17)

1. Instalamos las dependencias

```bash
npm install enzyme-to-json
npm install --save-dev enzyme @wojtekmaj/enzyme-adapter-react-17 @testing-library/react-hooks
```

2. Configuramos el test
```javascript
// setupTests.js
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';

Enzyme.configure({adapter: new Adapter()});
expect.addSnapshotSerializer(createSerializer({mode: 'deep'}));
```

3. Creamos un file de tests y creamos un test,
```javascript
import React from 'react';
import { shallow } from 'enzyme';
import { HookApp } from '../components/HookApp';

describe('Pruebas en <HookApp/>', () => {
    test('Debe mostrarse correctamente', () => {
        const wrapper = shallow(<HookApp/>);
        expect(wrapper).toMatchSnapshot()
    })
})
```

al correrlo con 
```bash
npm run test
```

se nos va a crear el snapshot en la carpeta tests/_snapshots_


Pruebas sobre useCounter (Hook)

```javascript
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from '../../components/hooks/useCounter';


describe('Pruebas en useCounter', () => {

    test('debe de retornar valores por defecto', () => {
        const { result } = renderHook( () => useCounter() );
        expect(result.current.counter).toBe(10);
        expect(typeof result.current.increment).toBe('function');
        expect(typeof result.current.decrement).toBe('function');
        expect(typeof result.current.reset).toBe('function');
    }) 

    test('debe de tener el counter en 100', () => {
        const { result } = renderHook( () => useCounter(100) );
        expect(result.current.counter).toBe(100);
        
    }) 

    test('debe de incrementar el counter en 1 ', () => {
        const {result} = renderHook( () => useCounter(100));
        const { increment } = result.current;

        act( () => {
            increment();
        });

        const { counter } = result.current;
        expect(counter).toBe(101);
    })

    test('debe decrementar el counter en 1', () => {
        const {result} = renderHook( () => useCounter(200));
        const {decrement} = result.current;

        act( () => {
            decrement();
        })

        const {counter} = result.current;
        expect(counter).toBe(199);
    })

    test('debe de reiniciar el counter al valor inicial', () => {
        const initialValue = 1000;
        const {result} = renderHook( () => useCounter(initialValue));
        const {reset, decrement} = result.current;

        act( () => {
            decrement();
            decrement();
            reset()
        })

        const {counter} = result.current;
        expect(counter).toBe(initialValue);
    })
    
    
})
```

Pruebas sobre custom hook

Vamos a probar useForm

```javascript
import { renderHook, act } from '@testing-library/react-hooks';
import {useForm} from '../../components/hooks/useForm'

describe('Pruebas en useForm', () => {
    const initialForm = {
        name: "Juan",
        email: "juan@gmail.com"
    }

    test('debe regresar un formulario por defecto', () => {
        const {result} = renderHook(() => useForm(initialForm))
        const [formValues, handleInputChange, reset] = result.current;
        expect(formValues).toEqual(initialForm)
        expect(typeof handleInputChange).toBe('function')
        expect(typeof reset).toBe('function')
    });

    test('debe de cambiar el valor del formulario (cambiar name)', () => {
        const {result} = renderHook(() => useForm(initialForm))
        const [, handleInputChange] = result.current;
        act( () => {
            handleInputChange({
                target: {
                    name: 'name',
                    value: 'Joe'
                }
            })
        })
        const [formValues] = result.current;
        expect(formValues).toEqual({...initialForm, name: 'Joe'})
    });

    test('debe de restablecer el formulario con RESET', () => {
        const {result} = renderHook(() => useForm(initialForm))
        const [, handleInputChange, reset] = result.current;
        act( () => {
            handleInputChange({
                target: {
                    name: 'name',
                    value: 'Joe'
                }
            })
            reset();
        })
        const [formValues] = result.current;
        expect(formValues).toEqual(initialForm)

    })
    
    
    
})

```

Pruebas sobre useFetch (customHook)

```javascript
import { renderHook } from "@testing-library/react-hooks"
import { useFetch } from "../../components/hooks/useFetch"


describe('Pruebas en useFetch', () => {
    test('debe de retornar la info por defecto', () => {
        const {result} = renderHook( () => useFetch('https://www.breakingbadapi.com/api/quotes/1'));

        const {data, loading, error} = result.current;
        expect(data).toBe(null);
        expect(loading).toBe(true);
        expect(error).toBe(null)
    })

    test('debe de tener la info deseada, loading false, error false', async () => {
        const {result, waitForNextUpdate} = renderHook( () => useFetch('https://www.breakingbadapi.com/api/quotes/1'));
        await waitForNextUpdate({timeout: 5000});

        const {data, loading, error} = result.current;
       
        expect(data.length).toBe(1)
        expect(loading).toBe(false)
        expect(error).toBe(null)
    })

    test('debe de manejar el error', async () => {
        const {result, waitForNextUpdate} = renderHook( () => useFetch('https://www.reqres.in/apid/users?page=2'));
        await waitForNextUpdate({timeout: 5000});

        const {data, loading, error} = result.current;
       
        expect(data).toBe(null)
        expect(loading).toBe(false)
        expect(error).toBe('No se pudo cargar la info')
    })
    
    
})
```


Pruebas sobre MultipleCustomHooks



