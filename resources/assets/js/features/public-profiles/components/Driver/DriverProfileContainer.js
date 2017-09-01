import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { localize } from 'react-localize-redux';

import { getDriverProfile } from 'features/public-profiles/actions';

import DateTimeHelper from 'app/helpers/DateTimeHelper';

import Preloader from 'app/components/Preloader';
import DriverProfile from './DriverProfile';
import DriverAdditionalInfo from './DriverAdditionalInfo';

import "features/public-profiles/styles/public-profile.scss";

class DriverProfileContainer extends React.Component {

    componentDidMount() {
        this.props.getDriverProfile(this.props.id);
    }

    formatActivityStarted() {
        const { profile, translate } = this.props;

        profile.activity_started = DateTimeHelper.dateFormatLocale({
            timestamp: profile.created_at,
            getTranslate: translate,
        });
    }

    render() {
        const { is_fetched, profile, translate } = this.props;

        if (!is_fetched) {
            return (
                <div>
                    <Preloader enable={true}/>
                    <div className="justify-content-center loading-placeholder loading-placeholder_show">
                        <span className="align-self-center">{translate('public_profile.loading')}</span>
                    </div>
                </div>
            );
        }

        this.formatActivityStarted();

        return (
            <div className="row">
                <div className="col-md-8">
                    <DriverProfile profile={ profile } />
                </div>
                <div className="col-md-4 driver-profile-border">
                    <DriverAdditionalInfo
                        vehicle={ profile.vehicle }
                        email_is_verified={ profile.email_is_verified }
                        activity_started={ profile.activity_started }
                    />
                </div>
            </div>
        );
    }
}

const DriverPublicProfileConnected = connect(
    state => ({
        profile: state.profile.current_driver_profile,
        is_fetched: state.profile.is_fetched,
    }),
    (dispatch) => bindActionCreators({ getDriverProfile }, dispatch)
)(DriverProfileContainer);

export default localize(DriverPublicProfileConnected, 'locale');
