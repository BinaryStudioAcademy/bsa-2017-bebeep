import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {getProfileAvatar} from 'app/services/PhotoService'

class UserItem extends React.Component {

    render() {
        const {translate, user} = this.props;

        return (
            <div className="user-item row">
                <div className="user-item__status-badge user-item__status-badge--online"></div>
                <div className="col-2 text-center">
                    <img
                        src={getProfileAvatar(user.avatar)}
                        alt={user.first_name}
                        className="user-item__avatar user-item__avatar--online"
                    />
                </div>
                <div className="col-8">
                    <div className="user-item__name">{user.first_name} {user.last_name}</div>
                </div>
                <div className="col-2 text-right">
                    <i className="fa fa-envelope user-item__envelope" />
                </div>
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
