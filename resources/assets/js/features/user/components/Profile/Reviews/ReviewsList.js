import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class ReviewsList extends React.Component {

    render() {
        const {list, reviews, users} = this.props;

        return (
            <div>
                {list.map((id) => (
                    <Review
                        key={id}
                        mark={reviews.byId[id].mark}
                        date={reviews.byId[id].date}
                        user={users.byId[reviews.byId[id].user]}
                    >{reviews.byId[id].comment}</Review>
                ))}
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
