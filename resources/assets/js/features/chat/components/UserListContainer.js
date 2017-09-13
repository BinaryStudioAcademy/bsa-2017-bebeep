import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import ChatService from 'app/services/ChatService';
import {addUsersToList} from '../actions';

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
        const {translate, usersId, users} = this.props;

        return (
            <div>
                <div className="col-md-8 bg-white ">
                    {usersId.map((id) => {
                        return (
                            <div key={id}>{users.byId[id].first_name} {users.byId[id].last_name}</div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        usersId: state.chat.usersId,
        users: state.chat.entities.users,
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({addUsersToList}, dispatch)
)(UserListContainer);