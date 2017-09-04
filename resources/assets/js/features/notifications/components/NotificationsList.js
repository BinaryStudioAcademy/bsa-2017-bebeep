import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {getNotifications} from 'app/services/NotificationService';
import {setNotifications} from '../actions'

class NotificationsList extends React.Component {

    componentWillMount() {
        const {setNotifications} = this.props;

        getNotifications()
            .then(response => setNotifications(response.data.data));
    }

    render() {
        const {translate, notifications} = this.props;

        return (
            <div>

            </div>
        );
    }
}

export default connect(
    state => ({
        notifications: state.notifications.notifications,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({setNotifications}, dispatch)
)(NotificationsList);
