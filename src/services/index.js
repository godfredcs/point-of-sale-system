import Axios from 'axios';

const WIFI = `192.168.8.107`;

// Setup the baseURL or api endpoint
export const axios = Axios.create({
    baseURL: `http://${WIFI}:5000`,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
});

// Intercept each request and set the bearer token for user
axios.interceptors.request.use(async config => {
    let apiToken = await localStorage.getItem('api_token');

    if (apiToken && !config.headers.common.Authorization) {
        config.headers.common.Authorization = `Bearer ${apiToken}`;
    }

    return config;
});

