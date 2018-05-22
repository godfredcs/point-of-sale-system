import { 
    EMAIL_CHANGED, PASSWORD_CHANGED, 
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER, GET_USERS_SUCCESS,
    USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    OPEN_ADD_USER_MODAL, OPEN_EDIT_USER_MODAL, OPEN_DELETE_USER_MODAL,
} from './types';
import User from '../services/User';

// Action creator for taking a user's email.
export const emailChanged = value => {
    return {
        type: EMAIL_CHANGED,
        payload: value
    };
};

// Action creator for taking a user's password.
export const passwordChanged = value => {
    return {
        type: PASSWORD_CHANGED,
        payload: value
    };
};

// Action creator for creating a new user in the system.
export const addUser = (data, refresh, resetInput) => async dispatch => {
    try {
        const user = await User.register(data);
        if (user) {

            refresh && refresh();

            resetInput && resetInput();
        }
    } catch (error) {
        console.log(error);
    }
};

// Action creator for logging a user in.
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

// Action creator for updating user details.
export const updateUser = (id, data, resetPassword) => async dispatch => {
    try {
        const user = await User.update(id, data);

        if (user) {
            dispatch({ type: USER_UPDATE_SUCCESS, payload: user });

            if (resetPassword) {
                resetPassword();
            }
        }
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: parseError(error) });
        console.log(error);
    }
};

// Action creator for deleting a user from the system.
export const deleteUser = (id, refresh) => async dispatch => {
    try {
        const result = await User.delete(id);

        console.log("This is working")
        if (result) {
            console.log("Yes there's results")
            if (refresh) {
                refresh();
            }
        }
    } catch (error) {
        console.log(error);
    }
};

// Action creator for getting all users.
export const getUsers = () => async dispatch => {
    try {
        const users = await User.getUsers();

        if (users) {
            dispatch({ type: GET_USERS_SUCCESS, payload: users });
        }
    } catch (error) {
        console.log(error);
    }
};

// Action creator for opening the Add User modal.
export const openAddUserModal = value => {
    return {
        type: OPEN_ADD_USER_MODAL,
        payload: value,
    };
};

// Action creator for opening the Edit User modal.
export const openEditUserModal = value => {
    return {
        type: OPEN_EDIT_USER_MODAL,
        payload: value,
    };
};

// Action creator for opening the Delete User modal.
export const openDeleteUserModal = value => {
    return {
        type: OPEN_DELETE_USER_MODAL,
        payload: value,
    };
};

// Action creator for logging out the user.
export const logout = () => {
    localStorage.removeItem('api_token');
    return { type: LOGOUT_SUCCESS };  
};

// Function for parsing error gotten from server.
const parseError = error => {
    return error;
};