import React from 'react';
import Preloader from 'app/components/Preloader';
import DriverProfile from './DriverProfile';
import DriverAdditionalInfo from './DriverAdditionalInfo';
import { getProfile } from '../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getTranslate} from 'react-localize-redux';

import "../styles/driver-profile.scss";

class DriverProfileContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            preloader: true,
        }
    }

    componentDidMount() {
        this.props.getProfile(this.props.id);
        this.setState({
            preloader: false
        });
    }

    render() {
        const { profile, translate } = this.props;

        if (this.state.preloader) {
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
                    <DriverAdditionalInfo car={profile.car}/>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        profile: state.profile.current_driver_profile,
        translate: getTranslate(state.locale)
    }),
    (dispatch) => bindActionCreators({getProfile}, dispatch)
)(DriverProfileContainer);
