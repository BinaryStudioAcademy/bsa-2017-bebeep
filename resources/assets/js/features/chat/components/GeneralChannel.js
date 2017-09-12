import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import BroadcastService from 'app/services/BroadcastService';
import {setOnlineUsers, setOnline, setOffline} from '../actions';

class GeneralChannel extends React.Component {

    componentWillMount() {
        this.connectToChannel();
    }

    connectToChannel() {
        const {setOnlineUsers, setOnline, setOffline} = this.props;

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
    dispatch => bindActionCreators({setOnlineUsers, setOnline, setOffline}, dispatch)
)(GeneralChannel);
