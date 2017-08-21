import * as actions from './actionTypes';

const initialState = {
    brand: {
        id_car_mark: null,
        name: ''
    }
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.GET_MODEL_BRAND_SUCCESS: {
            return {
                ...state,
                brand: {
                    id_car_mark: action.data.id_car_mark,
                    name: action.data.name
                }
            };
        }

        default: {
            return state;
        }
    }
};
