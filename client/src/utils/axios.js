import axiosJS from 'axios';

const axios = axiosJS.create({
    baseURL: 'http://localhost:5000',
    withCredentials: false,
    headers: {
        accept: '*/*',
    }
})

export default axios;