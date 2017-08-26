import React from 'react';
import { Link } from 'react-router';

import { getDriverAvatar, getPassengerAvatar } from 'app/services/PhotoService';


class TripUserImage extends React.Component {

    render() {
        const { user, type, id, className } = this.props,
            getAvatar = type === 'driver' ? getDriverAvatar : getPassengerAvatar;

        // TODO : Link for Passenger Profile
        const link = type === 'driver' ? `/driver/${user.id}` : '#';

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
