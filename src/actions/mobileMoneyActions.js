import { 
    GET_ALL_MOBILE_MONEYS_SUCCESS, GET_ALL_MOBILE_MONEYS_FAIL, GET_MOBILE_MONEYS_TODAY,
    ADD_MOBILE_MONEY_FAIL, ADD_MOBILE_MONEY_SUCCESS, 
    SHOW_ADD_MOBILE_MONEY_MODAL, SHOW_EDIT_MOBILE_MONEY_MODAL, SHOW_DELETE_MOBILE_MONEY_MODAL,
    TRANSACTION_TO_EDIT,
} from './types';

import MobileMoney from '../services/MobileMoney';

export const getAllMobileMoneys = () => async dispatch => {
    try {
        let mobile_moneys = await MobileMoney.getAll();

        if (mobile_moneys) {
            dispatch({ type: GET_ALL_MOBILE_MONEYS_SUCCESS, payload: mobile_moneys });
        }
    } catch (error) {
        dispatch({ type: GET_ALL_MOBILE_MONEYS_FAIL, payload: error });
        console.log(error);
    }
};

export const getMobileMoneyByDate = (from, to, today) => async dispatch => {
    try {
        let mobile_moneys = await MobileMoney.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (mobile_moneys) {
            if (today) {
                dispatch({ type: GET_MOBILE_MONEYS_TODAY, payload: mobile_moneys });
            } else {
                dispatch({ type: GET_ALL_MOBILE_MONEYS_SUCCESS, payload: mobile_moneys });
            }
        }
    } catch (error) {
        dispatch({ type: GET_ALL_MOBILE_MONEYS_FAIL, payload: error });
        console.log(error);
    }
};

export const showAddMobileMoneyModal = value => {
    return {
        type: SHOW_ADD_MOBILE_MONEY_MODAL,
        payload: value,
    };
};

export const showEditMobileMoneyModal = value => {
    return {
        type: SHOW_EDIT_MOBILE_MONEY_MODAL,
        payload: value,
    };
};

export const showDeleteMobileMoneyModal = value => {
    return {
        type: SHOW_DELETE_MOBILE_MONEY_MODAL,
        payload: value,
    };
};

export const addMobileMoney = (data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let mobile_money = await MobileMoney.add(data);

        if (mobile_money) {
            dispatch({ type: ADD_MOBILE_MONEY_SUCCESS });

            refresh && refresh();
    
            clear && clear();

            successNotification && successNotification();
        }
        
    } catch (error) {
        dispatch({ type: ADD_MOBILE_MONEY_FAIL });
        errorNotification && errorNotification();
        console.log(error);
    }
};

export const renderToEdit = item => {
    return {
        type: TRANSACTION_TO_EDIT,
        payload: item,
    };
};






