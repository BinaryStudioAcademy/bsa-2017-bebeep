import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTranslate} from 'react-localize-redux';

import {getProfileAvatar} from 'app/services/PhotoService';

class UserItem extends React.Component {

    renderStatusOnline() {
        return this.props.user.status ? <span className="user-item__status-online" /> : null;
    }

    render() {
        const {translate, user} = this.props;

        return (
            <div className="user-item row align-items-center">
                <div className="col-3 col-md-2">
                    <div className="user-item__avatar-container">
                        {this.renderStatusOnline()}
                        <img
                            src={getProfileAvatar(user.avatar)}
                            alt={user.first_name}
                            className="user-item__avatar"
                        />
                    </div>
                </div>
                <div className="col-9 col-md-10">
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
