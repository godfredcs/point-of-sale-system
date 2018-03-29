import Axios from 'axios';

// Setup the baseURL or api endpoint
export const axios = Axios.create({
    baseURL: 'http://localhost:3001',
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

