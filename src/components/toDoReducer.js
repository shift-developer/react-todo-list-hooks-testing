
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