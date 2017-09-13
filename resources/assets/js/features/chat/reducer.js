import * as actions from './actionTypes';

const initialState = {
        userList:{},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case actions.MY_ACTION:
            return {
                ...state,

            };

        default:
            return state;
    }
};
