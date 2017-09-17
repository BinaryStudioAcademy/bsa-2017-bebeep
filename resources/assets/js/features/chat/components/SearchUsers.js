import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTranslate} from 'react-localize-redux';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import {filterUsers} from '../actions';
import {getProfileAvatar} from 'app/services/PhotoService';

import '../styles/search-users.scss';


class SearchUsers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            preloader: false,
            options: [],
        };

        this.filterUsers = this.filterUsers.bind(this);
        this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this);
        this.onSearchResultItemClick = this.onSearchResultItemClick.bind(this);
    }

    filterUsers(query) {
        this.setState({preloader: true});

        this.props.filterUsers(query)
            .then(response => {
                this.setState({
                    preloader: false,
                    options: response,
                });
            })
            .catch(error => {
                this.setState({
                    preloader: false,
                    options: [],
                });
            });
    }

    onSearchResultItemClick(userId) {
        browserHistory.push(`/dashboard/messages/${userId}`);
    }

    renderMenuItemChildren(user, props, index) {
        return (
            <div key={user.id} onClick={() => this.onSearchResultItemClick(user.id)}>
                <img
                    src={getProfileAvatar(user.avatar)}
                    style={{
                        width: '30px',
                        marginRight: '10px',
                        borderRadius: '50%',
                    }}
                />
                <span>{user.first_name} {user.last_name}</span>
            </div>
        );
    }

    render() {
        const { translate } = this.props,
            { preloader, options } = this.state,
            icoClass = "search-users__icon fa" + (
                preloader ? " fa-circle-o-notch fa-spin" : " fa-search"
            );

        /*<div className="input-group-addon search-users__icon-wrapper">
                    <i className={icoClass} />
                </div>
                <input type="text"
                    className="form-control search-users__input"
                    placeholder={translate('chat.user_list.search_placeholder')}
                    onChange={this.filterUsers}
                />*/

        return (
            <AsyncTypeahead
                options={options}
                className="bootstrap-typeahead"
                filterBy={['first_name', 'last_name']}
                labelKey={option => `${option.first_name} ${option.last_name}`}
                onSearch={this.filterUsers}
                placeholder={translate('chat.user_list.search_placeholder')}
                renderMenuItemChildren={this.renderMenuItemChildren}
                promptText="Type to search..."
                searchText="Searching..."
                minLength={1}
                multiple={false}
                useCache={false}
                delay={200}
            />
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale),
    }),
    dispatch => bindActionCreators({filterUsers}, dispatch)
)(SearchUsers);
