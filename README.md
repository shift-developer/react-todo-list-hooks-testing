# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

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

La idea es tener en un solo lugar todas las posibles modificaciones que mi app puede ejecutar sobre mi estado, conociendo con exactitud donde estan ubicadas estas accions.

![Aquí la descripción de la imagen por si no carga](./teoria/reducer.png)

