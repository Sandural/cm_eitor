<template>
  <div>
    <el-input v-model="word" style="width: 200px"></el-input>
    <el-button @click="getInfo">获取单词信息</el-button>
    <el-button @click="copyInfo">复制例句</el-button>
    <div id="mainContent">
      <div style="display: flex; align-items: center; column-gap: 10px">
        <div style="color: #00b400; font-weight: 700; font-size:20px">{{word}}</div>
        <audio style="width: 200px" controls :src="audioUrl">Your browser does not support the<code>audio</code> element.</audio>
      </div>
      <div style="font-style: italic;">{{sentence}}</div>
      <div  id="sentences" style="font-style: italic;">
        <div v-for="sent in sentenceExample" :key="sent.exampleId" style="margin: 10px 0">
          <span :style="{color: sent.type == 2 ? '#00b400' : '#5a6263'}" 
                style="background: #ebfaeb;
                      font-size: 12px;
                      font-weight: 700;
                      padding: 2px;
                      border-radius: 4px;
                      margin-right: 10px;">{{ sent.type == 2 ? '真题' : '例句' }}</span>
          <span v-html="sent.exampleEnLabel"></span>
          <div style="margin-top: 6px; font-weight: 200;">{{sent.exampleCn}}</div>
        </div>
      </div>
      
      <div style="width: 100vw; display: flex; align-items: center; column-gap: 10px">
        <video v-show="jgVideo" controls :src="jgVideo" style="max-width: 25%;"></video>
        <img v-show="picUrl" :src="picUrl" style="max-width: 25%;" />
        <video v-show="wordVideoUrl" controls :src="wordVideoUrl" style="max-width: 25%;"></video>
        <video v-show="exampleVideoUrl" controls :src="exampleVideoUrl" style="max-width: 25%;"></video>
      </div>
      <div v-for="(m, index) in meaning" :key="index + m">
        <div>{{ m }}</div>
      </div>
      <div style="font-size: 20px; color: #929292; font-weight: 700;" v-show="derivationStory">🧠 词根词源</div>
      <div>{{derivationStory}}</div>
      <div style="font-size: 20px; color: #929292; font-weight: 700;" v-show="pharse.length">🧚‍♀️ 短语</div>
      <div v-for="(m, i) in pharse" :key="i + m.phrase">
        <div>- **{{ m.phrase }}** {{ m.meanCn }}</div>
      </div>
      <div v-for="pitem in wordGroup">
        <div>- {{pitem}}</div>
      </div>
      <div style="font-size: 20px; color: #929292; font-weight: 700;" v-show="nebulaList.length">⛅️ 星云</div>
      <div v-for="(n, i) in nebulaList" :key="i + n">
        <div>- {{ n }}</div>
      </div>
      <div style="font-size: 20px; color: #929292; font-weight: 700;" v-show="treeList.length">💫 派生词</div>
      <div v-for="n in treeList" :key="n.wordId">
        <div v-html="`- ${n.word.replace(/<b>|<\/b>/g, '**')} {{【${n.character}】${n.meanCn}}}`"></div>
      </div>
      <div style="font-size: 20px; color: #929292; font-weight: 700;" v-show="wordMeanAffixInfoList.length">🌈 智慧词根</div>
      <div
        style="
          position: relative;
          display: flex;
          flex-direction: column;
          row-gap: 10px;
          margin-top: 10px;
          letter-spacing: 0.07em;
        "
        id="wisdom"
      >
        <div
          v-for="(item, index) in wordMeanAffixInfoList"
          :key="index + item.meanCnGroup"
        >
          <p style="font-weight: 700; font-size: 20; color: #c80021;">
            🍒 {{ item.meanCnGroup }}
          </p>
          <div v-if="item.wordAffixInfoList.length">
            <div
              v-for="(affix, aIdx) in item.wordAffixInfoList"
              :key="affix + affix.word"
            >
              <li
                style="
                  font-weight: 300;
                  font-size: 18;
                  margin-top: 10px;
                  margin-right: 0;
                "
                v-html="affix.labelWord.replace(/<b>/g, `<b style='color: #ffa900'>`)"
              >
              </li>
              <div style="margin-top: 5px" v-if="affix.wordRootAffixList">
                <span
                  style="
                    background: #ebfaeb;
                    color: #00b400;
                    font-size: 12px;
                    font-weight: 700;
                    padding: 2px;
                    border-radius: 4px;
                    margin-right: 10px;
                  ">词根</span>
                <span style="color: #a8a8a8; font-weight: 300">{{ affix.wordRootAffixList[0].affix }} = {{ affix.wordRootAffixList[0].content }}</span>
              </div>
              <div style="margin-top: 5px" v-if="affix.wordSuffixAffixList">
                <span
                  style="
                    background: #ebfaeb;
                    color: #00b400;
                    font-size: 12px;
                    font-weight: 700;
                    padding: 2px;
                    border-radius: 4px;
                    margin-right: 10px;
                  ">后缀</span>
                <span style="color: #a8a8a8; font-weight: 300">{{ affix.wordSuffixAffixList[0].affix }} ={{ affix.wordSuffixAffixList[0].content }}</span>
              </div>
              <div style="margin-top: 5px" v-if="affix.wordRememberMethodList">
                <span
                  style="
                    background: #ebfaeb;
                    color: #00b400;
                    font-size: 12px;
                    font-weight: 700;
                    padding: 2px;
                    border-radius: 4px;
                    margin-right: 10px;
                  ">记忆</span>
                <span style="color: #00994a; font-weight: 300">{{affix.wordRememberMethodList[0]}}</span>
              </div>
              <div
                style="
                  margin-top: 5px;
                  display: flex;
                  flex-direction: column;
                  row-gap: 4px;
                " v-if="affix.example">
                <div
                  style="font-style: italic; font-weight: 100"
                  v-html="affix.example.exampleEnLabel.replace(/<b>/g, `<b style='color: #00994a'>`)"></div>
                <div
                  style="color: #a8a8a8; font-weight: 100; font-style: italic"
                  v-html="affix.example.exampleCn"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button @click="simpleCopy(picUrl)">复制图片地址</el-button>
    <el-button @click="simpleCopy(wordVideoUrl)">复制wordVideoUrl</el-button>
    <el-button @click="simpleCopy(exampleVideoUrl)">复制exampleVideoUrl</el-button>
    <el-button @click="copyWisdomContent">复制智慧词根</el-button>
  </div>
    
