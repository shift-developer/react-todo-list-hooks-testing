import React from 'react'
import { shallow } from "enzyme"
import { MultipleCustomHooks } from '../../../components/Curso/03-examples/MultipleCustomHooks'
import { useFetch } from '../../../components/hooks/useFetch'
import { useCounter } from '../../../components/hooks/useCounter'
jest.mock('../../../components/hooks/useFetch')
jest.mock('../../../components/hooks/useCounter')

describe('Pruebas en <MultipleCustomHooks />', () => {

    beforeEach( () => {
        useCounter.mockReturnValue({
            counter: 10,
            increment: () => {}
        });
    })
    
    test('debe de mostrarse correctamente', () => {

        useFetch.mockReturnValue({
            data: null,
            loading: true,
            error: null
        })
        
        const wrapper = shallow(<MultipleCustomHooks />);
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostrar la informacion', () => {
        
        useFetch.mockReturnValue({
            data: [{
                author: "Lenny",
                quote: "Hello World"
            }],
            loading: false,
            error: null
        });

        const wrapper = shallow(<MultipleCustomHooks />);
        expect(wrapper.find('.alert').exists()).toBe(false)
        expect(wrapper.find('.mb-0').text().trim()).toBe('Hello World')
        expect(wrapper.find('footer').text().trim()).toBe('Lenny')
    })
    
    
})
