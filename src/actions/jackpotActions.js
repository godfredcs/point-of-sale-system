import { 
    GET_ALL_JACKPOTS_SUCCESS, GET_ALL_JACKPOTS_FAIL,
    GET_JACKPOTS_TODAY_SUCCESS, GET_JACKPOTS_TODAY_FAIL,
    GET_JACKPOTS_YESTERDAY_SUCCESS, GET_JACKPOTS_YESTERDAY_FAIL, 
    ADD_JACKPOT_SUCCESS, ADD_JACKPOT_FAIL, EDIT_JACKPOT_SUCCESS, EDIT_JACKPOT_FAIL,
    RENDER_JACKPOT_TO_EDIT,
} from './types';

import Jackpot from '../services/Jackpot';

// Action creator for getting all jackpot entries in the system.
export const getAllJackpots = () => async dispatch => {
    try {
        let jackpots = await Jackpot.getAll();

        if (jackpots) {
            dispatch({ type: GET_ALL_JACKPOTS_SUCCESS, payload: jackpots });
        }
    } catch (error) {
        dispatch({ type: GET_ALL_JACKPOTS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for getting jackpot entries according to specified dates in the system.
export const getJackpotByDate = (from, to, day) => async dispatch => {
    try {
        let jackpots = await Jackpot.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (jackpots) {
            if (day === 'today') {
                dispatch({ type: GET_JACKPOTS_TODAY_SUCCESS, payload: jackpots });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_JACKPOTS_YESTERDAY_SUCCESS, payload: jackpots });
            } else {
                dispatch({ type: GET_ALL_JACKPOTS_SUCCESS, payload: jackpots });
            }
        }
    } catch (error) {
        dispatch({ type: GET_ALL_JACKPOTS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for adding jackpot transaction to the system.
export const addJackpot = (data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let jackpot = await Jackpot.add(data);

        if (jackpot) {
            dispatch({ type: ADD_JACKPOT_SUCCESS });
            
            refresh && refresh();
    
            clear && clear();

            successNotification && successNotification();
        }

    } catch (error) {
        dispatch({ type: ADD_JACKPOT_FAIL });
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for editing jackpot transactions to the system.
export const editJackpot = (id, data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let jackpot = await Jackpot.update(id, data);

        if (jackpot) {
            dispatch({ type: EDIT_JACKPOT_SUCCESS });

            refresh && refresh();

            clear && clear();

            successNotification && successNotification();
        }
    } catch(error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for rendering a jackpot to edit in the system.
export const renderJackpotToEdit = payload => {
    return {
        type: RENDER_JACKPOT_TO_EDIT,
        payload,
    };
};
