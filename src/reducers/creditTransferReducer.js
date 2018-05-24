import {
    GET_ALL_CREDIT_TRANSFERS_SUCCESS, GET_ALL_CREDIT_TRANSFERS_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
    credit_transfers: [],
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_CREDIT_TRANSFERS_SUCCESS:
            return { ...state, credit_transfers: action.payload };

        default:
            return state;
    }
}