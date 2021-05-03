import { shallow } from 'enzyme'
import React from 'react'
import { HomeScreen } from '../../../components/Curso/09-useContext/HomeScreen'


describe('Pruebas en <HomeScreen/>', () => {

    const wrapper = shallow(
        <HomeScreen/>
    )
    
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot()
    })
    

})
