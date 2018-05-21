import { GET_ALL_SALES_SUCCESS } from './types';
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

export const getSalesByDate = (from, to) => async dispatch => {
    try {
        let sales = await Sale.getByDate(new Date(from), new Date(`${to}T23:59:59`));

        if (sales) {
            dispatch({ type: GET_ALL_SALES_SUCCESS, payload: sales });
        }
    } catch(error) {
        console.log(error);
    }
};

export const addSale = (data, refreshSales, close) => async dispatch => {
    try {
        console.log(data)
        let sale = await Sale.add(data);

        if (sale) {
            if (refreshSales) {
                refreshSales();
            }

            if (close) {
                close();
            }
        }
    } catch (error) {
        console.log(error);
    }
}






