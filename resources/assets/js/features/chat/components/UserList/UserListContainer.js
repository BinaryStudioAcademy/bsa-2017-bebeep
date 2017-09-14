import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {ListGroup, ListGroupItem} from 'reactstrap';

import UserItem from './UserItem';
import {fillUsersList} from 'features/chat/actions';
import {Link} from 'react-router';
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
            <div className="bg-white">
                <ListGroup>
                    {usersId.map((id) => (
                        <ListGroupItem key={id} className="user-list-item" >
                            <Link to={`/dashboard/messages/${id}`} >
                                <UserItem userId={id} />
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
        usersId: state.chat.usersId,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({fillUsersList}, dispatch)
)(UserListContainer);
