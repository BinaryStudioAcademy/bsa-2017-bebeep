import React from 'react';
import Preloader from 'app/components/Preloader';
import PassengerProfile from './PassengerProfile';
import PassengerAdditionalInfo from './PassengerAdditionalInfo';
import { getPassengerProfile } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTranslate } from 'react-localize-redux';

import "../../styles/public-profile.scss";

class PassengerProfileContainer extends React.Component {

    componentDidMount() {
        this.props.getPassengerProfile(this.props.id);
    }

    render() {
        const { profile, preloader, translate } = this.props;

        if (preloader) {
            return (
                <div>
                    <Preloader enable={true}/>
                    <div className="justify-content-center loading-placeholder loading-placeholder_show">
                        <span className="align-self-center">{translate('public_profile.loading')}</span>
                    </div>
                </div>
            );
        }

        return (
            <div className="row">
                <div className="col-md-8">
                    <PassengerProfile profile={profile}/>
                </div>
                <div className="col-md-4 driver-profile-border">
                    <PassengerAdditionalInfo />
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        profile: state.profile.current_passenger_profile,
        preloader: state.profile.preloader,
        translate: getTranslate(state.locale)
    }),
    (dispatch) => bindActionCreators({getPassengerProfile}, dispatch)
)(PassengerProfileContainer);
