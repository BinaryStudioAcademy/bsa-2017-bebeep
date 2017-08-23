import React from 'react';
import DriverCar from './DriverCar';
import DriverActivity from './DriverActivity';
import DriverVerifications from './DriverVerifications';
import {localize} from 'react-localize-redux';

class DriverProfile extends React.Component {
    render() {
        const { translate } = this.props;

        return (
            <div className="driver-additional-info">
                <DriverCar />
                <DriverVerifications />
                <DriverActivity />
            </div>
        );
    }
}

export default localize(DriverProfile, 'locale');
