import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTranslate} from 'react-localize-redux';

import {getProfileAvatar} from 'app/services/PhotoService'

class UserItem extends React.Component {

    getUserData(id) {
        const {users} = this.props;

        return Object.assign({}, users.byId[id]);
    }

    render() {
        const {translate, userId} = this.props,
            userData = this.getUserData(userId);

        return (
            <div className="user-item row align-items-center">
                <div className="col-4 col-sm-3 col-md-2 text-right pr-0">
                    <span className="user-item__status-badge user-item__status-badge--online" />
                    <img
                        src={getProfileAvatar(userData.avatar)}
                        alt={userData.first_name}
                        className="user-item__avatar user-item__avatar--online"
                    />
                </div>
                <div className="col-8 col-sm-9 col-md-10">
                    <span className="user-item__name">
                        {userData.first_name} {userData.last_name}</span>
                </div>
                <i className="fa fa-envelope user-item__envelope" />
            </div>
        );
    }
}

UserItem.PropTypes = {
    userId: PropTypes.number.isRequired
};

export default connect(
    state => ({
        users: state.chat.entities.users,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({}, dispatch)
)(UserItem);
