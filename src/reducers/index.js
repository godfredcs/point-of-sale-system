import { combineReducers } from 'redux';

import users from './usersReducer';
import items from './itemReducer';
import sales from './saleReducer';
import loader from './loaderReducer';
import mobileMoneys from './mobileMoneyReducer';
import jackpots from './jackpotReducer';
import footballs from './footballReducer';
import creditTransfers from './creditTransferReducer';

export default combineReducers({
    users,
    items,
    sales,
    loader,
    mobileMoneys,
    jackpots,
    footballs,
    creditTransfers,
});