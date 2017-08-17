import React from 'react';
import TripItem from './TripItem';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import '../../styles/trip-list.scss';

class TripList extends React.Component {

    constructor() {
        super();
    }

    render() {
        const { collection, preloader } = this.props;
        const preload = preloader
            ? (<div className="trip-list__preloader"><i className="fa fa-circle-o-notch fa-spin fa-4x fa-fw" /></div>)
            : '';
        const notFoundMessage = collection.length === 0 ? (
                <div className="d-flex justify-content-center trip-list__not-found">
                    <span className="align-self-center">Trips not found ...</span>
                </div>
            ) : '';
        return (
            <div>
                {preload}
                {notFoundMessage}
                {collection.map((trip) =>
                    <Link key={trip.id}  to={`/trip/${trip.id}`} className="trip-list__item-link">
                        <TripItem trip={trip} />
                    </Link>
                )}
            </div>
        )
    }
}

TripList.PropTypes = {
    collection: PropTypes.array,
    preloader: PropTypes.bool
};

export default TripList;