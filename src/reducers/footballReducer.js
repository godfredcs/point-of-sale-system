import { 
    GET_ALL_FOOTBALLS_SUCCESS, GET_ALL_FOOTBALLS_FAIL,
    GET_FOOTBALLS_TODAY_SUCCESS, GET_FOOTBALLS_YESTERDAY_SUCCESS, GET_FOOTBALLS_LONG_SUCCESS,
    ADD_FOOTBALL_SUCCESS, ADD_FOOTBALL_FAIL, RENDER_FOOTBALL_TO_EDIT,
} from '../actions/types';

const INITIAL_STATE = {
    footballs: [],
    footballs_today: [],
    footballs_yesterday: [],
    footballs_long: [],
    football_to_edit: {
        name: '',
        unit_charge: '',
        number_of_people: ''
    }
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

        case GET_FOOTBALLS_LONG_SUCCESS:
            return { ...state, footballs_long: action.payload };

        case ADD_FOOTBALL_SUCCESS:
            return { ...state };

        case ADD_FOOTBALL_FAIL:
            return { ...state };

        case RENDER_FOOTBALL_TO_EDIT:
            return { ...state, football_to_edit: action.payload };
    
        default:
            return state;
    }
};









