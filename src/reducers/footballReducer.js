import { 
    GET_ALL_FOOTBALLS_SUCCESS, GET_ALL_FOOTBALLS_FAIL, GET_FOOTBALLS_TODAY,
    ADD_FOOTBALL_SUCCESS, ADD_FOOTBALL_FAIL,
    SHOW_ADD_FOOTBALL_MODAL, SHOW_EDIT_FOOTBALL_MODAL, SHOW_DELETE_FOOTBALL_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
    footballs: [],
    footballs_today: [],
    openAddFootballModal: false,
    openEditFootballModal: false,
    openDeleteFootballModal: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_FOOTBALLS_SUCCESS:
            return { ...state, footballs: action.payload };

        case GET_ALL_FOOTBALLS_FAIL:
            return { ...state };

        case GET_FOOTBALLS_TODAY:
            return { ...state, footballs_today: action.payload };

        case SHOW_ADD_FOOTBALL_MODAL:
            return { ...state, openAddFootballModal: action.payload };

        case SHOW_EDIT_FOOTBALL_MODAL:
            return { ...state, openEditFootballModal: action.payload };

        case SHOW_DELETE_FOOTBALL_MODAL:
            return { ...state, openDeleteFootballModal: action.payload };

        case ADD_FOOTBALL_SUCCESS:
            return { ...state, openAddFootballModal: false };

        case ADD_FOOTBALL_FAIL:
            return { ...state };
    
        default:
            return state;
    }
};









