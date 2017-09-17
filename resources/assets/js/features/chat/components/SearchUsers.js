import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTranslate} from 'react-localize-redux';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

import {filterUsers, ALL_QUERY_MODE, EMAIL_QUERY_MODE} from '../actions';
import {getProfileAvatar} from 'app/services/PhotoService';

import '../styles/search-users.scss';


class SearchUsers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            preloader: false,
            options: [],
            meta: {
                query: '',
                queryMode: '',
            },
        };

        this.filterUsers = this.filterUsers.bind(this);
        this.setSearchLabelKey = this.setSearchLabelKey.bind(this);
        this.renderMenuItemChildren = this.renderMenuItemChildren.bind(this);
        this.onSearchResultItemClick = this.onSearchResultItemClick.bind(this);
    }

    filterUsers(query) {
        this.setState({
            preloader: true,
        });

        this.props.filterUsers(query)
            .then(response => {
                this.setState({
                    preloader: false,
                    options: response.data,
                    meta: response.meta,
                });
            })
            .catch(error => {
                this.setState({
                    preloader: false,
                    options: [],
                    meta: {
                        query: '',
                        queryMode: '',
                    },
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

    setSearchLabelKey(user) {
        if (this.state.meta.queryMode === EMAIL_QUERY_MODE) {
            return `${user.email}`;
        }
        return `${user.first_name} ${user.last_name}`;
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
                filterBy={['first_name', 'last_name', 'email']}
                labelKey={user => this.setSearchLabelKey(user)}
                onSearch={this.filterUsers}
                placeholder={translate('chat.user_list.search_placeholder')}
                renderMenuItemChildren={this.renderMenuItemChildren}
                promptText="Type to search..."
                searchText="Searching..."
                minLength={1}
                multiple={false}
                useCache={false}
                delay={200}
                ref={ typeahead => { this.typeahead = typeahead; } }
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
