import { SHOW_LOADER, REMOVE_LOADER } from './types';

export const showLoader = () => {
    return {
        type: SHOW_LOADER
    };
};

export const removeLoader = () => {
    return {
        type: REMOVE_LOADER
    };
};






