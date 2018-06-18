import {
    GET_ALL_SALES_SUCCESS,
    GET_SALES_TODAY_SUCCESS, GET_SALES_YESTERDAY_SUCCESS, GET_SALES_LONG_SUCCESS,
    SALE_TO_EDIT, 
} from '../actions/types';

const INITIAL_STATE = {
    sales: [],
    sales_today: [],
    sales_yesterday: [],
    sales_long: [],
    sale_to_edit: {
        name: '',
        unit_quantity: 0,
        unit_price: 0,
        whole_quantity: 0,
        whole_price: 0,
        total: 0,
    },
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_SALES_SUCCESS:
            return { ...state, sales: action.payload };

        case GET_SALES_TODAY_SUCCESS:
            return { ...state, sales_today: action.payload };

        case GET_SALES_YESTERDAY_SUCCESS:
            return { ...state, sales_yesterday: action.payload };

        case GET_SALES_LONG_SUCCESS:
            return { ...state, sales_long: action.payload };

        case SALE_TO_EDIT:
            return { ...state, sale_to_edit: action.payload };

        default:
            return state;
    }
};



