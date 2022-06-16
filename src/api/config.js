const RequestDevTable = {
  site_a: {
    getMnemoics: `https://recite.perfectlingo.com/api/dictionary/dic/v1/get-mnemonics`,
    getWordResource: "https://recite.perfectlingo.com/api/dictionary/dic/v1/get-word-resources",
    getMeaning: `https://recite.perfectlingo.com/dic/v2/get-collins-resources`,
    nebulaData: "https://recite.perfectlingo.com/api/dictionary/nebula/v1/get-similar-form", 
    tree: "https://recite.perfectlingo.com/api/recite/derivative/v1/get-tree",
    wisdomAffix: "https://recite.perfectlingo.com/api/dictionary/dic/v1/get-wisdom-affix"
  },
  site_b: {
    getVideoInfo: "https://wechat.jiguangdanci.com/words"
  }
}

const RequestRrodTable = {
  // 和 上面类似
}

const RequestTable = _env === "development" ? RequestDevTable : RequestRrodTable;
console.log("测试环境变量输出", _env);

export default {
  headers: {
    site_a: {
      "X-Eng-Auth": "dt%3D2%26osv%3D15.5%26dk%3DiPad14%252C1%26av%3D1652780610%26u%3D63948778%26r%3D6f5240d5081a43ac835d612302b72dad%26token%3DfCmRgF61/7/1MRml1iqZkCcd/1feDeZzrjRtaWnD2Cs%253D%26ts%3D1655357977000%26sign%3D1%26d%3D1%26avn%3D2.3.2",
      "User-Agent": "Ai-English/2.3.2 (iOS; iPhone13,3; 15.5; zh-Hans-CN)",
      "Content-Type": "application/json",
      "Host": "recite.perfectlingo.com"
    },
    site_b: {
      "Host": "wechat.jiguangdanci.com",
      "Cookie": "koa:sess=eyJ1c2VyIjp7ImlkIjoxMDUxNzExMCwib3BlbklkIjoiZmFrZW9wZW5pZC0tLS0tLS0tLVhkU0FPQ0FseiIsIm5pY2tOYW1lIjoi5peg5b+1IiwicHJvZmlsZVVybCI6Imh0dHBzOi8vdGhpcmR3eC5xbG9nby5jbi9tbW9wZW4vdmlfMzIvSDBHcURQN2liSG80TTFzYkFpYmt1blA4RXpkdXMwbWljVXNWZFZHZER6Z3VUbjhpYVdzSUxRZW5Ma2tyUm94b21FQmlhUHZPcDBCcHA0QzFMaGhlcVFnUnc2US8xMzIiLCJib29rSWQiOjQwLCJ1c2VyR2FtZUlkIjozMDA4MTEzLCJldmVyUGFpZCI6MX0sIl9leHBpcmUiOjE2NTcwNzQyNDUwOTEsIl9tYXhBZ2UiOjE3MjgwMDAwMDB9; koa:sess.sig=in5AUC_hEWhdpsP5WIPO5u_onPk; JSESSIONID=aaaiGRpCTCAXIa5OCuQfy; jToken=eyJ2ZXJzaW9uIjoiMSIsInVpZCI6MTA1MTcxMTAsInRpbWUiOjE2NTUzNDYyNDUwNzcsInIiOiJiMDc3ZiIsInNpZ24iOiIzOWUzMDhjZGM1In0%3D",
      "accept": "*/*",
      "user-agent": "JGDC:2.6.0;VersionCode:112;OS:IOS;OSVERSION:15.5;DeviceId:00E5503C-0919-429E-907B-F29A0898D072;Device:iPad14,1;Channel:appStore;",
      "accept-language": "zh-Hans-US;q=1, en;q=0.9"
    }
  },
  RequestTable
}