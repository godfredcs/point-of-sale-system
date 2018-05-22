import { axios } from './index';

export default {
    getUsers() {
        return axios.get('users')
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    update(id, data) {
        return axios.put(`users/${id}`, data)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    register(user) {
        return axios.post('users/register', user)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    authenticate(user) {
        return axios.post('users/login', user)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },

    delete(id) {
        return axios.delete(`users/${id}`)
                    .then(response => Promise.resolve(response.data))
                    .catch(error => Promise.reject(error.response.data));
    },
};