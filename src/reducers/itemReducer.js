import { 
    GET_ALL_ITEMS_SUCCESS, ITEM_ADD_SUCCESS,
    SHOW_ITEM_LOADER, REMOVE_ITEM_LOADER, 
    SHOW_ADD_ITEM_MODAL, SHOW_EDIT_ITEM_MODAL, SHOW_DELETE_ITEM_MODAL,
    ITEM_TO_EDIT,
    ITEM_EDIT_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    items: [],
    edit_item: {
        id: '',
        name: '',
        unit_price: ''
    },
    show_item_loader: false,
    openAddItemModal: false,
    openEditItemModal: false,
    openDeleteItemModal: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_ITEMS_SUCCESS:
            return { ...state, items: action.payload };

        case SHOW_ITEM_LOADER:
            return { ...state, show_item_loader: true };
    
        case REMOVE_ITEM_LOADER:
            return { ...state, show_item_loader: false };
            
        case SHOW_ADD_ITEM_MODAL:
            return { ...state, openAddItemModal: action.payload };

        case ITEM_ADD_SUCCESS:
            return { ...state, openAddItemModal: false };

        case SHOW_EDIT_ITEM_MODAL:
            return { ...state, openEditItemModal: action.payload };

        case SHOW_DELETE_ITEM_MODAL:
            return { ...state, openDeleteItemModal: action.payload };

        case ITEM_TO_EDIT:
            return { ...state, edit_item: action.payload };

        case ITEM_EDIT_SUCCESS:
            return { ...state, openEditItemModal: false };

        default:
            return state;
    }
};

