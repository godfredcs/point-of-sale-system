import { 
    GET_ALL_ITEMS_SUCCESS, ITEM_ADD_SUCCESS,
    SHOW_ITEM_LOADER, REMOVE_ITEM_LOADER,
    ITEM_TO_EDIT, ITEM_EDIT_SUCCESS, GET_FINISHING_ITEMS
} from '../actions/types';

const INITIAL_STATE = {
    items: [],
    items_finishing: [],
    edit_item: {
        id: '',
        name: '',
        unit_price: ''
    },
    show_item_loader: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_ITEMS_SUCCESS:
            return { ...state, items: action.payload, show_item_loader: false };

        case SHOW_ITEM_LOADER:
            return { ...state, show_item_loader: true };
    
        case REMOVE_ITEM_LOADER:
            return { ...state, show_item_loader: false };

        case ITEM_ADD_SUCCESS:
            return { ...state, show_item_loader: false };

        case ITEM_TO_EDIT:
            return { ...state, edit_item: action.payload };

        case ITEM_EDIT_SUCCESS:
            return { ...state, show_item_loader: false };

        case GET_FINISHING_ITEMS:
            return { ...state, show_item_loader: false, items_finishing: action.payload };

        default:
            return state;
    }
};

