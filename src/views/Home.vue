<template>
  <div id="editor">
    <div class="design-web cHbiQg blockbuilder-preview" style="--editor-offset-y: 0px">
        <div class="u_body" id="u_body">
          <Block></Block>
        </div>
      </div>
      <div class="kIFJtK"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import Block from "@/components/Block.vue"
export default {
  name: "Home",
  components: {Block},
};
</script>

<style scoped>
#editor {
  flex: 1 1 0%;
}
.editor {
  min-height: 100vh;
  background-color: rgb(255, 255, 255);
  animation: 500ms ease-in 0s 1 normal none running fadein;
}
.cHbiQg {
  height: 100%;
  position: absolute;
  inset: 0px 425px 0px 0px;
  background-color: rgb(255, 255, 255);
  background-image: linear-gradient(
      45deg,
      rgb(247, 247, 247) 25%,
      transparent 25%
    ),
    linear-gradient(-45deg, rgb(247, 247, 247) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgb(247, 247, 247) 75%),
    linear-gradient(-45deg, transparent 75%, rgb(247, 247, 247) 75%);
  background-size: 20px 20px;
  background-position: 0px 0px, 0px 10px, 10px -10px, -10px 0px;
  transition: right 0.3s ease 0s;
  overflow: scroll;
}

.blockbuilder-preview {
  --preview-padding-v: 20px;
  --preview-padding-h: 30px;
  --accent-color: #4cb9ea;
  --pointer-events-dnd: auto;
  padding: var(--preview-padding-v) var(--preview-padding-h);
}

.kIFJtK {
  position: fixed;
  inset: 0px 0px 0px auto;
  width: 425px;
  background-color: rgb(214, 217, 220);
  border-left: 1px solid rgb(214, 217, 220);
  border-right: 0px;
  z-index: 105;
  transition: width 0.3s ease 0s;
  box-sizing: content-box;
}

.u_body {
  background-color: rgb(231, 231, 231);
  font-family: arial, helvetica, sans-serif;
  color: rgb(0, 0, 0);
  min-height: calc(100vh - 40px) !important;
}

@media screen and (max-width: 1170px) {
  .cHbiQg {
    left: 0;
    right: 351px;
  }

  .kIFJtK {
    width: 351px;
  }
}
</style>
