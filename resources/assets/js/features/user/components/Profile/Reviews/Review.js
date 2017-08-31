import React from 'react';
import PropTypes from 'prop-types';
import {localize} from 'react-localize-redux';
import DateTimeHelper from 'app/helpers/DateTimeHelper';
import {defaultUserPhoto} from 'app/services/PhotoService';
import LangService from 'app/services/LangService';
import * as lang from '../../../lang/Profile/Reviews/Review.locale.json';

import "../../../styles/review.scss";

class Review extends React.Component {
    componentWillMount() {
        LangService.addTranslation(lang);
    }

    getStars(mark) {
        let stars = [];
        for (let i = 0; i < mark; i++) {
            stars.push(<i className="fa fa-star" aria-hidden="true" key={i}></i>);
        }
        return stars;
    }

    render() {
        const {mark, children, user, date, translate} = this.props;
        const commentDate = DateTimeHelper.getTimeFromCommentDate(date);

        return (
            <div className="row comment">
                <div className="col-sm-2">
                    <img className="img-responsive user-photo" src={user.photo ? user.photo : defaultUserPhoto}/>
                </div>
                <div className="col-sm-10">
                    <div className="card card-comment">
                        <div className="card-header comment-header">
                            <strong>{user.full_name}</strong>&nbsp;
                            <span className="text-muted">
                                {(Number.isInteger(commentDate) && commentDate <= 7)
                                    ? ( commentDate === 0
                                        ? translate('review.info_today')
                                        : translate('review.info_day_ago' + LangService.getNumberForm(commentDate), {days: commentDate}) )
                                    : translate('review.info_date', {date: commentDate})
                                }
                            </span>
                            <span className="pull-right">
                                {this.getStars(mark)}
                            </span>
                        </div>
                        <div className="card-block">
                            {children}
                        </div>
                    </div>
                </div>
                <br/>
            </div>
        );
    }
}

Review.PropTypes = {
    mark: PropTypes.number.isRequired,
    date: PropTypes.isRequired,
    user: PropTypes.object.isRequired
};

export default localize(Review, 'locale');
