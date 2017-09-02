import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';

import { getPublicProfile } from 'features/public-profiles/actions';

import DateTimeHelper from 'app/helpers/DateTimeHelper';

import Preloader from 'app/components/Preloader';
import PassengerProfile from './PassengerProfile';
import PassengerAdditionalInfo from './PassengerAdditionalInfo';

import "features/public-profiles/styles/public-profile.scss";

class PassengerProfileContainer extends React.Component {

    componentDidMount() {
        this.props.getPublicProfile(this.props.id, 'passenger');
    }

    setActivityStarted() {
        const { profile, translate } = this.props;

        profile.activity_started = DateTimeHelper.dateFormat(profile.created_at, {
            dateFormat: 'DD.MM.YYYY',
            onlyDate: true,
        }).date;
    }

    render() {
        const { is_fetched, profile, translate } = this.props;

        if (!is_fetched) {
            return (
                <div>
                    <Preloader enable={true}/>
                    <div className="justify-content-center loading-placeholder loading-placeholder_show">
                        <span className="align-self-center">
                            { translate('public_profile.loading') }
                        </span>
                    </div>
                </div>
            );
        }

        this.setActivityStarted();

        return (
            <div className="row">
                <div className="col-md-8">
                    <PassengerProfile profile={ profile } />
                </div>
                <div className="col-md-4 driver-profile-border">
                    <PassengerAdditionalInfo profile={ profile } />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        profile: state.profile.current_passenger_profile,
        is_fetched: state.profile.is_fetched,
        translate: getTranslate(state.locale)
    }),
    (dispatch) => bindActionCreators({ getPublicProfile }, dispatch)
)(PassengerProfileContainer);
