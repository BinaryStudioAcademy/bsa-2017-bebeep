import React from 'react';
import { localize } from 'react-localize-redux';
import { getProfileAvatar } from 'app/services/PhotoService';

import "../styles/public-profile.scss";

class ProfileBasicInfo extends React.Component {

    render() {
        const { first_name, last_name, years, photo, translate } = this.props;

        return (
            <div className="text-center">
                <img src={ getProfileAvatar(photo) }
                    width="150"
                    height="150"
                    className="rounded-circle driver-avatar"
                />

                <h4 className="driver-name">
                    <span className="mr-2">{ first_name }&nbsp;{ last_name },</span>
                    <span className="driver-years text-muted">{ years } {
                        translate('public_profile.profile_years')
                    }</span>
                </h4>

                <strong>{ translate('public_profile.profile_experience') } </strong> {
                    translate('public_profile.profile_experienced') } <br/>

                <strong>{ translate('public_profile.profile_preferences') } </strong>

                <span className="fa-stack fa-md">
                      <i className="fa fa-circle preference-green fa-stack-2x" />
                      <i className="fa fa-music fa-stack-1x fa-inverse"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={ translate('public_profile.profile_like_music') } />
                </span>

                <span className="fa-stack fa-md">
                      <i className="fa fa-circle preference-red fa-stack-2x" />
                      <i className="fa fa-paw fa-stack-1x fa-inverse"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={ translate('public_profile.profile_animals_not_allowed') } />
                </span>
                <br/>
            </div>
        );
    }
}

export default localize(ProfileBasicInfo, 'locale');
