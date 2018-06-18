import { 
    GET_ALL_MOBILE_MONEYS_SUCCESS, GET_ALL_MOBILE_MONEYS_FAIL,
    GET_MOBILE_MONEYS_TODAY_SUCCESS, GET_MOBILE_MONEYS_YESTERDAY_SUCCESS, GET_MOBILE_MONEYS_LONG_SUCCESS,
    ADD_MOBILE_MONEY_SUCCESS, ADD_MOBILE_MONEY_FAIL,
    TRANSACTION_TO_EDIT,
} from '../actions/types';

const INITIAL_STATE = {
    mobile_moneys: [],
    mobile_moneys_today: [],
    mobile_moneys_yesterday: [],
    mobile_moneys_long: [],
    transaction: {},
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_MOBILE_MONEYS_SUCCESS:
            return { ...state, mobile_moneys: action.payload };

        case GET_ALL_MOBILE_MONEYS_FAIL:
            return { ...state };

        case GET_MOBILE_MONEYS_TODAY_SUCCESS:
            return { ...state, mobile_moneys_today: action.payload };

        case GET_MOBILE_MONEYS_YESTERDAY_SUCCESS:
            return { ...state, mobile_moneys_yesterday: action.payload };

        case GET_MOBILE_MONEYS_LONG_SUCCESS:
            return { ...state, mobile_moneys_long: action.payload };

        case ADD_MOBILE_MONEY_SUCCESS:
            return { ...state, openAddMobileMoneyModal: false };

        case ADD_MOBILE_MONEY_FAIL:
            return { ...state };

        case TRANSACTION_TO_EDIT:
            return { ...state, transaction: action.payload };

        default:
            return state;
    }
};



