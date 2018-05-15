import { axios } from './index';

export default {
    getAll() {
        return axios.get('credit_transfers')
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    add(item) {
        return axios.post('credit_transfers', item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    update(id, item) {
        return axios.put(`credit_transfers/${id}`, item)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    
    delete(id) {
        return axios.delete(`credit_transfers/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};