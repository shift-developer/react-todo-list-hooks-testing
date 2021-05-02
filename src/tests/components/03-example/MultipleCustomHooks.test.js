import React from 'react'
import { shallow } from "enzyme"
import { MultipleCustomHooks } from '../../../components/Curso/03-examples/MultipleCustomHooks'

describe('Pruebas en <MultipleCustomHooks />', () => {
    
    test('debe de mostrarse correctamente', () => {
        
        const wrapper = shallow(<MultipleCustomHooks />);
        expect(wrapper).toMatchSnapshot();
    })
    
})
