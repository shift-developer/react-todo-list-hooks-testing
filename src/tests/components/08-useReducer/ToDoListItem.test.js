import {shallow} from 'enzyme'
import React from 'react'
import { ToDoListItem } from '../../../components/ToDoListItem'
import { demoTodos } from '../../fixtures/demoTodos'


describe('Pruebas en ,ToDoListItem/>', () => {

    const handleDelete = jest.fn();
    const handleToggle = jest.fn();

    const wrapper = shallow(
        <ToDoListItem
            toDo={demoTodos[0]}
            index={0}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
        />
    )
    
    test('debe de mostrarse correctamente ', () => {                
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de llamar la función borrar', () => {
        
        wrapper.find('button').simulate('click');
        expect(handleDelete).toHaveBeenCalledWith(demoTodos[0].id)

    })
    
    test('debe de llamar la función toggle', () => {

        wrapper.find('p').simulate('click');
        expect(handleToggle).toHaveBeenCalledWith(demoTodos[0].id)
    })

    test('debe de mostrar el texto correctamente', () => {
        const p = wrapper.find('p');
        expect(p.text().trim()).toBe(`1. ${demoTodos[0].desc}`)
    })
    
    test('debe de tener la clase complete si el TO DO esta hecho', () => {
        const todo = demoTodos[0];
        todo.done = true;

        const wrapper = shallow(
            <ToDoListItem
                toDo={todo}
                index={0}
                handleDelete={handleDelete}
                handleToggle={handleToggle}
            />
        )

        expect(wrapper.find('p').hasClass('complete')).toBe(true)
    })
    

})
