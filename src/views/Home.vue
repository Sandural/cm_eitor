<template>
  <div>
    <el-input v-model="word" style="width: 200px"></el-input>
    <el-button @click="getMnemonics">获取单词图片地址</el-button>
    <div style="width: 100%">{{picUrl || '-'}}</div>
    <el-button @click="simpleCopy(picUrl)">复制图片地址</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      word: "",
      picUrl: ""
    }
  },

  methods: {
    async getMnemonics() {
      let res = await this.$tplAPI.getLingo({
          "mnemonicType": "0",
          "originId": "1",
          "originType": "5",
          "word": this.word
      });

      if(res) {
        this.picUrl = `https://wanciwangdata-oss.perfectlingo.com/resources/word-picture/${res.mnemonics.picMnemonics[0].content}.jpg`
      }
    },

     simpleCopy (content) {
        const text = content
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text)
        } else {
            const textarea = document.createElement('textarea')
            document.body.appendChild(textarea)
            textarea.style.position = 'fixed'
            textarea.style.clip = 'rect(0 0 0 0)'
            textarea.style.top = '10px'
            textarea.value = text
            textarea.select()
            document.execCommand('copy', true)
            document.body.removeChild(textarea)
        }
        this.$message({
            type: 'success',
            message: '复制成功'
        })
    }
  },
}
</script>
