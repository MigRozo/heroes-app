import React, { useMemo } from 'react';
import { getHeroesByPublisher } from '../../selectors/getHeroesByPublisher';
import { HeroesCard } from './HeroesCard';

export const HeroesList = ({ publisher }) => {

    // const heroes = getHeroesByPublisher( publisher );
    const heroes = useMemo(() => getHeroesByPublisher( publisher ), [ publisher ]);

    return (
        <div className="card-columns">
            {
                heroes.map( heroe => (
                    <HeroesCard
                        key={ heroe.id }
                        { ...heroe }
                    />
                ))
            }
        </div>
    );
};
