import React from 'react';
import { browserHistory } from 'react-router';
import {localize} from 'react-localize-redux';

import TripDetailsService from 'features/trip/services/TripDetailsService';

import TripDriver from '../Details/TripDriver';


class TripDetailsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            trip: null,
            routes: null,
            driver: null,
            vehicle: null,
        };
    }

    componentDidMount() {
        TripDetailsService.getDetails(this.props.id)
            .then(response => {
                response = TripDetailsService.transformData(response.data);
                console.log(response);

                this.setState({
                    trip: response.trip,
                    routes: response.routes.data,
                    driver: response.driver.data,
                    vehicle: response.vehicle.data,
                });
            })
            .catch(error => {
                this.setState({
                    trip: null,
                    routes: null,
                    driver: null,
                    vehicle: null,
                });
            });
    }

    render() {
        const { trip, routes, driver, vehicle } = this.state;
        console.log(driver);
        //const { translate } = this.props;
        //translate('edit_trip.cant_load_this_trip')

        if (!this.state.trip) {
            return (
                <div />
            );
        }

        return (
            <div>
                <div>Hi</div>
                <TripDriver driver={ driver } />
            </div>
        );
    }
}

export default TripDetailsContainer;
