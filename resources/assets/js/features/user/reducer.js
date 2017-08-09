import * as actions from './actionTypes';

const initialState = {
    register: {
        user: {
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            birth_date: "",
            role_driver: false,
            role_passenger: false,
            password: "",
            password_confirmation: "",
        },
        errors: {}
    }
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.REGISTER_SET_FIELD:
            let field = {};
            field[action.field] = action.value;
            return {
                ...state,
                register: {
                    ...state.register,
                    user: Object.assign(state.register.user, field)
                }
            };
        case actions.REGISTER_SEND:
            return (dispatch) => {
                return {
                    ...state,
                        register: {
                    ...state.register,
                            errors: {
                            first_name: "first_name invalid",
                                last_name: "last_name invalid"
                        }
                    }
                };
            };
        default: {
            return state;
        }
    }
};
