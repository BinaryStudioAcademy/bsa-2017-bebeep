import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getTranslate} from 'react-localize-redux';
import {filterUsers} from '../actions';
import '../styles/search-users.scss';

class SearchUsers extends React.Component {
    constructor() {
        super();

        this.state = {
            preloader: false
        };

        this.filterUsers = this.filterUsers.bind(this);
    }

    filterUsers(e) {
        this.setState({preloader: true});
        this.props.filterUsers(e.target.value)
            .then(() => {
                this.setState({preloader: false});
            })
            .catch(() => {
                this.setState({preloader: false});
            });
    }

    render() {
        const {translate} = this.props,
            {preloader} = this.state,
            icoClass = "search-users__icon fa" + (
                preloader ? " fa-circle-o-notch fa-spin" : " fa-search"
            );

        return (
            <div className="input-group search-users">
                <div className="input-group-addon search-users__icon-wrapper">
                    <i className={icoClass} />
                </div>
                <input type="text"
                    className="form-control search-users__input"
                    placeholder={translate('chat.user_list.search_placeholder')}
                    onChange={this.filterUsers}
                />
            </div>
        );
    }
}

export default connect(
    state => ({
        translate: getTranslate(state.locale)
    }),
    dispatch => bindActionCreators({filterUsers}, dispatch)
)(SearchUsers);
