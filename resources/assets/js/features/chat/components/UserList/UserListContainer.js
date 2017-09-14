import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTranslate} from 'react-localize-redux';
import {ListGroup, ListGroupItem} from 'reactstrap';
import _ from 'lodash';

import UserItem from './UserItem';
import {fillUsersList} from 'features/chat/actions';

import 'features/chat/styles/user-list.scss';

class UserListContainer extends React.Component {

    componentWillMount() {
        this.getUsersList();
    }

    getUsersList() {
        const {fillUsersList} = this.props;

        fillUsersList();
    }

    setOnlineStatus(users, status) {
        status = status !== undefined ? !!status : true;

        return _.forEach(users, function(user) {
            user.status = status;
        });
    }

    setSortUsersList(users) {
        return _.sortBy(users, ['first_name', 'last_name']);
    }

    getUsersSortList() {
        const {users, onlineUsers} = this.props;

        const usersOnline = this.setSortUsersList(
            this.setOnlineStatus(onlineUsers)
        );

        let usersOffline = this.setSortUsersList(
            this.setOnlineStatus(users, false)
        );
        usersOffline = _.differenceBy(usersOffline, usersOnline, 'id');

        return usersOnline.concat(usersOffline);
    }

    render() {
        const {translate} = this.props,
            usersList = this.getUsersSortList();

        return (
            <div>
                <ListGroup>
                    {usersList.map((user) => (
                        <ListGroupItem key={user.id} className="user-list-item">
                            <Link to={`/messages/${user.id}`}>
                                <UserItem user={user} />
                            </Link>
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        );
    }
}

export default connect(
    state => ({
        onlineUsers: state.chat.onlineUsers,
        users: state.chat.entities.users.byId,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({fillUsersList}, dispatch)
)(UserListContainer);
