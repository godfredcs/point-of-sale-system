import { 
    GET_ALL_JACKPOTS_SUCCESS, GET_ALL_JACKPOTS_FAIL,
    GET_JACKPOTS_TODAY_SUCCESS,
    GET_JACKPOTS_YESTERDAY_SUCCESS,
    ADD_JACKPOT_SUCCESS, ADD_JACKPOT_FAIL,
    RENDER_JACKPOT_TO_EDIT,
} from '../actions/types';

const INITIAL_STATE = {
    jackpots: [],
    jackpots_today: [],
    jackpots_yesterday: [],
    jackpot_to_edit: {
        name: '',
        amount: ''
    },
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_JACKPOTS_SUCCESS:
            return { ...state, jackpots: action.payload };

        case GET_ALL_JACKPOTS_FAIL:
            return { ...state };

        case GET_JACKPOTS_TODAY_SUCCESS:
            console.log('these jackpots are from today ', action.payload)
            return { ...state, jackpots_today: action.payload };

        case GET_JACKPOTS_YESTERDAY_SUCCESS:
            console.log('these jackpots are from yesterday ', action.payload)
            return { ...state, jackpots_yesterday: action.payload };

        case ADD_JACKPOT_SUCCESS:
            return { ...state, openAddJackpotModal: false };

        case ADD_JACKPOT_FAIL:
            return { ...state };

        case RENDER_JACKPOT_TO_EDIT:
            return { ...state, jackpot_to_edit: action.payload };
    
        default:
            return state;
    }
};









