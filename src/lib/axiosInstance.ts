'use client'

import { API_URI, AuthJWTLSKey } from '@/app/global';
import { getCookie } from '@/utils/cookiesUtils';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_URI, // Replace with your API base URL
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    // For example, add an authentication token to the headers
    // const token = localStorage.getItem('authToken'); // Retrieve auth token from localStorage
    const authToken = getCookie(AuthJWTLSKey);
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use((response) =>{
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data    
    return response;
  },  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
        window.open('/authentication/login');
    }
    return Promise.reject(error);
  });

export default axiosInstance;