import * as actions from './actionTypes';

const initialState = {
    form_items: {
        brands: [],
        models: [],
        colors: [],
        body: []
    },
    vehicles: []
};

export default function (state = initialState, action) {
    switch(action.type) {
        case actions.GET_BRANDS_DATA: {
            return {
                ...state,
                form_items: {
                    ...state.form_items,
                    brands: action.data
                }
            }
        }

        case actions.GET_MODELS_DATA: {
            return {
                ...state,
                form_items: {
                    ...state.form_items,
                    models: action.data
                }
            }
        }

        case actions.RESET_MODELS_DATA: {
            return {
                ...state,
                form_items: {
                    ...state.form_items,
                    models: []
                }
            }
        }

        case actions.GET_COLORS_DATA: {
            return {
                ...state,
                form_items: {
                    ...state.form_items,
                    colors: action.data
                }
            }
        }

        case actions.GET_BODY_DATA: {
            return {
                ...state,
                form_items: {
                    ...state.form_items,
                    body: action.data
                }
            }
        }

        case actions.GET_ALL_VEHICLES: {
            return {
                ...state,
                vehicles: action.vehicles
            };
        }

        case actions.DELETE_VEHICLE_ITEM: {
            const vehicleId = parseInt(action.data.vehicleId);

            return {
                ...state,
                vehicles: state.vehicles.filter((vehicle) => vehicle.id !== vehicleId)
            }
        }

        default: {
            return state;
        }
    }
};
