import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';

import { HeroeScreen } from '../../../components/heroes/HeroeScreen';

describe('Pruebas en <HeroeScreen />', () => {

    const historyMock = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    };

    // heroe/dc-batman

    test('Debe mostrar el componente Redirect si no hay argumentos en URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe']}>
                <HeroeScreen history={ historyMock } />
            </MemoryRouter>
        );

        // expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('Redirect').exists() ).toBe( true );
    });

    test('Debe mostrar un heroe si el parametro existe y se encuentra', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/dc-batman']}>
                <Route path="/heroe/:heroeId" component={ HeroeScreen } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.row').exists() ).toBe( true );
    });

    test('Debe regresar a la pantalla anterior con push', () => {
        const historyMock = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn()
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/dc-batman']}>
                <Route path="/heroe/:heroeId" component={ (props) => <HeroeScreen history={ historyMock } /> } />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect( historyMock.push ).toHaveBeenCalledWith('/');
        expect( historyMock.goBack ).not.toHaveBeenCalled();

    });

    test('Debe regresar a la pantalla anterior GOBACK', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/dc-batman']}>
                <Route path="/heroe/:heroeId" component={ (props) => <HeroeScreen history={ historyMock } /> } />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        // expect( historyMock.push ).not.toHaveBeenCalled();
        expect( historyMock.push ).toHaveBeenCalledTimes(0);
        expect( historyMock.goBack ).toHaveBeenCalled();

    });

    test('Debe llamar el redirect si el heroe no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/heroe/dc-spiderman616']}>
                <Route path="/heroe/:heroeId" component={ (props) => <HeroeScreen history={ historyMock } /> } />
            </MemoryRouter>
        );

        expect( wrapper.text().trim() ).toBe('');

    });

});
