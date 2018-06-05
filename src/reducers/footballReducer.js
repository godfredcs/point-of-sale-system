import { 
    GET_ALL_FOOTBALLS_SUCCESS, GET_ALL_FOOTBALLS_FAIL,
    GET_FOOTBALLS_TODAY_SUCCESS, GET_FOOTBALLS_YESTERDAY_SUCCESS,
    ADD_FOOTBALL_SUCCESS, ADD_FOOTBALL_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
    footballs: [],
    footballs_today: [],
    footballs_yesterday: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_FOOTBALLS_SUCCESS:
            return { ...state, footballs: action.payload };

        case GET_ALL_FOOTBALLS_FAIL:
            return { ...state };

        case GET_FOOTBALLS_TODAY_SUCCESS:
            return { ...state, footballs_today: action.payload };

        case GET_FOOTBALLS_YESTERDAY_SUCCESS:
            return { ...state, footballs_yesterday: action.payload };

        case ADD_FOOTBALL_SUCCESS:
            return { ...state };

        case ADD_FOOTBALL_FAIL:
            return { ...state };
    
        default:
            return state;
    }
};









