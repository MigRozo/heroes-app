import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { getHeroesById } from '../../selectors/getHeroeById';

// import batman from '../../assets/heroes/dc-batman.jpg'; //recurso estático
// const heroeImages = require.context('../../assets/heroes', true);
import { heroeImages } from '../../helpers/heroeImages';

export const HeroeScreen = ({ history }) => {
    const { heroeId } = useParams();

    // const heroe = getHeroesById( heroeId );
    const heroe = useMemo(() => getHeroesById( heroeId ), [ heroeId ]);
    if ( !heroe ) return <Redirect to="/" />;

    const handleReturn = () => {
        if ( history.length <= 2 ) {
            history.push('/');
        } else {
            history.goBack();
        }
    };

    const { superhero, publisher, alter_ego, first_appearance, characters } = heroe;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img
                    // src={ `../assets/heroes/${ heroeId }.jpg` } //desde public/assets
                    // src={ batman } // con import
                    src={ heroeImages(`./${ heroeId }.jpg`).default }
                    alt={ superhero }
                    className="img-thumbnail  animate__animated animate__fadeInLeft"
                />
            </div>
            <div className="col-8 animate__animated animate__fadeIn">
                <h3>{ superhero }</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Alter ego:</strong> { alter_ego }</li>
                    <li className="list-group-item"><strong>Publisher:</strong> { publisher }</li>
                    <li className="list-group-item"><strong>First appearance:</strong> { first_appearance }</li>
                </ul>
                <h5>Characters</h5>
                <p>{ characters }</p>

                <button onClick={ handleReturn } className="btn btn-primary">Return</button>
            </div>
        </div>
    );
};
