import React from 'react';
import TripItem from './TripItem';
import CompoundTripWrapper from './CompoundTripWrapper';
import Placeholder from './Placeholder';
import PropTypes from 'prop-types';
import {localize} from 'react-localize-redux';

class TripList extends React.Component {

    constructor() {
        super();
    }

    compaundTrips(trip){
        if (Array.isArray(trip.routes)){
            return <CompoundTripWrapper key={trip.id} trip={trip}/>;
        } else {
            return <TripItem key={trip.id} trip={trip} />;
        }
    }

    render() {
        const { collection, translate } = this.props;

        return (
            <div className="trip-list">
                <Placeholder show={collection.length === 0}>{translate('search_result.trip_not_found')}</Placeholder>
                {collection.map(trip =>this.compaundTrips(trip))}
            </div>
        )
    }
}

TripList.PropTypes = {
    collection: PropTypes.array,
};

export default localize(TripList, 'locale');