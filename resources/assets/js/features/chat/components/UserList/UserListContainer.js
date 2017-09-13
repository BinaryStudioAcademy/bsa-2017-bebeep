import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import ChatService from 'app/services/ChatService';
import {addUsersToList} from '../../actions';
import UserItem from './UserItem';
import {ListGroup, ListGroupItem} from 'reactstrap';
import '../../styles/user-list.scss';

class UserListContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            //TODO
        };
    }

    componentWillMount() {
        this.getUserList();
    }

    getUserList() {
        const {addUsersToList} = this.props;

        ChatService.getOthersUser()
            .then((response) => {
                addUsersToList(response.data);
            });
    }

    render() {
        const {translate, usersId} = this.props;

        return (
            <div>
                <div className="bg-white">
                    <ListGroup>
                        {usersId.map((id) => (
                            <ListGroupItem>
                                <UserItem key={id} userId={id} />
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
    dispatch => bindActionCreators({addUsersToList}, dispatch)
)(UserListContainer);