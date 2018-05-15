import { axios } from './index';

export default {
    getAll() {
        return axios.get('jackpot')
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    add(jackpot) {
        return axios.post('jackpot', jackpot)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    update(id, jackpot) {
        return axios.put(`jackpot/${id}`, jackpot)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
    
    delete(id) {
        return axios.delete(`jackpot/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    }
};





