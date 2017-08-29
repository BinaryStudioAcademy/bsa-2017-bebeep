import React from 'react';
import VehicleIcon from 'app/components/Icons/VehicleIcon';

import PROFILE_AVATAR_DEFAULT from 'app/images/user/profile_default.jpg';
import DRIVER_AVATAR_DEFAULT from 'app/images/user/driver_default.png';
import PASSENGER_AVATAR_DEFAULT from 'app/images/user/passenger_default.png';

// TODO :: it's better to replace these with getProfileAvatar
export const defaultUserPhoto = PROFILE_AVATAR_DEFAULT;
// TODO :: it's better to replace these with getVehiclePhoto
export const defaultCarPhoto = 'https://cdn4.iconfinder.com/data/icons/car-silhouettes/1000/sedan-512.png';

export const getProfileAvatar = (avatar) => {
    return avatar ? avatar : PROFILE_AVATAR_DEFAULT;
};

export const getDriverAvatar = (driver) => {
    return driver.photo ? driver.photo : DRIVER_AVATAR_DEFAULT;
};

export const getPassengerAvatar = (passenger) => {
    return passenger.photo ? passenger.photo : PASSENGER_AVATAR_DEFAULT;
};

export const getVehiclePhoto = (vehicle, className) => {
    if (vehicle.photo === null) {
        return (<VehicleIcon />);
    }
    return (
        <img src={ vehicle.photo } alt={ vehicle.model } className={ className } />
    );
};
