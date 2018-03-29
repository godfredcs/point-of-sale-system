import { axios } from './index';

export default {
    getAll() {
        return axios.get('sales')
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    getByDate(from, to) {
        return axios.get('sales/filter', { params: { from, to } })
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    add(sale) {
        return axios.post('sales', sale)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};