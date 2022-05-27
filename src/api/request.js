import {httpGet} from "@/api/interceptor.js";

// 本地开发 npm run server
const oaBase = {
  getPerFectLingo: "https://recite.perfectlingo.com/api/dictionary/dic/v1",
};

// 提交到 Git , 自动部署, npm run build
const woaBase = {
  getPerFectLingo: "https://recite.perfectlingo.com/api/dictionary/dic/v1",
};



let devAPI = {
  getMnemoics: "/get-mnemonics",
  getWordResource: "/get-word-resources",
};

let prodAPI = {};

const base = _env === "development" ? oaBase : woaBase;
const api = _env === "development" ? devAPI : prodAPI;

console.log("测试环境变量输出", _env);
const tplAPI = {
  getLingo(params) {
    return httpGet({
      url: `${base.getPerFectLingo}${api.getMnemoics}`,
      params: params
    })
  },
};

export default tplAPI;
