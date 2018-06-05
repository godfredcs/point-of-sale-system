import {
    GET_ALL_CREDIT_TRANSFERS_SUCCESS, GET_ALL_CREDIT_TRANSFERS_FAIL,
    GET_CREDIT_TRANSFERS_TODAY_SUCCESS, GET_CREDIT_TRANSFERS_YESTERDAY_SUCCESS,
    CREDIT_TRANSFER_TO_EDIT,
} from '../actions/types';

const INITIAL_STATE = {
    error: null,
    credit_transfers: [],
    credit_transfers_today: [],
    credit_transfers_yesterday: [],
    credit_transfer_to_edit: {
        name: '',
        amount: '',
    },
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_CREDIT_TRANSFERS_SUCCESS:
            return { ...state, credit_transfers: action.payload };

        case GET_ALL_CREDIT_TRANSFERS_FAIL:
            return { ...state, error: action.payload };

        case GET_CREDIT_TRANSFERS_TODAY_SUCCESS:
            return { ...state, credit_transfers_today: action.payload };

        case GET_CREDIT_TRANSFERS_YESTERDAY_SUCCESS:
            return { ...state, credit_transfers_yesterday: action.payload };

        case CREDIT_TRANSFER_TO_EDIT:
            return { ...state, credit_transfer_to_edit: action.payload };

        default:
            return state;
    }
}