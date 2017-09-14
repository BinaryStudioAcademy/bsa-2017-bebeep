import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
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

    componentWillReceiveProps(nextProps) {
        const { isUsersAdded, users } = nextProps;

        if (!isUsersAdded) {
            return;
        }
        this.setOnlineStatus(users);
    }

    getUsersList() {
        const {fillUsersList, isUsersAdded, users} = this.props;

        fillUsersList();
    }

    setOnlineStatus(users) {
        const { onlineUsers } = this.props;

        console.log(users);
        console.log(onlineUsers);
    }

    getSortUsersList(users) {
        const sortList = _.sortBy(users, ['first_name', 'last_name']);
    }

    render() {
        const {translate, isUsersAdded, usersId, users} = this.props;

        if (!isUsersAdded) {
            return null;
        }

        return (
            <div>
                <ListGroup>
                    {usersId.map((id) => (
                        <ListGroupItem key={id} tag="a"
                            href={`/messages/${id}`}
                            className="user-list-item"
                        >
                            <UserItem user={users[id]} />
                        </ListGroupItem>
                    ))}
                </ListGroup>
            </div>
        );
    }
}

export default connect(
    state => ({
        isUsersAdded: state.chat.isUsersAdded,
        usersId: state.chat.usersId,
        onlineUsers: state.chat.onlineUsers,
        users: state.chat.entities.users.byId,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({fillUsersList}, dispatch)
)(UserListContainer);
