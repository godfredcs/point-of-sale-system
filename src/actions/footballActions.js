import { 
    GET_ALL_FOOTBALLS_SUCCESS, GET_ALL_FOOTBALLS_FAIL, 
    ADD_FOOTBALL_FAIL, ADD_FOOTBALL_SUCCESS, 
    SHOW_ADD_FOOTBALL_MODAL, SHOW_EDIT_FOOTBALL_MODAL, SHOW_DELETE_FOOTBALL_MODAL,
} from './types';

import Football from '../services/Football';

// Action creator for getting all footballs.
export const getAllFootballs = () => async dispatch => {
    try {
        let footballs = await Football.getAll();

        if (footballs) {
            dispatch({ type: GET_ALL_FOOTBALLS_SUCCESS, payload: footballs });
        }
    } catch (error) {
        dispatch({ type: GET_ALL_FOOTBALLS_FAIL, payload: error });
        console.log(error);
    }
};

// Action creator for getting footballs by date.
export const getFootballByDate = (from, to) => async dispatch => {
    try {
        let footballs = await Football.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (footballs) {
            dispatch({ type: GET_ALL_FOOTBALLS_SUCCESS, payload: footballs });
            console.log('this is the array of footballs ', footballs);
        }
    } catch (error) {
        dispatch({ type: GET_ALL_FOOTBALLS_FAIL, payload: error });
        console.log(error);
    }
};

export const showAddFootballModal = value => {
    return {
        type: SHOW_ADD_FOOTBALL_MODAL,
        payload: value,
    };
};

export const showEditFootballModal = value => {
    return {
        type: SHOW_EDIT_FOOTBALL_MODAL,
        payload: !value,
    };
};

export const showDeleteFootballModal = value => {
    return {
        type: SHOW_DELETE_FOOTBALL_MODAL,
        payload: !value,
    };
};

// Action creator for adding football to database.
export const addFootball = (data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let football = await Football.add(data);

        if (football) {
            dispatch({ type: ADD_FOOTBALL_SUCCESS });
            
            refresh && refresh();
    
            clear && clear();

            successNotification && successNotification();
        }
    } catch (error) {
        dispatch({ type: ADD_FOOTBALL_FAIL });
        errorNotification && errorNotification();
        console.log(error);
    }
};






