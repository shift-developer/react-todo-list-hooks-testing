import { todoReducer } from "../../../components/Curso/08-useReducer/todoReducer"
import { demoTodos } from "../../fixtures/demoTodos";


describe('Pruebas en todoReducer', () => {
    
    test('debe de retornar el estado por defecto', () => {
        const state = todoReducer(demoTodos, {});

        expect(state).toEqual(demoTodos)

    })

    test('debe de agregar un TO DO', () => {
        const newToDo = {
            id: 3,
            desc: 'Aprender Angular',
            done: false
        };

        const action = {
            type: 'add', 
            payload: newToDo
        };

        const state = todoReducer(demoTodos, action);

        expect(state.length).toBe(3);
        expect(state).toEqual([...demoTodos, newToDo])
    })

    test('debe de borrar el TO DO', () => {
        const action = {type: 'delete', payload: 1};

        const state = todoReducer(demoTodos, action);
        expect(state.length).toBe(1);
        expect(state).toEqual([ demoTodos[1]]);
    })

    test('debe de hacer el toggle del TO DO', () => {
        const action = {type: 'toggle', payload: 2};

        const state = todoReducer(demoTodos, action);
        expect(state.length).toBe(2);
        expect(state[1].done).toBe(true);
        expect(state[0]).toEqual(demoTodos[0])
    })
    
})
