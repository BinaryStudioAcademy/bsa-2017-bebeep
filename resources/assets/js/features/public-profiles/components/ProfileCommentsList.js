import React from 'react';
import {localize} from 'react-localize-redux';
import ProfileComment from './ProfileComment';

import "../styles/public-profile.scss";

class ProfileCommentsList extends React.Component {

    render() {
        const { comments, translate } = this.props;

        if (!comments) return (<span>&nbsp;</span>);
        else {
            return (
                <div className="driver__comments">
                    <p className="text-left">
                        <strong>{translate('driver_public_profile.driver_comments')}</strong><br/></p>
                    {comments.map((comment, i) =>
                        <ProfileComment
                            key={ i }
                            comment={ comment }
                        />
                    )}
                </div>
            );
        }

    }
}

export default localize(ProfileCommentsList, 'locale');
