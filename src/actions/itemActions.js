import { 
    GET_ALL_ITEMS_SUCCESS, ITEM_ADD_SUCCESS,
    SHOW_ITEM_LOADER, REMOVE_ITEM_LOADER, 
    SHOW_ADD_ITEM_MODAL, SHOW_EDIT_ITEM_MODAL, SHOW_DELETE_ITEM_MODAL,
    ITEM_TO_EDIT, ITEM_EDIT_SUCCESS,
} from './types';
import Item from '../services/Item';

// Action creator for getting all items --<
export const getAllItems = () => async dispatch => {
    dispatch({ type: SHOW_ITEM_LOADER });

    try {
        const items = await Item.getAll();

        if (items) {
            dispatch({ type: GET_ALL_ITEMS_SUCCESS, payload: items });
            dispatch({ type: REMOVE_ITEM_LOADER });
        }
    } catch(error) {
        dispatch({ type: REMOVE_ITEM_LOADER });
        console.log(error);
    }
};

// Action creator for toggling AddItemModal --<
export const showAddItemModal = value => {
    return {
        type: SHOW_ADD_ITEM_MODAL,
        payload: !value,
    };
};

// Action creator for toggling EditItemModal --<
export const showEditItemModal = value => {
    return {
        type: SHOW_EDIT_ITEM_MODAL,
        payload: !value,
    };
};

// Action creator for toggling DeleteItemModal --<
export const showDeleteItemModal = value => {
    return {
        type: SHOW_DELETE_ITEM_MODAL,
        payload: !value,
    };
};

// Action creator for adding item --<
export const addItem = ({ name, unit_price, whole_price }, refreshItemsList, clear, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_ITEM_LOADER });

    try {
        const item = await Item.add({ name, unit_price, whole_price });

        if (item) {
            dispatch({ type: ITEM_ADD_SUCCESS });
            dispatch({ type: REMOVE_ITEM_LOADER });
        }

        refreshItemsList && refreshItemsList();

        clear && clear();

        successNotification && successNotification();
        
    } catch(error) {
        dispatch({ type: REMOVE_ITEM_LOADER });
        
        clear && clear();

        errorNotification && errorNotification();
    }
};

export const renderToEdit = item => {
    return {
        type: ITEM_TO_EDIT,
        payload: item,
    };
};

export const editItem = (id, data, refreshItemsList, successNotification, errorNotification) => async dispatch => {
    dispatch({ type: SHOW_ITEM_LOADER });

    try {
        const item = await Item.update(id, data);

        if (item) {
            dispatch({ type: ITEM_EDIT_SUCCESS });
            dispatch({ type: REMOVE_ITEM_LOADER });
            
            successNotification && successNotification();

            refreshItemsList && refreshItemsList();
        }
    } catch(error) {
        dispatch({ type: REMOVE_ITEM_LOADER });

        errorNotification && errorNotification();
    }
};


















