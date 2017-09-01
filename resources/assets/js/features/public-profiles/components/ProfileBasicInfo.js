import React from 'react';
import {localize} from 'react-localize-redux';
import {defaultUserPhoto} from 'app/services/PhotoService';

import "../styles/public-profile.scss";

class ProfileBasicInfo extends React.Component {

    render() {
        const { first_name, last_name, years, photo, translate } = this.props;

        return (
            <div className="text-center">
                <img src={photo ? photo : defaultUserPhoto} width="150" height="150" className="rounded-circle driver-avatar" />
                <h4 className="m-y-2 driver-name">{first_name}&nbsp;{last_name}, <span className="driver-years text-muted">{years} {translate('public_profile.profile_years')}</span></h4>
                <strong>{translate('public_profile.profile_experience')} </strong> {translate('public_profile.profile_experienced')} <br/>
                <strong>{translate('public_profile.profile_preferences')} </strong>
                <span className="fa-stack fa-md">
                      <i className="fa fa-circle preference-green fa-stack-2x"></i>
                      <i className="fa fa-music fa-stack-1x fa-inverse" data-toggle="tooltip" data-placement="top" title={translate('public_profile.profile_like_music')}></i>
                </span>
                <span className="fa-stack fa-md">
                      <i className="fa fa-circle preference-red fa-stack-2x"></i>
                      <i className="fa fa-paw fa-stack-1x fa-inverse" data-toggle="tooltip" data-placement="top" title={translate('public_profile.profile_animals_not_allowed')}></i>
                </span>
                <br/>
            </div>
        );
    }
}

export default localize(ProfileBasicInfo, 'locale');
