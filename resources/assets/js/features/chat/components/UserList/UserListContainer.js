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
                <div className="bg-white">
                    <ListGroup>
                        {usersId.map((id) => (
                            <ListGroupItem key={id} tag="a" href={`dashboard/messages/${id}`} className="user-list-item">
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
