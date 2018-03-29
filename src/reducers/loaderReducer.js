import { SHOW_LOADER, REMOVE_LOADER } from '../actions/types';

const INITIAL_STATE = {
    show_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SHOW_LOADER:
            return { ...state, show_loader: true };

        case REMOVE_LOADER:
            return { ...state, show_loader: false };

        default:
            return state;
    }
};

