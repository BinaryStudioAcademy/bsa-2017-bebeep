import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';
import _ from 'lodash';

import { tripDetailsSetState } from 'features/trip/actions';
import { searchSuccess } from 'features/search/actions';

import TripDetailsService from 'features/trip/services/TripDetailsService';
import { getCoordinatesFromPlace } from 'app/services/GoogleMapService';

import ContainerWrapper from 'app/layouts/ContainerWrapper';
import Preloader from 'app/components/Preloader';
import SearchForm from 'features/search/components/Result/SearchForm';
import TripDetailsContainer from '../components/Containers/TripDetailsContainer';

import LangService from 'app/services/LangService';
import * as LangTripDetails from '../lang/TripDetails.locale.json';
import * as LangSearchForm from 'features/search/lang/SearchResult.locale.json';


class TripDetails extends React.Component {

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
                this.setSearchData();

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
        LangService.addTranslation(LangSearchForm);
    }

    setSearchData() {
        const { details, searchSuccess } = this.props,
            startPoint = details.routes[0].from,
            endPoint = _.last(details.routes).to;

        searchSuccess({
            from: {
                name: startPoint.address,
                coordinate: {lat: startPoint.lat, lng: startPoint.lng},
            },
            to: {
                name: endPoint.address,
                coordinate: {lat: endPoint.lat, lng: endPoint.lng},
            },
            start_at: details.trip.start_at_x,
        });
    }

    render() {
        const { details } = this.props;
        const { preloader } = this.state;

        if (preloader) {
            return (<Preloader enable={true} />);
        }

        return (
            <div>
                <SearchForm redirectToSearch={ true } />

                <ContainerWrapper>
                    <TripDetailsContainer details={ details } />
                </ContainerWrapper>
            </div>
        );
    }
}

const TripDetailsConnected = connect(
    state => ({
        details: state.trip.details
    }),
    (dispatch) =>
        bindActionCreators({ tripDetailsSetState, searchSuccess }, dispatch)
)(TripDetails);

export default localize(TripDetailsConnected, 'locale');
