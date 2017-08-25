import React from 'react';
import {localize} from 'react-localize-redux';
import DriverBasicInfo from './DriverBasicInfo';
import DriverRating from './DriverRating';
import DriverCommentsList from './DriverCommentsList';
import DriverAbout from './DriverAbout';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

import "../styles/driver-profile.scss";

class DriverProfile extends React.Component {

    getYears() {
        return DateTimeHelper.getTimeFromDate(this.props.profile.birth_date, 'years');
    }

    render() {
        const { translate, profile } = this.props;

        return (
            <div className="driver-profile">
                <DriverBasicInfo
                    first_name={profile.first_name}
                    last_name={profile.last_name}
                    years={this.getYears()}
                    img={profile.img}
                />
                <DriverRating />
                <DriverAbout
                    about={profile.about_me}
                />
                <DriverCommentsList
                    comments={profile.comments}
                />
            </div>
        );
    }
}

export default localize(DriverProfile, 'locale');
