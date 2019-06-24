import {
    EMAIL_CHANGED, PASSWORD_CHANGED,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    SHOW_LOADER, REMOVE_LOADER, GET_USERS_SUCCESS,
    GET_ROLES_SUCCESS, GET_ROLES_FAIL,
    USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    OPEN_ADD_USER_MODAL, OPEN_EDIT_USER_MODAL, OPEN_DELETE_USER_MODAL,
} from './types';
import User from '../services/User';

export const emailChanged = payload => ({type: EMAIL_CHANGED, payload});

export const passwordChanged = payload => ({type: PASSWORD_CHANGED, payload});

/**
 * User Action - For adding a new user in the system.
 *
 * @param {Object} data
 * @param {Function} refresh
 * @param {Function} resetInput
 */
export const addUser = (data, refresh, resetInput) => async dispatch => {
    try {
        const user = await User.register(data);
        if (user) {
            if (refresh) {
                refresh();
            }

            if (resetInput) {
                resetInput();
            }
        }
    } catch (error) {
        console.log(error);
    }
};

/**
 * User Action - For logging user into the system.
 *
 * @param {Object} param0
 * @param {Function} _clearCredentials
 */
export const login = ({ email, password }, _clearCredentials) => async dispatch => {
    try {
        dispatch({ type: SHOW_LOADER });

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
        dispatch({ type: LOGIN_FAIL, payload: error.error.message });
        dispatch({ type: REMOVE_LOADER });
        console.log(error);
    }
};

/**
 * User Action - For updating the user details in the system.
 *
 * @param {Number} id
 * @param {Object} data
 * @param {Function} resetPassword
 */
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

/**
 * User Action - For deleting a user from the system.
 *
 * @param {Number} id
 * @param {Function} refresh
 */
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

export const getRoles = () => async dispatch => {
    try {
        const roles = await User.getRoles();

        if (roles) {
            dispatch({ type: GET_ROLES_SUCCESS, payload: roles });
        }
    } catch (error) {
        dispatch({ type: GET_ROLES_FAIL, payload: error });
        console.log('this is the error from getting roles', error)
    }
}

// Action creator for opening the Add User modal.
export const openAddUserModal = payload => ({type: OPEN_ADD_USER_MODAL, payload });

// Action creator for opening the Edit User modal.
export const openEditUserModal = payload => ({type: OPEN_EDIT_USER_MODAL, payload});

// Action creator for opening the Delete User modal.
export const openDeleteUserModal = payload => ({type: OPEN_DELETE_USER_MODAL, payload});

// Action creator for logging out the user.
export const logout = () => {
    localStorage.removeItem('api_token');
    return { type: LOGOUT_SUCCESS };
};

// Function for parsing error gotten from server.
const parseError = error => {
    return error;
};