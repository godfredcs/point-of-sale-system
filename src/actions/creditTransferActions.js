import {
    GET_ALL_CREDIT_TRANSFERS_SUCCESS, GET_ALL_CREDIT_TRANSFERS_FAIL,
    ADD_CREDIT_TRANSFER_SUCCESS, ADD_CREDIT_TRANSFER_FAIL,
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
export const getCreditTransferByDate = (from, to) => async dispatch => {
    try {
        let credit_transfers = await CreditTransfer.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (credit_transfers) {
            dispatch({ type: GET_ALL_CREDIT_TRANSFERS_SUCCESS, payload: credit_transfers });
        }
    } catch (error) {
        dispatch({ type: GET_ALL_CREDIT_TRANSFERS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for adding credit transfers to the system.
export const addCreditTransfer = (data, refresh, clear) => async dispatch => {
    console.log('this is the data ', data)
    try {
        const credit_transfer = await CreditTransfer.add(data);

        if (credit_transfer) {
            dispatch({ type: ADD_CREDIT_TRANSFER_SUCCESS });

            refresh && refresh();

            clear && clear();
        }
    } catch (error) {
        dispatch({ type: ADD_CREDIT_TRANSFER_FAIL, payload: error });
        console.log(error);
    }
};
