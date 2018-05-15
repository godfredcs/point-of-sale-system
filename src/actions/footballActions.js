import { 
    GET_ALL_FOOTBALLS_SUCCESS, GET_ALL_FOOTBALLS_FAIL, 
    ADD_FOOTBALL_FAIL, ADD_FOOTBALL_SUCCESS, 
    SHOW_ADD_FOOTBALL_MODAL, SHOW_EDIT_FOOTBALL_MODAL, SHOW_DELETE_FOOTBALL_MODAL,
} from './types';

import Football from '../services/Football';

export const getAllFootballs = () => async dispatch => {
    try {
        let footballs = await Football.getAll();

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

export const addFootball = (data, refresh, clear) => async dispatch => {
    console.log('we in')
    try {
        let football = await Football.add(data);

        if (football) {
            dispatch({ type: ADD_FOOTBALL_SUCCESS });
            console.log('football added successfully', football);
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
        dispatch({ type: ADD_FOOTBALL_FAIL });
        console.log(error);
    }
};






