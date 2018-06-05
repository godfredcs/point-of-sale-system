import { 
    GET_ALL_JACKPOTS_SUCCESS, GET_ALL_JACKPOTS_FAIL,
    GET_JACKPOTS_TODAY_SUCCESS, GET_JACKPOTS_TODAY_FAIL,
    GET_JACKPOTS_YESTERDAY_SUCCESS, GET_JACKPOTS_YESTERDAY_FAIL, 
    ADD_JACKPOT_SUCCESS, ADD_JACKPOT_FAIL, EDIT_JACKPOT_SUCCESS, EDIT_JACKPOT_FAIL,
    SHOW_ADD_JACKPOT_MODAL, SHOW_EDIT_JACKPOT_MODAL, SHOW_DELETE_JACKPOT_MODAL,
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
export const getJackpotByDate = (from, to, today) => async dispatch => {
    try {
        let jackpots = await Jackpot.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (jackpots) {
            if (today) {
                dispatch({ type: GET_JACKPOTS_TODAY_SUCCESS, payload: jackpots });
            } else {
                dispatch({ type: GET_ALL_JACKPOTS_SUCCESS, payload: jackpots });
            }
        }
    } catch (error) {
        dispatch({ type: GET_ALL_JACKPOTS_FAIL, payload: error });
        console.log(error);
    }
};

export const showAddJackpotModal = value => {
    return {
        type: SHOW_ADD_JACKPOT_MODAL,
        payload: value,
    };
};

export const showEditJackpotModal = value => {
    return {
        type: SHOW_EDIT_JACKPOT_MODAL,
        payload: !value,
    };
};

export const showDeleteJackpotModal = value => {
    return {
        type: SHOW_DELETE_JACKPOT_MODAL,
        payload: !value,
    };
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
export const editJackpot = (id, data, refresh) => async dispatch => {
    try {
        let jackpot = await Jackpot.update(id, data);

        if (jackpot) {
            dispatch({ type: EDIT_JACKPOT_SUCCESS });

            refresh && refresh();
        }
        console.log('so you are trying to edit huh');
    } catch(error) {
        console.log(error);
    }
};
