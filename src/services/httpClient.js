import axios from "axios";
import { useDispatch } from "react-redux";

import { setError, setLoading } from "../redux/slices/generalSlice";

const axiosInstance = axios.create({});

const useAxiosInterceptors = () => {
  const dispatch = useDispatch();

  let activeRequestsCount = 0;

  const delayLoading = () => {
    setTimeout(() => {
      dispatch(setLoading(activeRequestsCount > 0));
    }, 1000);
  };

  axiosInstance.interceptors.request.use(
    (config) => {
      activeRequestsCount++; // add +1, if a new request is send
      dispatch(setLoading(activeRequestsCount > 0));
      return config;
    },
    (error) => {
      activeRequestsCount--; // add -1, if error occurred
      delayLoading();
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      activeRequestsCount--; // add -1, if one of responses comes
      delayLoading();
      return response;
    },
    (error) => {
      activeRequestsCount--; // add -1, if error occurred
      delayLoading();
      dispatch(setError(error));
      return Promise.reject(error);
    }
  );
};

const headers = {
  "content-type": "application/json",
  "access-control-allow-origin": "*",
};

const get = async (url, config) => {
  return await axiosInstance
    .get(url, { ...config, ...headers })
    .then((response) => response.data);
};

const post = async (url, data, config) => {
  return await axiosInstance
    .post(url, data, { ...config, ...headers })
    .then((response) => response.data);
};

export { get, post, useAxiosInterceptors };
