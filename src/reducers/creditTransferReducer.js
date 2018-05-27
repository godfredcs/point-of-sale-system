import {
    GET_ALL_CREDIT_TRANSFERS_SUCCESS, GET_ALL_CREDIT_TRANSFERS_FAIL, GET_CREDIT_TRANSFERS_TODAY,
    CREDIT_TRANSFER_TO_EDIT,
} from '../actions/types';

const INITIAL_STATE = {
    credit_transfers: [],
    credit_transfers_today: [],
    credit_transfer_to_edit: {
        name: '',
        amount: '',
    },
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_CREDIT_TRANSFERS_SUCCESS:
            return { ...state, credit_transfers: action.payload };

        case GET_CREDIT_TRANSFERS_TODAY:
            return { ...state, credit_transfers_today: action.payload };

        case CREDIT_TRANSFER_TO_EDIT:
            return { ...state, credit_transfer_to_edit: action.payload };

        default:
            return state;
    }
}