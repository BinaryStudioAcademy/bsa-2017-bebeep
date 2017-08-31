import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setGivenReviews} from '../../../actions';
import ReviewsList from './ReviewsList';

class GivenContainer extends React.Component {

    componentWillMount() {
        this.props.setGivenReviews({
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
                    date: Date.now(),
                    mark: 4
                },
                {
                    id: 2,
                    user: {
                        data: {
                            id: 2,
                            full_name: "Petr Petrov",
                            photo: null
                        }
                    },
                    comment: "Hjfskaf askfkas asf",
                    date: Date.now() - 60 * 60 * 24 * 1000,
                    mark: 3
                }
            ]
        });
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
        givenReviews: state.user.profile.reviews.given
    }),
    dispatch => bindActionCreators({setGivenReviews}, dispatch))
(GivenContainer);
