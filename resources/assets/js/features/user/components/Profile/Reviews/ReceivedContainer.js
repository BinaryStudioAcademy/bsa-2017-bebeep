import React from 'react';
import ReviewsList from './ReviewsList';
import Rating from './Rating';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setReceivedReviews} from '../../../actions';

class ReceivedContainer extends React.Component {

    componentWillMount() {
        this.props.setReceivedReviews({
            data: [
                {
                    id: 1,
                    user: {
                        data: {
                            id: 1,
                            full_name: "Ivan Ivanov",
                            photo: null
                        }
                    },
                    comment: "asdasd",
                    date: Date.now() - 60 * 60 * 24 * 5 * 1000,
                    mark: 3
                }
            ],
            meta: {
                rating: [5, 6, 2, 4, 1]
            }
        });
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
