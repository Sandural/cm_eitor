import axios from "axios";
import { Message } from "element-ui";
import Config from './config.js'

const service = axios.create({
  baseURL: "",
  timeout: 10000,
  // withCredentials: true,
});

service.interceptors.request.use(config => {
  return config;
});

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 0 || res.retCode === 0 || !res.denied) {
      return res;
    } else {
      Message.error(res);
      return null;
    }
  },
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          break;
        default:
          Message.error("网络请求异常，请稍后重试!");
          break;
      }
    }
  }
);

// get 请求
export function httpGet({ url, params = {}, siteName }) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params,
        headers: Config.headers[siteName]
      })
      .then(res => {
        resolve(res?.data || null);
      })
      .catch(err => {
        reject(err);
      });
  });
}
