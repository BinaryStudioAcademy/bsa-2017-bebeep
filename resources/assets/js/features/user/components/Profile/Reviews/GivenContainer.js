import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setGivenReviews} from '../../../actions';
import ReviewsList from './ReviewsList';
import Preloader from 'app/components/Preloader'
import {fetchGiven} from 'app/services/ReviewService'
import ReviewsListEmpty from './ReviewsListEmpty';

class GivenContainer extends React.Component {

    constructor() {
        super();
        this.state = {
            preloader: false
        };
    }

    componentWillMount() {
        this.setState({preloader: true});
        fetchGiven().then((response) => {
            this.setState({preloader: false});
            this.props.setGivenReviews(response.data);
        }).catch(() => this.setState({preloader: false}));
    }

    render() {
        const {givenReviews} = this.props,
            {preloader} = this.state,
            isEmpty = givenReviews.length <= 0 && !preloader;

        return (
            <div className="position-relative">
                <Preloader enable={preloader} />
                {isEmpty
                    ? <ReviewsListEmpty />
                    : <ReviewsList list={givenReviews}/>
                }
            </div>
        );
    }
}

export default connect(
    state => ({
        givenReviews: state.user.reviews.given
    }),
    dispatch => bindActionCreators({setGivenReviews}, dispatch))
(GivenContainer);
