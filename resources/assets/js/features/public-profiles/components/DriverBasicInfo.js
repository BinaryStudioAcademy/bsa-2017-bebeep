import React from 'react';
import { localize } from 'react-localize-redux';

import { getProfileAvatar } from 'app/services/PhotoService';

import "../styles/driver-profile.scss";

class DriverBasicInfo extends React.Component {

    render() {
        const { first_name, last_name, years, img, translate } = this.props;

        return (
            <div className="text-center">
                <img src={ getProfileAvatar(img) } width="150" height="150" className="rounded-circle driver-avatar" />
                <h4 className="m-y-2 driver-name">{first_name}&nbsp;{last_name}, <span className="driver-years text-muted">{years} {translate('driver_public_profile.driver_years')}</span></h4>
                <strong>{translate('driver_public_profile.driver_experience')} </strong> {translate('driver_public_profile.driver_experienced')} <br/>
                <strong>{translate('driver_public_profile.driver_preferences')} </strong>
                <span className="fa-stack fa-md">
                      <i className="fa fa-circle preference-green fa-stack-2x"></i>
                      <i className="fa fa-music fa-stack-1x fa-inverse" data-toggle="tooltip" data-placement="top" title={translate('driver_public_profile.driver_like_music')}></i>
                </span>
                <span className="fa-stack fa-md">
                      <i className="fa fa-circle preference-red fa-stack-2x"></i>
                      <i className="fa fa-paw fa-stack-1x fa-inverse" data-toggle="tooltip" data-placement="top" title={translate('driver_public_profile.driver_animals_not_allowed')}></i>
                </span>
                <br/>
            </div>
        );
    }
}

export default localize(DriverBasicInfo, 'locale');
