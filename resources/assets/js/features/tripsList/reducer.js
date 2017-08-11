import * as actions from './actionTypes';

const initialState = {
    trips: [], // list user trips
    filtered: [], // filtered user trips
    isOpen: false, // status of modal window
    modalData: [] // data in modal window
};


export default function (state = initialState, action) {
    switch(action.type) {
        case actions.TRIPSLIST_GET_ALL: {
            return {
                ...state,
                trips: action.trips
            };
        }
        case actions.TRIPSLIST_FILTER_PAST: {
            return {
            ...state,
            filtered: state.trips.filter(
                item => (new Date(item.start_at)<new Date()))
            };
        }

        case actions.TRIPSLIST_FILTER_UPCOMING: {
            return {
                ...state,
                filtered: state.trips.filter(
                    item => new Date(item.start_at)>new Date())
            };
        }

        case actions.TRIPSLIST_SHOW_MODAL:{
            return {
                ...state,
                isOpen:true,
                modalData: action.modalData
            }
        }

        case actions.TRIPSLIST_HIDE_MODAL:{
            return {
                ...state,
                isOpen:false,
                modalData:[]
            }
        }
        default: {
            return state;
        }
    }
};
