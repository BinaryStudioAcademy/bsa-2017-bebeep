import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import { tripDetailsSetState } from 'features/trip/actions';

import TripDetailsService from 'features/trip/services/TripDetailsService';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import Preloader from 'app/components/Preloader';

import LangService from 'app/services/LangService';
import * as LangTripDetails from '../lang/TripDetails.locale.json';

import {TripRoutesPassengers} from '../components/Details';


class TripDetailsUsers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            preloader: true,
        };
    }

    componentDidMount() {
        const { params, tripDetailsSetState } = this.props;

        TripDetailsService.getDetails(params.id)
            .then(response => {
                this.props.tripDetailsSetState(response);
                // this.setSearchData();

                this.setState({
                    preloader: false,
                });
            })
            .catch(error => {
                this.setState({
                    preloader: false,
                });
                console.error(error);
            });
    }

    componentWillMount() {
        LangService.addTranslation(LangTripDetails);
    }

    render() {
        const { details } = this.props;
        const { preloader } = this.state;

        if (preloader) {
            return (<Preloader enable={true} />);
        }

        return (
            <div>

                <ContainerWrapper>
                    <TripRoutesPassengers maxSeats={ details.trip.seats }
                                          driver={ details.driver }
                                          routes={ details.routes }
                    />
                </ContainerWrapper>
            </div>
        );
    }
}

const TripDetailsUsersConnected = connect(
    state => ({
        details: state.trip.details
    }),
    (dispatch) =>
        bindActionCreators({ tripDetailsSetState }, dispatch)
)(TripDetailsUsers);

export default localize(TripDetailsUsersConnected, 'locale');
