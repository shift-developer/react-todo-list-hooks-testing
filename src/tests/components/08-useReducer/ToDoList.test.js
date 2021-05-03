import React from 'react'
import {shallow} from 'enzyme'

import { ToDoList } from '../../../components/ToDoList'
import { demoTodos } from '../../fixtures/demoTodos'


describe('Pruebas en <ToDoList/>', () => {

    const handleDelete = jest.fn();
    const handleToggle = jest.fn();
        
    const wrapper = shallow(
        <ToDoList
            toDos={ demoTodos }
            handleDelete={handleDelete}
            handleToggle={handleToggle}
        />
    )
    
    test('debe de mostrarse correctamente ', () => {

       expect(wrapper).toMatchSnapshot()

    })

    test('debe tener 2 <ToDoListItem />', () => {

        expect(wrapper.find('ToDoListItem').length).toBe(demoTodos.length);

        expect(wrapper.find('ToDoListItem').at(0).prop('handleDelete')).toEqual(expect.any(Function))
 
     })
    

})
