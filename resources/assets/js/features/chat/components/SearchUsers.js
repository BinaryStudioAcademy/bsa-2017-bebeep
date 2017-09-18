import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTranslate} from 'react-localize-redux';
import {AsyncTypeahead, Menu, menuItemContainer} from 'react-bootstrap-typeahead';

import ResultItem from './SearchDropdown/ResultItem';
import {filterUsers, setUserListToNoActive, EMAIL_QUERY_MODE} from '../actions';

import '../styles/search-users.scss';

const SEARCH_TYPEAHEAD_CONFIG = {
    filterBy: ['first_name', 'last_name', 'email'],
    maxResults: 50,
    minLength: 1,
    useCache: false,
};

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

        this.onSearchFocus = this.onSearchFocus.bind(this);
        this.onSearchBlur = this.onSearchBlur.bind(this);
        this.onSearchInputChange = this.onSearchInputChange.bind(this);
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

    onSearchFocus() {
        this.props.setUserListToNoActive(true);
    }

    onSearchBlur() {
        const _this = this;

        setTimeout(() => {
            _this.props.setUserListToNoActive(false);
        }, 200);
    }

    onSearchInputChange() {
        const { usersListNoActive, setUserListToNoActive } = this.props;

        if (usersListNoActive === false) {
            setUserListToNoActive(true);
        }
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
                {...SEARCH_TYPEAHEAD_CONFIG}
                options={foundUsers}
                className={"bootstrap-typeahead search-users " + loadingClass}
                labelKey={user => this.setSearchLabelKey(user)}
                renderMenu={this.renderMenu}
                onSearch={this.filterUsers}
                onFocus={this.onSearchFocus}
                onBlur={this.onSearchBlur}
                onInputChange={this.onSearchInputChange}
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
        usersListNoActive: state.chat.usersListNoActive,
        translate: getTranslate(state.locale),
    }),
    dispatch => bindActionCreators({filterUsers, setUserListToNoActive}, dispatch)
)(SearchUsers);
