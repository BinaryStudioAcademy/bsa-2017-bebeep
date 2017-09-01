import React from 'react';
import { localize } from 'react-localize-redux';

import DateTimeHelper from 'app/helpers/DateTimeHelper';
import { getProfileAvatar } from 'app/services/PhotoService';

import "../styles/public-profile.scss";

class ProfileComment extends React.Component {
    getStars() {
        let stars = [];
        for (let i = 0; i < this.props.comment.rating; i++) {
            stars.push(<i className="fa fa-star" aria-hidden="true" key={i} />);
        }
        return stars;
    }

    render() {
        const { comment, translate } = this.props;
        const date = DateTimeHelper.getTimeFromCommentDateForComment(this.props.comment.date);
        let user = this.props.comment.user.data;

        return (
                <div className="row comment">
                    <div className="col-sm-2">
                        <img className="img-responsive user-photo"
                            src={ getProfileAvatar(user.photo) }
                        />
                    </div>
                    <div className="col-sm-10">
                        <div className="card card-comment">
                            <div className="card-header comment-header">
                                <strong>{user.first_name} {user.last_name}</strong>&nbsp;
                                <span className="text-muted">
                                    {(Number.isInteger(date)) ?
                                        translate('driver_public_profile.driver_comment_info_number', {days: date})
                                        :
                                        translate('driver_public_profile.driver_comment_info_date', {date: date})
                                    }
                                </span>
                                <span className="pull-right">
                                    {this.getStars()}
                                </span>
                            </div>
                            <div className="card-block">
                                {comment.comment}
                            </div>
                        </div>
                    </div><br/>
                </div>
        );
    }
}

export default localize(ProfileComment, 'locale');
