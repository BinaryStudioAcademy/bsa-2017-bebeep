import React from 'react';
import ReviewsList from './ReviewsList';
import Rating from './Rating';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setReceivedReviews} from '../../../actions';
import {fetchReceived} from 'app/services/ReviewService'
import Preloader from 'app/components/Preloader'
import ReviewsListEmpty from './ReviewsListEmpty';

class ReceivedContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            preloader: false
        };
    }

    componentWillMount() {
        this.setState({preloader: true});
        fetchReceived()
            .then((response) => {
                this.setState({preloader: false});
                this.props.setReceivedReviews(response.data);
            })
            .catch(() => {
                this.setState({preloader: false});
            });
    }

    render() {
        const {rating, receivedReviews} = this.props,
            {preloader} = this.state;

        return (
            <div style={{position: 'relative'}}>
                <Preloader enable={preloader} />
                <Rating marks={rating} />
                <ReviewsList list={receivedReviews}/>
                <ReviewsListEmpty show={receivedReviews.length <= 0 && !preloader} />
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
