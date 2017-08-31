import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review';
import LangService from 'app/services/LangService';
import * as lang from '../../../lang/Profile/Reviews/Review.locale.json';

class ReviewsContainer extends React.Component {
    componentWillMount() {
        LangService.addTranslation(lang);
    }

    render() {
        const {reviews} = this.props;

        return (
            <div>
                {reviews.map((review) => (
                    <Review
                        key={review.id}
                        mark={review.mark}
                        date={review.date}
                        user={review.user}
                    >{review.comment}</Review>
                ))}
            </div>
        );
    }
}

ReviewsContainer.PropTypes = {
    reviews: PropTypes.array.isRequired
};

export default ReviewsContainer;
