import React from 'react';
import {localize} from 'react-localize-redux';
import DateTimeHelper from 'app/helpers/DateTimeHelper';
import {defaultUserPhoto} from 'app/services/PhotoService';

import "../styles/driver-profile.scss";

class ProfileComment extends React.Component {
    getDaysFromComment() {
        return DateTimeHelper.getTimeFromCommentDate(this.props.comment.date);
    }

    getStars() {
        let stars = [];
        for (let i = 0; i < this.props.comment.rating; i++) {
            stars.push(<i className="fa fa-star" aria-hidden="true" key={i}></i>);
        }
        return stars;
    }

    render() {
        const { comment, translate } = this.props;
        const date = this.getDaysFromComment();

        return (
                <div className="row comment">
                    <div className="col-sm-2">
                        <img className="img-responsive user-photo" src={comment.user_img ? comment.user_img : defaultUserPhoto}/>
                    </div>
                    <div className="col-sm-10">
                        <div className="card card-comment">
                            <div className="card-header comment-header">
                                <strong>{comment.user}</strong>&nbsp;
                                <span className="text-muted">
                                    {(Number.isInteger(date) && date <= 7) ?
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
                                {comment.text}
                            </div>
                        </div>
                    </div><br/>
                </div>
        );
    }
}

export default localize(ProfileComment, 'locale');
