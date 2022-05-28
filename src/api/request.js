import {httpGet} from "@/api/interceptor.js";

// 本地开发 npm run server
const oaBase = {
  getPerFectLingo: "https://recite.perfectlingo.com/api/dictionary/dic/v1",
  getMeaning: "https://recite.perfectlingo.com/dic/v2",
  getNebula: "https://recite.perfectlingo.com/api/dictionary/nebula/v1",
  getTree: "https://recite.perfectlingo.com/api/recite/derivative/v1",
  wisdomTree: "https://recite.perfectlingo.com/api/dictionary/dic/v1"
};



// 提交到 Git , 自动部署, npm run build
const woaBase = {
  getPerFectLingo: "https://recite.perfectlingo.com/api/dictionary/dic/v1",
};

let devAPI = {
  getMnemoics: "/get-mnemonics",
  getWordResource: "/get-word-resources",
  getMeaning: "/get-collins-resources",
  nebulaData: "/get-similar-form", 
  tree: "/get-tree",
  wisdomAffix: "/get-wisdom-affix"
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
  getMeans(params) {
    return httpGet({
      url: `${base.getMeaning}${api.getMeaning}`,
      params: params
    })
  },

  getPharse(params) {
    return httpGet({
      url: `${base.getPerFectLingo}${api.getWordResource}`,
      params: params
    })
  },

  getNebula(params) {
    return httpGet({
      url: `${base.getPerFectLingo}${api.nebulaData}`,
      params: params
    })
  },
  getTrees(params) {
    return httpGet({
      url: `${base.getTree}${api.tree}`,
      params: params
    })
  },

  getWisDomAffix(params) {
    return httpGet({
      url: `${base.wisdomTree}${api.wisdomAffix}`,
      params: params
    })
  }
};

export default tplAPI;
