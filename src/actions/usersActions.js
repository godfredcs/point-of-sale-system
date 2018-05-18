import { 
    EMAIL_CHANGED, PASSWORD_CHANGED, 
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER, GET_USERS_SUCCESS,
} from './types';
import User from '../services/User';

export const emailChanged = value => {
    return {
        type: EMAIL_CHANGED,
        payload: value
    };
};

export const passwordChanged = value => {
    return {
        type: PASSWORD_CHANGED,
        payload: value
    };
};

export const login = ({ email, password }, _clearCredentials) => async dispatch => {
    dispatch({ type: SHOW_LOADER });

    try {
        const user = await User.authenticate({ email, password });

        if (user) {
            dispatch({ type: REMOVE_LOADER });
            
            localStorage.setItem('api_token', user.api_token);

            if (localStorage.getItem('api_token')) {
                dispatch({ type: LOGIN_SUCCESS, payload: user });

                if (_clearCredentials) {
                    _clearCredentials();
                }
            } 
        }
    } catch (error) {
        localStorage.removeItem('api_token');
        dispatch({ type: LOGIN_FAIL });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

export const getUsers = () => async dispatch => {
    try {
        const users = await User.getUsers();

        if (users) {
            dispatch({ type: GET_USERS_SUCCESS, payload: users });
            console.log('heheehehehee', users);
        }
    } catch (error) {
        console.log(error);
    }
};

export const logout = () => {
    localStorage.removeItem('api_token');
    return { type: LOGOUT_SUCCESS };  
};