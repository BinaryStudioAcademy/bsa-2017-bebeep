import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {getMessagesByUser} from '../../actions'

class MessagingContainer extends React.Component {
    render() {
        const {translate, user_id} = this.props;
        console.log('ok');
        return (
            <div>
                {user_id}
            </div>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({getMessagesByUser}, dispatch)
)(MessagingContainer);
