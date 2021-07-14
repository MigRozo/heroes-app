import React, { useMemo } from 'react';
import queryString from 'query-string';

import { HeroesCard } from '../heroes/HeroesCard';
import { useForm } from '../../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';


export const SearchScreen = ({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse( location.search );

    const [ formValues, handleInputChange ] = useForm({ searchText: q });
    const { searchText } = formValues;

    // const heroesFiltered = getHeroesByName( searchText );
    const heroesFiltered = useMemo(() => getHeroesByName( q ), [ q ]);

    const handleSearch = (e) => {
        e.preventDefault();
        history.push( `?q=${searchText}` );
    };

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={ handleSearch }>
                        <input value={ searchText } onChange={ handleInputChange } name="searchText" type="text" className="form-control" placeholder="Find your hero" autoComplete="off" />
                        <button className="btn btn-primary btn-block mt-3" type="submit">Search</button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />

                    { ( q === '' ) && <div className="alert alert-info animate__animated animate__fadeInUp">Search a Heroe</div> }

                    { ( q !== '' && heroesFiltered.length < 1 ) && <div className="alert alert-danger animate__animated animate__shakeX">There is no a Heroe with <strong>{ q }</strong></div> }

                    {
                        heroesFiltered.map(heroe => (
                            <HeroesCard
                                key={ heroe.id }
                                { ...heroe }
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};
