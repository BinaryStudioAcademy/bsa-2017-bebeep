import React from 'react';
import PropTypes from 'prop-types';

class ReviewsListEmpty extends React.Component {
    render() {
        const {show} = this.props,
            displayStyle = show ? {} : {display: 'none'};

        return (
            <div style={displayStyle}>
                No comments ...
            </div>
        );
    }
}

ReviewsListEmpty.PropTypes = {
    show: PropTypes.bool
};

export default ReviewsListEmpty;
