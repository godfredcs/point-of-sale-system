import { combineReducers } from 'redux';

import users from './usersReducer';
import items from './itemReducer';
import sales from './saleReducer';
import loader from './loaderReducer';

export default combineReducers({
    users,
    items,
    sales,
    loader,
});