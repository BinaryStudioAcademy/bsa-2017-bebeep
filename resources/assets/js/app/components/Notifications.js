import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import BroadcastService from 'app/services/BroadcastService';

class Notifications extends React.Component {
    constructor() {
        super();

        this.state = {
            notification: {}
        };
    }

    componentWillMount() {
        const userId = 2;

        BroadcastService.Echo.private('App.User.' + userId)
            .notification((notification) => {
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
    dispatch => bindActionCreators({}, dispatch)
)(Notifications);

