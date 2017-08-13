import * as actions from './actionTypes';

const initialState = {
    filtered: [],
    isOpen: false,
    modalData: [],
};


export default function (state = initialState, action) {
    switch(action.type) {
        case actions.TRIPSLIST_FILTER_PAST: {
            return {
                ...state,
                filtered: action.filtered
            };
        }

        case actions.TRIPSLIST_FILTER_UPCOMING: {
            return {
                ...state,
                filtered: action.filtered
            };
        }

        case actions.TRIPSLIST_SHOW_MODAL:{
            return {
                ...state,
                isOpen:true,
                modalData: action.modalData
            };
        }

        case actions.TRIPSLIST_HIDE_MODAL:{
            return {
                ...state,
                isOpen:false,
                modalData:[]
            };
        }
        default: {
            return state;
        }
    }
};
