import { 
    GET_ALL_JACKPOTS_SUCCESS, GET_ALL_JACKPOTS_FAIL, 
    ADD_JACKPOT_FAIL, ADD_JACKPOT_SUCCESS, 
    SHOW_ADD_JACKPOT_MODAL, SHOW_EDIT_JACKPOT_MODAL, SHOW_DELETE_JACKPOT_MODAL,
} from './types';

import Jackpot from '../services/Jackpot';

export const getAllJackpots = () => async dispatch => {
    try {
        let jackpots = await Jackpot.getAll();

        if (jackpots) {
            dispatch({ type: GET_ALL_JACKPOTS_SUCCESS, payload: jackpots });
            console.log('this is the array of jackpots ', jackpots);
        }
    } catch (error) {
        dispatch({ type: GET_ALL_JACKPOTS_FAIL, payload: error });
        console.log(error);
    }
};

export const getJackpotByDate = (from, to) => async dispatch => {
    try {
        let jackpots = await Jackpot.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (jackpots) {
            dispatch({ type: GET_ALL_JACKPOTS_SUCCESS, payload: jackpots });
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

export const addJackpot = (data, refresh, clear) => async dispatch => {
    console.log('we in')
    try {
        let jackpot = await Jackpot.add(data);

        if (jackpot) {
            dispatch({ type: ADD_JACKPOT_SUCCESS });
            console.log('jackpot added successfully', jackpot);
        } else {
            console.log('hit it well');
        }

        if (refresh) {
            refresh();
        }

        if (clear) {
            clear();
        }
    } catch (error) {
        dispatch({ type: ADD_JACKPOT_FAIL });
        console.log(error);
    }
};






