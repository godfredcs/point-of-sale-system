import { 
    GET_ALL_JACKPOTS_SUCCESS, GET_ALL_JACKPOTS_FAIL,
    ADD_JACKPOT_SUCCESS, ADD_JACKPOT_FAIL,
    SHOW_ADD_JACKPOT_MODAL, SHOW_EDIT_JACKPOT_MODAL, SHOW_DELETE_JACKPOT_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
    jackpots: [],
    openAddJackpotModal: false,
    openEditJackpotModal: false,
    openDeleteJackpotModal: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_JACKPOTS_SUCCESS:
            return { ...state, jackpots: action.payload };

        case GET_ALL_JACKPOTS_FAIL:
            return { ...state };

        case SHOW_ADD_JACKPOT_MODAL:
            return { ...state, openAddJackpotModal: action.payload };

        case SHOW_EDIT_JACKPOT_MODAL:
            return { ...state, openEditJackpotModal: action.payload };

        case SHOW_DELETE_JACKPOT_MODAL:
            return { ...state, openDeleteJackpotModal: action.payload };

        case ADD_JACKPOT_SUCCESS:
            return { ...state, openAddJackpotModal: false };

        case ADD_JACKPOT_FAIL:
            return { ...state };
    
        default:
            return state;
    }
};









