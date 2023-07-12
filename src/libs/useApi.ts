import { useEffect, useRef } from 'react';
import { useAuth } from 'react-oidc-context';
import axios, { AxiosInstance } from 'axios';

export const useApi = (isBlob:boolean = false) => {
  const axiosInstance = useRef<AxiosInstance>(axios.create());
  const auth = useAuth();
  useEffect(() => {
    axiosInstance.current.interceptors.request.use(function (config) {
      // Do something before request is sent
      config.headers.Authorization = `Bearer ${auth.user?.access_token}`
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });

    axiosInstance.current.interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          // handle 401 error here
          window.location.reload();
        }
        return Promise.reject(error);
      },
    );
    

    // return () => {
    //   axiosInstance.current = undefined;
    // }
  },[auth])

  return axiosInstance;
}