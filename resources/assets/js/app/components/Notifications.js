import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import BroadcastService from 'app/services/BroadcastService';
import {addNotification} from 'features/notifications/actions';

class Notifications extends React.Component {
    constructor() {
        super();

        this.state = {
            notification: {}
        };
    }

    componentWillMount() {
        const {addNotification} = this.props,
            userId = 2;

        BroadcastService.Echo.private('App.User.' + userId)
            .notification((notification) => {
                addNotification(Object.assign(notification, {
                    type: BroadcastService.prepareType(notification.type)
                }));
                this.setState({notification});
            });
    }

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
    dispatch => bindActionCreators({addNotification}, dispatch)
)(Notifications);

