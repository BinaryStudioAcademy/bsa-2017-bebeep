import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTranslate} from 'react-localize-redux';
import {AsyncTypeahead, Menu, menuItemContainer} from 'react-bootstrap-typeahead';
import _ from 'lodash';

import ResultItem from './SearchDropdown/ResultItem';

import {filterUsers, ALL_QUERY_MODE, EMAIL_QUERY_MODE} from '../actions';
import {getProfileAvatar} from 'app/services/PhotoService';

import '../styles/search-users.scss';

const TypeaheadResultItem = menuItemContainer(ResultItem);

class SearchUsers extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchLoading: false,
            foundUsers: [],
            meta: {
                query: '',
                queryMode: '',
            },
        };

        this.filterUsers = this.filterUsers.bind(this);

        this.renderMenu = this.renderMenu.bind(this);
        this.setSearchLabelKey = this.setSearchLabelKey.bind(this);
    }

    filterUsers(query) {
        this.setState({
            searchLoading: true,
        });

        this.props.filterUsers(query)
            .then(response => {
                this.setState({
                    searchLoading: false,
                    foundUsers: response.data,
                    meta: response.meta,
                });
            })
            .catch(error => {
                this.setState({
                    searchLoading: false,
                    foundUsers: [],
                    meta: {
                        query: '',
                        queryMode: '',
                    },
                });
            });
    }

    setSearchLabelKey(user) {
        if (this.state.meta.queryMode === EMAIL_QUERY_MODE) {
            return `${user.email}`;
        }
        return `${user.first_name} ${user.last_name}`;
    }

    renderMenu(users, menuProps) {
        return (
            <Menu {...menuProps}>
                {users.map((user, index) => (
                    <TypeaheadResultItem key={user.id} option={user} position={index} />
                ))}
            </Menu>
        );
    }

    render() {
        const { translate } = this.props,
            { searchLoading, foundUsers } = this.state,
            loadingClass = searchLoading ? 'search-users--loading' : '';

        return (
            <AsyncTypeahead
                options={foundUsers}
                className={"bootstrap-typeahead search-users " + loadingClass}
                filterBy={['first_name', 'last_name', 'email']}
                labelKey={user => this.setSearchLabelKey(user)}
                renderMenu={this.renderMenu}
                onSearch={this.filterUsers}
                minLength={1}
                useCache={false}
                delay={200}
                maxResults={100}
                placeholder={translate('chat.search.placeholder')}
                promptText={translate('chat.search.dropdown_prompt')}
                searchText={translate('chat.search.dropdown_search')}
                emptyLabel={translate('chat.search.no_results_found')}
                paginationText={translate('chat.search.pagination_text')}
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
