import {httpGet} from "@/api/interceptor.js";
import Config from './config';

const tplAPI = {
  getLingo(params) {
    return httpGet({
      url: `${Config.RequestTable.site_a.getMnemoics}`,
      params: params
    })
  },
  getMeans(params) {
    return httpGet({
      url: `${Config.RequestTable.site_a.getMeaning}`,
      params: params,
      siteName: 'site_a'
    })
  },

  getPharse(params) {
    return httpGet({
      url: `${Config.RequestTable.site_a.getWordResource}`,
      params: params,
      siteName: 'site_a'
    })
  },

  getNebula(params) {
    return httpGet({
      url: `${Config.RequestTable.site_a.nebulaData}`,
      params: params,
      siteName: 'site_a'
    })
  },
  getTrees(params) {
    return httpGet({
      url: `${Config.RequestTable.site_a.tree}`,
      params: params,
      siteName: 'site_a'
    })
  },

  getWisDomAffix(params) {
    return httpGet({
      url: `${Config.RequestTable.site_a.wisdomAffix}`,
      params: params,
      siteName: 'site_a'
    })
  },

  getVideoInfos(params) {
    return httpGet({
      url: `${Config.RequestTable.site_b.getVideoInfo}/${params}.json`,
      params: {},
      siteName: 'site_b'
    })
  }
};

export default tplAPI;
