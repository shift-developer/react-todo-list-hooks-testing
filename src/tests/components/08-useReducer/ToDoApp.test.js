import React from 'react'
import { mount, shallow } from 'enzyme'

import { ToDoApp } from '../../../components/ToDoApp'
import { demoTodos } from '../../fixtures/demoTodos';
import { act } from '@testing-library/react';


describe('Pruebas sobre <ToDoApp/>', () => {
    
    const wrapper = shallow(
        <ToDoApp/>
    );

    Storage.prototype.setItem = jest.fn(()=>{})

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de agregar un TO DO', () => {
        
        const wrapper = mount(<ToDoApp/>);

        act( () => {
            wrapper.find('ToDoAdd').prop('handleAddToDo')( demoTodos[0] );
            wrapper.find('ToDoAdd').prop('handleAddToDo')( demoTodos[1] );
        })

        expect(wrapper.find('h1').text().trim()).toBe('ToDo App ( 2 )')
        expect(localStorage.setItem).toHaveBeenCalledTimes(2)

    })
    
    test('debe de eliminar un TO DO', () => {
        wrapper.find('ToDoAdd').prop('handleAddToDo')( demoTodos[0] )
        wrapper.find('ToDoList').prop('handleDelete')( demoTodos[0].id )
        expect(wrapper.find('h1').text().trim()).toBe('ToDo App ( 0 )')
    })
    
    

})
