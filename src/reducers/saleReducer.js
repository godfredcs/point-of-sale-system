import { GET_ALL_SALES_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    sales: [],
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_SALES_SUCCESS:
            console.log(action.payload);
            return { ...state, sales: action.payload };

        default:
            return state;
    }
};



