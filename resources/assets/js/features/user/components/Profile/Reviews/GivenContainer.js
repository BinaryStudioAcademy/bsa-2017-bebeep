import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setGivenReviews} from '../../../actions';
import ReviewsList from './ReviewsList';
import {fetchGiven} from 'app/services/ReviewService'

class GivenContainer extends React.Component {

    componentWillMount() {
        fetchGiven().then((response) => this.props.setGivenReviews(response.data));
    }

    render() {
        const {givenReviews} = this.props;

        return (
            <ReviewsList list={givenReviews}/>
        );
    }
}

export default connect(
    state => ({
        givenReviews: state.user.reviews.given
    }),
    dispatch => bindActionCreators({setGivenReviews}, dispatch))
(GivenContainer);
