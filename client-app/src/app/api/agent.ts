import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/Activity";

axios.defaults.baseURL = "http://localhost:5208/api";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, data: object) => axios.post<T>(url, data).then(responseBody),
  put: <T>(url: string, data: object) => axios.put<T>(url, data).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<IActivity[]>("/activities"),
  add: (activity: IActivity) => requests.post<IActivity>("/activities", activity),
  update: (activity: IActivity) => requests.put<IActivity>(`/activities/${activity.id}`, activity),
  remove: (id: string) => requests.del(`/activities/${id}`),
};

const agent = {
  Activities,
};

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.error("Request error occured ..........................");
    if (error.request) {
      console.log(error.request);
    } else {
      console.log(error.message);
    }
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  async function (response) {
    return response;
    const myPromise = new Promise<AxiosResponse>((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 500);
    });
    return myPromise;
  },
  function (error) {
    console.error("Response error occured ..........................");
    if (error.response) {
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
    return Promise.reject(error);
  }
);

export default agent;