</template>

<script>
export default {
  data() {
    return {
      word: "",
      picUrl: "",
      meaning: [],
      sentence: "",
      pharse: [],
      wordMean: "",
      exampleVideoUrl: "",
      wordVideoUrl: "",
      nebulaList: [],
      treeList: [],
      wordMeanAffixInfoList: [],
      derivationStory: "",
      sentenceExample: [],
      jgVideo: "",
      wordGroup: ""
    };
  },

  computed: {
    audioUrl() {
      return `https://dict.youdao.com/dictvoice?type=1&audio=${this.word}`
    }
  },

  methods: {
    async getInfo() {
      await Promise.all([
        this.getMnemonics(),
        this.getMeaning(),
        this.getResourcce(),
        this.getNebulas(),
        this.getTree(),
        this.getWisDomAffix(),
        this.getVideoInformation()
      ]);
    },

    async getVideoInformation() {
      let res = await this.$tplAPI.getVideoInfos(this.word)
      const {aliVideoUrl="", wordGroup = ""} = res || {};
      this.jgVideo = aliVideoUrl;
      this.wordGroup = wordGroup.split("\r\n")
    },


    async getMnemonics() {
      this.derivationStory = ''
      let res = await this.$tplAPI.getLingo({
        mnemonicType: "0",
        originId: "1",
        originType: "5",
        word: this.word,
      });
      const { legitimacyMnemonics, picMnemonics } = res?.mnemonics || {}
      let data = picMnemonics[0]?.content;
      this.derivationStory = legitimacyMnemonics?.derivationStory[0] || ''
      
      if (res) {
        this.picUrl = data
          ? `https://wanciwangdata-oss.perfectlingo.com/resources/word-picture/${data}.jpg`
          : "";
      }


    },

    async getMeaning() {
      let res = await this.$tplAPI.getMeans({ word: this.word });
      this.meaning = [];
      if (res) {
        (res?.meanExampleList || []).forEach(v => {
          const { wordMean } = v;
          this.meaning.push(`${wordMean.character} ${wordMean.meaningCn}`);
        });
      }
    },

    async getResourcce() {
      this.sentenceExample = []
      let res = await this.$tplAPI.getPharse({ tagId: 4, word: this.word });
      if (res) {
        this.pharse = res?.wordPhrases;
        const { exampleVideoUrl, wordVideoUrl, exampleCn, exampleEnLabeled } =
          res?.wordExampleVideoResource || {};
        this.sentence = exampleEnLabeled
          ? `${exampleEnLabeled}`
          : "";
        this.exampleVideoUrl = exampleVideoUrl;
        this.wordVideoUrl = wordVideoUrl;

        this.sentenceExample = res?.meanExamples[0]?.examples;
        this.sentenceExample.forEach(v => {
          v.exampleEnLabel = v.exampleEnLabel.replace(/<b>/g, `<b style="color: #00b400">`)
        })

        // console.log('ss', this.sentenceExample);
      }
    },

    async getNebulas() {
      // ?word=crop
      let res = await this.$tplAPI.getNebula({ word: this.word });
      this.nebulaList = [];
      if (res) {
        (res.wordInfos || []).forEach((v, index) => {
          if (index < 5) {
            this.nebulaList.push(
              `**${v.word}**  {{【${v.character || ""}${v.meaningCn}】}}`
            );
          }
        });
      }
    },

    async getTree() {
      let res = await this.$tplAPI.getTrees({ tagId: 4, word: this.word });
      const { child=[] } = res.derivativeTree[0] || {};
      this.treeList = child;
    },

    async getWisDomAffix() {
      let res = await this.$tplAPI.getWisDomAffix({
        tagId: 4,
        word: this.word,
      });
      this.wordMeanAffixInfoList = res?.wordMeanAffixInfoList.slice(0, 1) || [];
    },

    copyInfo() {
      let wisdom = document.getElementById("sentences").outerHTML;
      wisdom = wisdom.replace(/<!---->/g, "")
      this.simpleCopy(wisdom);
    },

    copyWisdomContent() {
      let wisdom = document.getElementById("wisdom").outerHTML;
      wisdom = wisdom.replace(/<!---->/g, "")
      this.simpleCopy(wisdom);
    },

    simpleCopy(content) {
      const text = content;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        document.body.appendChild(textarea);
        textarea.style.position = "fixed";
        textarea.style.clip = "rect(0 0 0 0)";
        textarea.style.top = "10px";
        textarea.value = text;
        textarea.select();
        document.execCommand("copy", true);
        document.body.removeChild(textarea);
      }
      this.$message({
        type: "success",
        message: "复制成功",
      });
    },
  },
};
</script>

<style>
.title {
  font-size: 20px;
  color: red;
}
</style>
