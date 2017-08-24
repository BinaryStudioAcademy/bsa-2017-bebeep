import React from 'react';
import DriverCar from './DriverCar';
import DriverActivity from './DriverActivity';
import DriverVerifications from './DriverVerifications';
import {localize} from 'react-localize-redux';

class DriverProfile extends React.Component {
    render() {
        const { car, translate } = this.props;

        return (
            <div className="driver-additional-info">
                <DriverCar car={car}/>
                <DriverVerifications />
                <DriverActivity />
            </div>
        );
    }
}

export default localize(DriverProfile, 'locale');
