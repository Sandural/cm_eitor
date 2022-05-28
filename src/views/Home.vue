<template>
  <div>
    <el-input v-model="word" style="width: 200px"></el-input>
    <el-button @click="getInfo">获取单词信息</el-button>
    <img style="display: block" :src="picUrl" />
    <div class="title">含义---</div>
    <div v-for="(m, index) in meaning" :key="index + m">
      <div>{{ m }}</div>
    </div>
    <div class="title">例句---</div>
    <div v-html="sentence"></div>
    <div class="title">短语---</div>
    <div v-for="(m, i) in pharse" :key="i + m.phrase">
      <div>{{ m.phrase }} {{ m.meanCn }}</div>
    </div>
    <div class="title">星云---</div>
    <div v-for="(n , i) in nebulaList" :key="i + n">
      <div>{{n}}</div>
    </div>
    <div class="title">派生词---</div>
    <div v-for="n in treeList" :key="n.wordId">
      <div v-html="`${n.word}[${n.character}] ${n.meanCn}`"></div>
    </div>
    <el-button @click="simpleCopy(picUrl)">复制图片地址</el-button>
    <el-button @click="simpleCopy(wordVideoUrl)">复制wordVideoUrl</el-button>
    <el-button @click="simpleCopy(exampleVideoUrl)">复制exampleVideoUrl</el-button>
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
      treeList: []
    };
  },

  methods: {
    async getInfo() {
      await Promise.all([
        this.getMnemonics(),
        this.getMeaning(),
        this.getResourcce(),
        this.getNebulas(),
        this.getTree()
      ]);
    },
    async getMnemonics() {
      let res = await this.$tplAPI.getLingo({
        mnemonicType: "0",
        originId: "1",
        originType: "5",
        word: this.word,
      });
      let data = res.mnemonics.picMnemonics[0]?.content
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
      let res = await this.$tplAPI.getPharse({ tagId: 4, word: this.word });
      if (res) {
        this.pharse = res?.wordPhrases;
        const {exampleVideoUrl, wordVideoUrl, exampleCn, exampleEnLabeled} = res?.wordExampleVideoResource || {}
        this.sentence = exampleEnLabeled ? `${exampleEnLabeled}<br/>${exampleCn}` : "";
        this.exampleVideoUrl = exampleVideoUrl;
        this.wordVideoUrl = wordVideoUrl;
      }
    },

    async getNebulas() {
       // ?word=crop
      let res = await this.$tplAPI.getNebula({word: this.word})
      this.nebulaList = []
      if(res) {
        (res.wordInfos || []).forEach((v, index) => {
          if(index < 5) {
              this.nebulaList.push(`${v.word}【${v.character || ''}${v.meaningCn}】`)
          }
        })
      }
    },

    async getTree() {
      let res = await this.$tplAPI.getTrees({tagId: 4, word: this.word})
      const { word, meanCn, rootList, child } = res.derivativeTree[0]
      this.treeList = child
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