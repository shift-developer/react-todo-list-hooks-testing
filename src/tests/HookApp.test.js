import React from 'react';
import { shallow } from 'enzyme';
import { HookApp } from '../components/HookApp';

describe('Pruebas en <HookApp/>', () => {
    test('Debe mostrarse correctamente', () => {
        const wrapper = shallow(<HookApp/>);
        expect(wrapper).toMatchSnapshot()
    })
})