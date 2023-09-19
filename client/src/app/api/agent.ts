import axios, { AxiosError, AxiosResponse } from "axios";
import { Product } from "../model/Product";
import { toast } from "react-toastify";
import { Router } from "react-router-dom";
import { router } from "../../features/router/Routes";
import { promises } from "dns";
import { resolve } from "path";
import Basket from "../../features/Basket/BasketPage";
//https://localhost:7109/api/Basket

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;
//decalring a function for getting data from response
//body of axios response by using single call back function like the following

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));
const responseBody = async (response: AxiosResponse) => {
  await sleep();
  return response.data;
};
//only 200-299 codes are onfulfilled while all other will fall in onreject
axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;

    switch (status) {
      case 400:
        toast.error(data.title + ` Status: ${status}`);
        if (data.errors) {
          const modelStateError: string[] = [];
          for (const key in data.errors) {
            modelStateError.push(data.errors[key]);
          }
          throw modelStateError.flat();
        }
        break;
      case 401:
        toast.error(data.title + ` Status: ${status}`);
        break;
      case 404:
        router.navigate("/not-found", { state: { error: data } });
        toast.error(data.title + ` Status: ${status}`);
        break;
      case 500:
        router.navigate("/server-error", { state: { data: data } });
        break;
    }
    return Promise.reject(error.response);
  }
);

//making an object of name request which contains methods of crud op
const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
};

const catalog = {
  list: () => requests.get("products"),
  details: (id: number) => requests.get(`products/${id}`),
};

// creating an another object for get request made to buggy cotroller and getting response body like status title error list
const testerror = {
  get404Error: () => requests.get("Buggy/not-found"),
  get400Error: () => requests.get("Buggy/bad-request"),
  get401Error: () => requests.get("Buggy/Unauthorized"),
  getBadRequestError: () => requests.get("Buggy/validation-error"),
  get500ServerError: () => requests.get("Buggy/server-error"),
};

// service api's
const basket = {
  getTUserBasket: () => requests.get("Basket"),
  addItem: (productId: number, quantity: number = 1) =>
    requests.post(`Basket?productId=${productId}&quantity=${quantity}`, {}),
  removeItem: (productId: number, quantity: number = 1) =>
    requests.delete(`Basket?productId=${productId}&quantity=${quantity}`),
};

const agent = {
  catalog,
  testerror,
  basket,
};

export default agent;
