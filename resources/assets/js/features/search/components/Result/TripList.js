import React from 'react';
import TripItem from './TripItem';
import Placeholder from './Placeholder';
import PropTypes from 'prop-types';

class TripList extends React.Component {

    constructor() {
        super();
    }

    render() {
        const { collection } = this.props;

        return (
            <div className="trip-list">
                <Placeholder show={collection.length === 0}>Trips not found</Placeholder>
                {collection.map((trip) =>
                    <TripItem key={trip.id} trip={trip} />
                )}
            </div>
        )
    }
}

TripList.PropTypes = {
    collection: PropTypes.array,
};

export default TripList;