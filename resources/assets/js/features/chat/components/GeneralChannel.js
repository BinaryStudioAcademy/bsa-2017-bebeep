import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTranslate} from 'react-localize-redux';
import BroadcastService from 'app/services/BroadcastService';
import {CHANNEL_GENERAL} from 'app/config';
import {setOnlineUsers, setOnline, setOffline, clearUserList} from '../actions';

class GeneralChannel extends React.Component {

    componentWillMount() {
        this.connectToChannel(this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isAuthorized !== this.props.isAuthorized) {
            nextProps.isAuthorized
                ? this.connectToChannel(nextProps)
                : this.disconnectChannel(nextProps)
        }
    }

    connectToChannel(props) {
        const {isAuthorized, setOnlineUsers, setOnline, setOffline} = props;

        if (isAuthorized) {
            BroadcastService.Echo.join(CHANNEL_GENERAL)
                .here(users => {
                    setOnlineUsers(users);
                })
                .joining((user) => {
                    setOnline(user);
                })
                .leaving((user) => {
                    setOffline(user);
                });
        }
    }

    disconnectChannel(props) {
        const {clearUserList} = props;
        BroadcastService.Echo.leave(CHANNEL_GENERAL);
        clearUserList();
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
        translate: getTranslate(state.locale),
        isAuthorized: state.user.login.success
    }),
    dispatch => bindActionCreators({setOnlineUsers, setOnline, setOffline, clearUserList}, dispatch)
)(GeneralChannel);
