import React from 'react';
import {localize} from 'react-localize-redux';
import Preloader from 'app/components/Preloader';
import DriverProfile from './DriverProfile';
import DriverAdditionalInfo from './DriverAdditionalInfo';
import DriverProfileService from '../services/DriverProfileService';

import "../styles/driver-profile.scss";

class DriverProfileContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: {},
            preloader: true,
        }
    }

    componentDidMount() {
        const profile = DriverProfileService.getDriverProfile(this.props.id);
        this.setState({
            profile: profile,
            preloader: false
        });
    }

    render() {
        const { translate } = this.props;
        const { profile, preloader } = this.state;

        if (preloader) {
            return (
                <div>
                    <Preloader enable={true}/>
                    <div className="justify-content-center loading-placeholder loading-placeholder_show">
                        <span className="align-self-center">{translate('driver_public_profile.loading')}</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-md-8">
                    <DriverProfile profile={profile}/>
                </div>
                <div className="col-md-4 driver-profile-border">
                    <DriverAdditionalInfo />
                </div>
            </div>
        );
    }
}

export default localize(DriverProfileContainer, 'locale');
