import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import BroadcastService from 'app/services/BroadcastService';
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
            BroadcastService.Echo.join('general')
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

        BroadcastService.Echo.leave('general');
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

GeneralChannel.PropTypes = {
    isAuthorized: PropTypes.bool.isRequired
};

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({setOnlineUsers, setOnline, setOffline, clearUserList}, dispatch)
)(GeneralChannel);
