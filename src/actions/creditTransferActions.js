import {
    GET_ALL_CREDIT_TRANSFERS_SUCCESS, GET_ALL_CREDIT_TRANSFERS_FAIL,
    GET_CREDIT_TRANSFERS_TODAY_SUCCESS, GET_CREDIT_TRANSFERS_YESTERDAY_SUCCESS,
    ADD_CREDIT_TRANSFER_SUCCESS, ADD_CREDIT_TRANSFER_FAIL,
    EDIT_CREDIT_TRANSFER_SUCCESS, EDIT_CREDIT_TRANSFER_FAIL,
    CREDIT_TRANSFER_TO_EDIT,
} from './types';
import CreditTransfer from '../services/CreditTransfer';

// Action creator for getting all credit transfers.
export const getAllCreditTransfers = () => async dispatch => {
    try {
        let credit_transfers = await CreditTransfer.getAll();

        if (credit_transfers) {
            dispatch({ type: GET_ALL_CREDIT_TRANSFERS_SUCCESS, payload: credit_transfers });
        }
    } catch (error) {
        dispatch({ type: GET_ALL_CREDIT_TRANSFERS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for getting credit transfers by date.
export const getCreditTransferByDate = (from, to, day) => async dispatch => {
    try {
        let credit_transfers = await CreditTransfer.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (credit_transfers) {
            if (day === 'today') {
                dispatch({ type: GET_CREDIT_TRANSFERS_TODAY_SUCCESS, payload: credit_transfers });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_CREDIT_TRANSFERS_YESTERDAY_SUCCESS, payload: credit_transfers });
            } else {
                dispatch({ type: GET_ALL_CREDIT_TRANSFERS_SUCCESS, payload: credit_transfers });
            }
        }
    } catch (error) {
        dispatch({ type: GET_ALL_CREDIT_TRANSFERS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for adding credit transfers to the system.
export const addCreditTransfer = (data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        const credit_transfer = await CreditTransfer.add(data);

        if (credit_transfer) {
            dispatch({ type: ADD_CREDIT_TRANSFER_SUCCESS });

            refresh && refresh();

            clear && clear();

            successNotification && successNotification();
        }
    } catch (error) {
        dispatch({ type: ADD_CREDIT_TRANSFER_FAIL, payload: error });
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for rendering the item to edit.
export const renderCreditTransferToEdit = item => {
    return {
        type: CREDIT_TRANSFER_TO_EDIT,
        payload: item,
    };
};

// Action creator for editing credit transfers in the system.
export const editCreditTransfer = (id, data, refresh, close, successNotification, errorNotification) => async dispatch => {
    try {
        const credit_transfer = await CreditTransfer.update(id, data);

        if (credit_transfer) {
            dispatch({ type: EDIT_CREDIT_TRANSFER_SUCCESS });

            close && close();
            
            refresh && refresh();

            successNotification && successNotification();
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: EDIT_CREDIT_TRANSFER_FAIL });
        
        errorNotification && errorNotification();
    }
};
