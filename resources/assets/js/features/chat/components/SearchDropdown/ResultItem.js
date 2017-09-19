import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import { getProfileAvatar } from 'app/services/PhotoService';

class ResultItem extends React.Component {

    render() {
        const user = this.props.option;

        return (
            <li>
                <Link to={`/dashboard/messages/${user.id}`}
                    className="dropdown-item search-users__user-link"
                >
                    <img className="search-users__user-avatar"
                        src={getProfileAvatar(user.avatar)}
                        alt=""
                    />
                    <span className="search-users__user-name">
                        {user.first_name} {user.last_name}</span>
                </Link>
            </li>
        );
    }
}

export default ResultItem;
