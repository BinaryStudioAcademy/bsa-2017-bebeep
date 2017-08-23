import React from 'react';
import {localize} from 'react-localize-redux';

import "../styles/driver-profile.scss";

class DriverBasicInfo extends React.Component {

    render() {
        const { translate } = this.props;

        return (
            <div className="text-center">
                <img src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRbezqZpEuwGSvitKy3wrwnth5kysKdRqBW54cAszm_wiutku3R"
                     width="150" height="150" className="rounded-circle driver-avatar" />
                <h4 className="m-y-2">Andrey Tondrev, <span className="driver-years text-muted">41 {translate('driver_public_profile.driver_years')}</span></h4>
                <strong>{translate('driver_public_profile.driver_experience')} </strong> {translate('driver_public_profile.driver_experienced')} <br/>
                <strong>{translate('driver_public_profile.driver_preferences')} </strong>
                <span className="fa-stack fa-md">
                      <i className="fa fa-circle fa-stack-2x" data-toggle="tooltip" data-placement="top" title={translate('driver_public_profile.driver_like_music')}></i>
                      <i className="fa fa-music fa-stack-1x fa-inverse"></i>
                    </span>
                <br/>
            </div>
        );
    }
}

export default localize(DriverBasicInfo, 'locale');
