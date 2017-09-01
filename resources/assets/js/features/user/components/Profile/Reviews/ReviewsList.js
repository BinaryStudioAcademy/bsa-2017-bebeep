import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ReviewsList extends React.Component {

    getReviewData(id) {
        const { reviews, users } = this.props;

        return {
            mark: reviews.byId[id].mark,
            date: reviews.byId[id].date * 1000,
            user: users.byId[reviews.byId[id].user],
            comment: reviews.byId[id].comment
        };
    }

    render() {
        const {list} = this.props;

        return (
            <div>
                {list.map((id) => {
                    const review = this.getReviewData(id);
                    return (
                        <Review
                            key={id}
                            mark={review.mark}
                            date={review.date}
                            user={review.user}
                        >{review.comment}</Review>
                    );
                })}
            </div>
        );
    }
}

ReviewsList.PropTypes = {
    list: PropTypes.array.isRequired
};

export default connect(
    state => ({
        users: state.user.entities.users,
        reviews: state.user.entities.reviews
    })
)(ReviewsList);
