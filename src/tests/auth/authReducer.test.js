import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";
const user = {
    name: 'Goku',
    logged: true
};

describe('Pruebas en authReducer', () => {

    test('Debe retornar el estado por defecto', () => {
        const state = authReducer( { logged: false }, {} );

        expect( state ).toEqual( { logged: false } );
    });

    test('Debe autenticar y colocar el name del usuario', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Goku'
            }
        };
        const state = authReducer( { logged: false }, action );

        expect( state ).toEqual( user );
    });

    test('Debe borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout
        };
        const state = authReducer( user, action );

        expect( state ).toEqual({ logged: false });
    });

});
