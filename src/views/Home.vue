<template>
  <div>
    <el-input v-model="word" style="width: 200px"></el-input>
    <el-button @click="getInfo">获取单词信息</el-button>
    <img style="display: block" :src="picUrl" />
    <div v-for="(m, index) in meaning" :key="index + m">
      <div>{{ m }}</div>
    </div>
    <div v-html="sentence"></div>
    <div v-for="(m, i) in pharse" :key="i + m.phrase">
      <div>{{ m.phrase }} {{ m.meanCn }}</div>
    </div>
    <el-button @click="simpleCopy(picUrl)">复制图片地址</el-button>
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
    };
  },

  methods: {
    async getInfo() {
      await Promise.all([
        this.getMnemonics(),
        this.getMeaning(),
        this.getResourcce(),
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
          ? `https://wanciwangdata-oss.perfectlingo.com/resources/word-picture/${data}.png`
          : "";
      }
    },

    async getMeaning() {
      // https://recite.perfectlingo.com/dic/v2/get-collins-resources?word=consciousness
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
      // meanExamples, wordPhrases
      let res = await this.$tplAPI.getPharse({ tagId: 4, word: this.word });
      console.log('resource', res);
      if (res) {
        this.pharse = res?.wordPhrases;

        const { exampleEn, exampleCn } = res.meanExamples[0]?.examples[0];
        console.log(
          "res.meanExamples[0]?.examples",
          res.meanExamples[0]?.examples
        );
        this.sentence = exampleEn ? `${exampleEn}<br/>${exampleCn}` : "";
      }
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
