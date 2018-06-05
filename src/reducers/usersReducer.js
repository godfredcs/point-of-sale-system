import {
    EMAIL_CHANGED, PASSWORD_CHANGED,
    GET_USERS_SUCCESS,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS,
    USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    OPEN_ADD_USER_MODAL, OPEN_EDIT_USER_MODAL, OPEN_DELETE_USER_MODAL,
} from '../actions/types';

const INITIAL_STATE = {
    user: null,
    users: [],
    email: '',
    password: '',
    isLoggedIn: false,
    show_item_loader: false,
    open_add_user_modal: false,
    open_edit_user_modal: false,
    open_delete_user_modal: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };

        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };

        case GET_USERS_SUCCESS:
            return { ...state, users: action.payload };

        case LOGIN_SUCCESS:
            return { ...state, isLoggedIn: true, user: action.payload };

        case LOGIN_FAIL:
            return { ...state, isLoggedIn: false, user: null };

        case LOGOUT_SUCCESS:
            return { ...state, isLoggedIn: false, user: null };

        case USER_UPDATE_SUCCESS:
            return { ...state, user: action.payload };

        case USER_UPDATE_FAIL:
            return { ...state };

        case OPEN_ADD_USER_MODAL:
            return { ...state, open_add_user_modal: action.payload };

        case OPEN_EDIT_USER_MODAL:
            return { ...state, open_edit_user_modal: action.payload };

        case OPEN_DELETE_USER_MODAL:
            return { ...state, open_delete_user_modal: action.payload };

        default:
            return state;
    }
};

