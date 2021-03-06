import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL + '/api/'
});


api.interceptors.request.use(async(config) => {
    if (
        !config.url.endsWith('/authenticate') &&
        !config.url.endsWith('/register') 
      ) {
        //const authToken = localStorage.getItem('authToken');

        //config.headers.authorization = "Bearer " + authToken;
      }
      
      return config;

}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(async(response) => { 
  return response;
}, async (error) => {

  return Promise.reject(error);
});


export default api;