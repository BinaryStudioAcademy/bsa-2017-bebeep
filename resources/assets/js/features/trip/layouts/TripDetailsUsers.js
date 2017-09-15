import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import Preloader from 'app/components/Preloader';
import { TripRoutesPassengers } from '../components/Details';

import { tripDetailsSetState } from 'features/trip/actions';
import TripDetailsService from 'features/trip/services/TripDetailsService';


class TripDetailsUsers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            preloader: true,
        };
    }

    componentDidMount() {
        const { params } = this.props;

        TripDetailsService.getDetails(params.id)
            .then(response => {
                this.props.tripDetailsSetState(response);

                this.setState({
                    preloader: false,
                });
            })
            .catch(error => {
                this.setState({
                    preloader: false,
                });
            });
    }

    render() {
        const { details } = this.props,
            { preloader } = this.state;

        if (preloader) {
            return <Preloader enable={true} />;
        }

        return (
            <TripRoutesPassengers
                maxSeats={ details.trip.seats }
                driver={ details.driver }
                routes={ details.routes }
            />
        );
    }
}

const TripDetailsUsersConnected = connect(
    state => ({
        details: state.trip.details,
    }),
    dispatch => bindActionCreators({ tripDetailsSetState }, dispatch)
)(TripDetailsUsers);

export default localize(TripDetailsUsersConnected, 'locale');
