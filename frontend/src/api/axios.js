// Inspired by our Web Project in idg2671, which in turn is inspired by the Bachelor of Glenn, Tom and Cornelius
import axios from "axios";
import { refreshToken } from "./userCalls";

let axiosInstance = axios;
if (process.env && process.env.NODE_ENV && process.env.NODE_ENV === "production") {
  axiosInstance = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BACKEND,
  });
} else {
  axiosInstance = axios.create();
}

function createInterceptor(instance) {
  instance.interceptors.response.use(
    (response) => {
      /*const { config, status, data } = response;
      console.log(`Response from ${config.url}:`, {
        status,
        ...data,
      });*/
      return response;
    },

    async (error) => {
      if (error.response) {
        //console.error(error.response);
        const { status, data } = error.response;
        if (status === 401) {
          if (data === "Unauthorized") {
            try {
              await refreshToken();
              const config = error.config;
              //console.log(config)
              return await axiosInstance({ method: config.method, url: config.url, data: config.data });
            } catch (error) {
              //console.log(error)
              return (window.location.href = "/login");
            }
          } else {
            return (window.location.href = "/login");
          }
        }
        return error.response;
      } else if (error.request) {
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );
}

createInterceptor(axiosInstance);
export default axiosInstance;
