import * as actions from './actionTypes';

const profileData = {
    'first_name': 'Ruslan',
    'last_name': 'Dan',
    'email': 'example@gmail.com',
    'phone': '380959996655',
    'birth_date': '1975-04-10'
};

export function editProfile() {
    return {
        type: actions.USER_PROFILE_EDIT,
        user: profileData,
    };
};

/*
USER_PROFILE_EDIT
USER_PASSWORD_CHANGE
USER_AVATAR_CHANGE
 */

/*
export function addVehicle(vehicle) {
    // return type: actions.VEHICLE_ADD
};

export function editVehicle(id) {
    // return type: actions.VEHICLE_EDIT
};

export function deleteVehicle(id) {
    // return type: actions.VEHICLE_DELETE
};
*/
