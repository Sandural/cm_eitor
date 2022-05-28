import axios from "axios";
import { Message } from "element-ui";

const service = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {
    "X-Eng-Auth": "dt%3D2%26osv%3D15.5%26dk%3DiPhone13%252C3%26av%3D1652780610%26u%3D64231699%26r%3D5e68f40418c04a99a4d070e7a9587257%26token%3DCP/jYMEC/3%252BBfNB4Iat4VoUmaTS%252BlczGkD1XGan5VsQ%253D%26ts%3D1653698574000%26sign%3D1%26d%3D1%26avn%3D2.3.2",
    "User-Agent": "Ai-English/2.3.2 (iOS; iPhone13,3; 15.5; zh-Hans-CN)",
    "Content-Type": "application/json",
    "Host": "recite.perfectlingo.com"
  },
  withCredentials: true,
});

service.interceptors.request.use(config => {
  return config;
});

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === 0 || res.retCode === 0) {
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
export function httpGet({ url, params = {} }) {
  return new Promise((resolve, reject) => {
    service
      .get(url, {
        params,
      })
      .then(res => {
        resolve(res?.data || null);
      })
      .catch(err => {
        reject(err);
      });
  });
}
