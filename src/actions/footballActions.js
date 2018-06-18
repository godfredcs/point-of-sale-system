import { 
    GET_ALL_FOOTBALLS_SUCCESS, GET_ALL_FOOTBALLS_FAIL,
    GET_FOOTBALLS_TODAY_SUCCESS, GET_FOOTBALLS_YESTERDAY_SUCCESS, GET_FOOTBALLS_LONG_SUCCESS,
    ADD_FOOTBALL_FAIL, ADD_FOOTBALL_SUCCESS, RENDER_FOOTBALL_TO_EDIT,
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
export const getFootballByDate = (from, to, day) => async dispatch => {
    try {
        let footballs = await Football.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (footballs) {
            if (day === 'today') {
                dispatch({ type: GET_FOOTBALLS_TODAY_SUCCESS, payload: footballs });
            }else if (day === 'yesterday') {
                dispatch({ type: GET_FOOTBALLS_YESTERDAY_SUCCESS, payload: footballs });
            } else if (day === 'long') {
                dispatch({ type: GET_FOOTBALLS_LONG_SUCCESS, payload: footballs });
            } else {
                dispatch({ type: GET_ALL_FOOTBALLS_SUCCESS, payload: footballs });
            }
        }
    } catch (error) {
        dispatch({ type: GET_ALL_FOOTBALLS_FAIL, payload: error });
        console.log(error);
    }
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

// Action creator for rendering the football to edit.
export const renderFootballToEdit = payload => ({
    type: RENDER_FOOTBALL_TO_EDIT,
    payload
});

// Action creator for editing football transaction in the system.
export const editFootball = (id, data, refresh, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let football = await Football.update(id, data);

        if (football) {
            refresh && refresh();

            clear && clear();

            successNotification && successNotification();
        }
    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for deleting football transaction from the system.
export const deleteFootball = (id, refresh) => async dispatch => {
    try {
        const deleted_football = await Football.delete(id);

        if (deleted_football) {
            refresh && refresh();
        }
    } catch (error) {
        console.log(error);
    }
};
