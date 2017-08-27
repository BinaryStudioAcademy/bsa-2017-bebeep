import React from 'react';
import {localize} from 'react-localize-redux';
import ProfileBasicInfo from '../ProfileBasicInfo';
import DriverRating from './DriverRating';
import ProfileCommentsList from '../ProfileCommentsList';
import ProfileAbout from '../ProfileAbout';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

import "../../styles/driver-profile.scss";

class DriverProfile extends React.Component {

    getYears() {
        return DateTimeHelper.getUserYearsOld(this.props.profile.birth_date);
    }

    render() {
        const { translate, profile } = this.props;

        return (
            <div className="driver-profile">
                <ProfileBasicInfo
                    first_name={profile.first_name}
                    last_name={profile.last_name}
                    years={this.getYears()}
                    img={profile.img}
                />
                <DriverRating />
                <ProfileAbout
                    about={profile.about_me}
                />
                <ProfileCommentsList
                    comments={profile.comments}
                />
            </div>
        );
    }
}

export default localize(DriverProfile, 'locale');
