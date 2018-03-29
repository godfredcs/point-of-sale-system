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
    console.log({from, to})
    try {
        let sales = await Sale.getByDate(from._d, to._d);

        if (sales) {
            dispatch({ type: GET_ALL_SALES_SUCCESS, payload: sales });
        }
    } catch(error) {
        console.log(error);
    }
};

export const addSale = () => async dispatch => {
    try {
        let sale = await Sale.add();

        if (sale) {
            console.log(sale);
        }
    } catch (error) {
        console.log(error);
    }
}






