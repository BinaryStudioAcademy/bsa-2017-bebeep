import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {fillUsersList} from '../../actions';
import UserItem from './UserItem';
import {ListGroup, ListGroupItem} from 'reactstrap';
import '../../styles/user-list.scss';

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
                <ListGroup>
                    {usersId.map((id) => (
                        <ListGroupItem key={id} tag="a" href={`/messages/${id}`} className="user-list-item">
                            <UserItem userId={id} />
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
