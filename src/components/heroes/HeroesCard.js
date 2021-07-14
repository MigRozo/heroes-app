import React from 'react';
import { Link } from 'react-router-dom';
import { heroeImages } from '../../helpers/heroeImages';

export const HeroesCard = ({ id, superhero, publisher, alter_ego, first_appearance, characters }) => {
    return (
        <div className="card ms-3 animate__animated animate__fadeIn" style={ { maxWidth: 540 } }>
            <div className="row no-gutters">
                <div className="col-md-4">
                    <img className="card-img" src={ heroeImages(`./${ id }.jpg`).default } alt={ superhero } />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{ superhero }</h5>
                        <p className="card-text">{ alter_ego }</p>
                        { ( alter_ego !== characters ) && <p>{ characters }</p> }
                        <p className="card-text">
                            <small className="text-muted">{ first_appearance }</small>
                        </p>
                        <Link to={ `./heroe/${ id }` }>Más...</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
