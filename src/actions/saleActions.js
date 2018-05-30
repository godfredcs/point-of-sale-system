import { 
    GET_ALL_SALES_SUCCESS, GET_SALES_TODAY, GET_SALES_YESTERDAY,
    SALE_TO_EDIT
} from './types';
import Sale from '../services/Sale';

export const getAllSales = () => async dispatch => {
    try {
        let sales = await Sale.getAll();

        if (sales) {
            dispatch({ type: GET_ALL_SALES_SUCCESS, payload: sales });
        }
    } catch (error) {
        console.log(error);
    }
};

export const getSalesByDate = (from, to, day) => async dispatch => {
    try {
        let sales = await Sale.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (sales) {
            if (day === 'today') {
                dispatch({ type: GET_SALES_TODAY, payload: sales });
            } else if (day === 'yesterday') {
                dispatch({ type: GET_SALES_YESTERDAY, payload: sales });
            } else {
                dispatch({ type: GET_ALL_SALES_SUCCESS, payload: sales });
            }
        }
    } catch(error) {
        console.log(error);
    }
};

export const addSale = (data, refreshSales, clear, successNotification, errorNotification) => async dispatch => {
    try {
        let sale = await Sale.add(data);

        if (sale) {
            refreshSales && refreshSales();

            clear && clear();
            
            successNotification && successNotification();
        }
    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};

// Action creator for rendering a specific sale to edit.
export const renderSaleToEdit = payload => {
    return {
        type: SALE_TO_EDIT,
        payload,
    };
};

// Action creator for editing sales in the system.
export const editSale = (id, data, refreshSales, clear, successNotification, errorNotification) => async dispatch => {
    try {
        const sale = await Sale.update(id, data);

        if (sale) {
            refreshSales && refreshSales();

            clear && clear();

            successNotification && successNotification();
        }
    } catch (error) {
        errorNotification && errorNotification();
        console.log(error);
    }
};


