import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';

class NotificationsList extends React.Component {
    render() {
        const {translate} = this.props;

        return (
            <div>

            </div>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({}, dispatch)
)(NotificationsList);
