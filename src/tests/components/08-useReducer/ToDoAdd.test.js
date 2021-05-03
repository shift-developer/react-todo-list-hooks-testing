import React from 'react'
import {shallow} from 'enzyme'
import { ToDoAdd } from '../../../components/ToDoAdd'


describe('Pruebas sobre <ToDoAdd/>', () => {

    const handleAddToDo = jest.fn()

    const wrapper = shallow(
        <ToDoAdd
            handleAddToDo={handleAddToDo}
        />
    )
    
    test('debe de mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot()
    })

    test('NO debe de llamar handleAddToDo', () => {
        
        const formSubmit = wrapper.find('form').prop('onSubmit');

        formSubmit({ preventDefault(){}});

        expect(handleAddToDo).toHaveBeenCalledTimes(0);
    })

    test('debe de llamar la funcion handleAddToDo', () => {
        const value = 'Aprender react';

        wrapper.find('input').simulate('change', {
            target: {
                value,
                name: 'description'
            }
        })

        const formSubmit = wrapper.find('form').prop('onSubmit');

        formSubmit({ preventDefault(){}});

        expect(handleAddToDo).toHaveBeenCalledTimes(1);
        expect(handleAddToDo).toHaveBeenCalledWith(expect.any(Object));
        expect(handleAddToDo).toHaveBeenCalledWith({
            id: expect.any(Number),
            desc: value,
            done: false
        });

        expect(wrapper.find('input').prop('value')).toBe('')

    })
    
})
