import React from 'react';
import {localize} from 'react-localize-redux';
import CompoundTripItem from './CompoundTripItem';

import LangService from 'app/services/LangService';

import 'features/search/styles/compound-trip-item.scss';


class CompoundTripWrapper extends React.Component {

    render() {
        const {trip, translate} = this.props;

        return (

            <div className="compound-trip-item">
                {trip.routes.map(
                    (route) =>
                        <CompoundTripItem key={route.id} collection={route}/>
                )}
            </div>
        )
    }
}

export default localize(CompoundTripWrapper, 'locale');