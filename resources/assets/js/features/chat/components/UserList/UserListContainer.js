import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {ListGroup, ListGroupItem} from 'reactstrap';

import UserItem from './UserItem';
import {fillUsersList} from 'features/chat/actions';

import 'features/chat/styles/user-list.scss';

class UserListContainer extends React.Component {

    constructor() {
        super();
    }

    componentWillMount() {
        this.getUserList();
    }

    getUserList() {
        const {fillUsersList} = this.props;

        fillUsersList();
    }

    render() {
        const {translate, usersId} = this.props;

        return (
            <div>
                <div className="bg-white">
                    <ListGroup>
                        {usersId.map((id) => (
                            <ListGroupItem key={id} tag="a" href={`messages/${id}`} className="user-list-item">
                                <UserItem userId={id} />
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        usersId: state.chat.usersId,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({fillUsersList}, dispatch)
)(UserListContainer);
