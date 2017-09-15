import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTranslate} from 'react-localize-redux';

import {getProfileAvatar} from 'app/services/PhotoService';

const STATUS_ONLINE = 'online';
const STATUS_OFFLINE = 'offline';

class UserItem extends React.Component {

    getUserStatus() {
        return this.props.user.status ? STATUS_ONLINE : STATUS_OFFLINE;
    }

    render() {
        const {translate, user} = this.props;

        return (
            <div className="user-item row align-items-center">
                <div className="col-4 col-sm-3 col-md-2 text-right pr-0">
                    <span className={"user-item__status-badge user-item__status-badge--" +
                        this.getUserStatus()} />
                    <img
                        src={getProfileAvatar(user.avatar)}
                        alt={user.first_name}
                        className={"user-item__avatar user-item__avatar--" +
                            this.getUserStatus()}
                    />
                </div>
                <div className="col-8 col-sm-9 col-md-10">
                    <span className="user-item__name">
                        {user.first_name} {user.last_name}</span>
                </div>
                <i className="fa fa-envelope user-item__envelope" />
            </div>
        );
    }
}

UserItem.PropTypes = {
    user: PropTypes.object.isRequired,
};

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({}, dispatch)
)(UserItem);
