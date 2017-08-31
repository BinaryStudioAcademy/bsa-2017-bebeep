import React from 'react';
import ReviewsList from './ReviewsList';
import Rating from './Rating';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setReceivedReviews} from '../../../actions';
import {fetchReceived} from 'app/services/ReviewService'

class ReceivedContainer extends React.Component {

    componentWillMount() {
        fetchReceived()
            .then((response) => {
                this.props.setReceivedReviews(response.data);
            })
            .catch(() => {});
    }

    render() {
        const {rating, receivedReviews} = this.props;

        return (
            <div>
                <Rating marks={rating} />
                <ReviewsList list={receivedReviews}/>
            </div>
        );
    }
}

export default connect(
    state => ({
        receivedReviews: state.user.reviews.received,
        rating: state.user.reviews.rating
    }),
    dispatch => bindActionCreators({setReceivedReviews}, dispatch)
)(ReceivedContainer);
