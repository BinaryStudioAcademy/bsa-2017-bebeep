import React from 'react';
import {localize} from 'react-localize-redux';
import DateTimeHelper from 'app/helpers/DateTimeHelper';

import "../styles/driver-profile.scss";

class DriverComment extends React.Component {
    getDaysFromComment() {
        return DateTimeHelper.getTimeFromDate(this.props.comment.date, 'days');
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

        return (
                <div className="row comment">
                    <div className="col-sm-2">
                        <img className="img-responsive user-photo" src={comment.user_img}/>
                    </div>
                    <div className="col-sm-10">
                        <div className="card">
                            <div className="card-header">
                                <strong>{comment.user}</strong>&nbsp;
                                <span className="text-muted">{translate('driver_public_profile.driver_comment_info', {days: this.getDaysFromComment()})}</span>
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

export default localize(DriverComment, 'locale');
