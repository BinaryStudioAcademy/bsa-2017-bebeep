import React from 'react';
import { Link } from 'react-router';

import { getDriverAvatar, getPassengerAvatar } from 'app/services/PhotoService';


class TripUserImage extends React.Component {

    render() {
        const { user, type, id, className } = this.props,
            link = `/${type}/${user.id}`;

        const getAvatar = type === 'driver' ? getDriverAvatar : getPassengerAvatar;

        return (
            <Link to={ link } id={ id }>
                <div className={ className }>
                    <img className="trip-user-image__item"
                        alt={ user.full_name }
                        src={ getAvatar(user) }
                    />
                </div>
            </Link>
        )
    }
}

export default TripUserImage;
