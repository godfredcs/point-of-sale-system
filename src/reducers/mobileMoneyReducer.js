import { 
    GET_ALL_MOBILE_MONEYS_SUCCESS, GET_ALL_MOBILE_MONEYS_FAIL,
    ADD_MOBILE_MONEY_SUCCESS, ADD_MOBILE_MONEY_FAIL,
    SHOW_ADD_MOBILE_MONEY_MODAL, SHOW_EDIT_MOBILE_MONEY_MODAL, SHOW_DELETE_MOBILE_MONEY_MODAL,
    TRANSACTION_TO_EDIT,
} from '../actions/types';

const INITIAL_STATE = {
    mobile_moneys: [],
    openAddMobileMoneyModal: false,
    openEditMobileMoneyModal: false,
    openDeleteMobileMoneyModal: false,
    transaction: {},
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_MOBILE_MONEYS_SUCCESS:
            return { ...state, mobile_moneys: action.payload };

        case GET_ALL_MOBILE_MONEYS_FAIL:
            return { ...state };

        case SHOW_ADD_MOBILE_MONEY_MODAL:
            return { ...state, openAddMobileMoneyModal: action.payload };

        case SHOW_EDIT_MOBILE_MONEY_MODAL:
            return { ...state, openEditMobileMoneyModal: action.payload };

        case SHOW_DELETE_MOBILE_MONEY_MODAL:
            return { ...state, openDeleteMobileMoneyModal: action.payload };

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



