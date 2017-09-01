import React from 'react';
import { localize } from 'react-localize-redux';

import DateTimeHelper from 'app/helpers/DateTimeHelper';

import ProfileBasicInfo from '../ProfileBasicInfo';
import DriverRating from './DriverRating';
import ProfileCommentsList from '../ProfileCommentsList';
import ProfileAbout from '../ProfileAbout';

import "features/public-profiles/styles/public-profile.scss";

class DriverProfile extends React.Component {

    getYears() {
        return DateTimeHelper.getUserYearsOld(this.props.profile.birth_date);
    }

    render() {
        const { translate, profile } = this.props;

        return (
            <div className="driver__profile">
                <ProfileBasicInfo
                    first_name={ profile.first_name }
                    last_name={ profile.last_name }
                    years={ this.getYears() }
                    photo={ profile.photo }
                />
                <DriverRating driver={profile.id} />
                <ProfileAbout
                    about={ profile.about_me }
                />

                <ProfileCommentsList driver={profile.id} />
            </div>
        );
    }
}

export default localize(DriverProfile, 'locale');
