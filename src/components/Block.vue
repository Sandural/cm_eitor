<template>
  <div class="blockbuilder-layer-group blockbuilder-layer-group-row">
    <div class="blockbuilder-placeholder" data-name="Drag it here"></div>
    <div
      class="blockbuilder-layer blockbuilder-layer-selectable"
      :class="{
        'blockbuilder-layer-selected': activeLinkId,
      }"
      @click="activeLayer($event)"
    >
      <div
        class="blockbuilder-layer-selector blockbuilder-layer-selector-first blockbuilder-layer-selector-row"
      >
        <div class="blockbuilder-layer-drag blockbuilder-layer-drag-rows">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrows" class="svg-inline--fa fa-arrows fa-w-16 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M352.634 428.621l-74.007 74.007c-12.497 12.497-32.758 12.497-45.255 0l-74.007-74.007c-9.373-9.373-9.373-24.569 0-33.941l10.84-10.84c9.556-9.556 25.113-9.341 34.402.474L228 410.365V284H101.635l26.051 23.392c9.815 9.289 10.03 24.846.474 34.402l-10.84 10.84c-9.373 9.373-24.569 9.373-33.941 0L9.373 278.627c-12.497-12.497-12.497-32.758 0-45.255l74.007-74.007c9.373-9.373 24.569-9.373 33.941 0l10.84 10.84c9.556 9.556 9.341 25.114-.474 34.402L101.635 228H228V101.635l-23.392 26.051c-9.289 9.815-24.846 10.03-34.402.474l-10.84-10.84c-9.373-9.373-9.373-24.569 0-33.941l74.007-74.007c12.497-12.497 32.758-12.497 45.255 0l74.007 74.007c9.373 9.373 9.373 24.569 0 33.941l-10.84 10.84c-9.556 9.556-25.113 9.341-34.402-.474L284 101.635V228h126.365l-26.051-23.392c-9.815-9.289-10.03-24.846-.474-34.402l10.84-10.84c9.373-9.373 24.569-9.373 33.941 0l74.007 74.007c12.497 12.497 12.497 32.758 0 45.255l-74.007 74.007c-9.373 9.373-24.569 9.373-33.941 0l-10.84-10.84c-9.556-9.556-9.341-25.113.474-34.402L410.365 284H284v126.365l23.392-26.051c9.289-9.815 24.846-10.03 34.402-.474l10.84 10.84c9.373 9.372 9.373 24.568 0 33.941z"></path></svg>
        </div>
        <div
          class="blockbuilder-layer-add-row blockbuilder-layer-add-row-top"
        >
          <div class="" data-tooltipped="" aria-describedby="tippy-tooltip-1" data-original-title="Add Row" style="display: inline;"><div class="blockbuilder-layer-control"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg></div></div>
        </div>
        <div
          class="blockbuilder-layer-add-row blockbuilder-layer-add-row-bottom"
        ></div>
        <div
          class="blockbuilder-layer-controls blockbuilder-layer-controls-left blockbuilder-layer-controls-rows"
        ></div>
        <div
          class="blockbuilder-layer-controls blockbuilder-layer-controls-right blockbuilder-layer-controls-rows"
        ></div>
      </div>

      <div id="u_row_1" class="u_row" style="padding: 0">
        <div class="container">
          <div class="u-row">
            <div id="u_column_1" class="u_column u-col" style="width: 100%">
              <div style="padding: 0px">
                <div
                  class="blockbuilder-layer-group blockbuilder-layer-group-content blockbuilder-layer-group-first"
                >
                  <div
                    class="blockbuilder-placeholder"
                    data-name="Drag it here"
                  >
                    <div class="blockbuilder-placeholder-empty">
                      <div style="z-index: 112">
                        <div>No content here. Drag content from right.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="blockbuilder-placeholder" data-name="Drag it here"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeLinkId: false,
    };
  },

  methods: {
    activeLayer(e) {
      let fDom = e.path[1];
      console.log('fDom.classList', fDom.classList);
      if([...fDom.classList].includes("blockbuilder-layer")) {
        this.activeLinkId = true;
      } else {
        this.activeLinkId = false;
      }
    },
  },
};
</script>

<style scoped>
.blockbuilder-layer {
  --accent-color: #7eaab9;
  position: relative;
}
.blockbuilder-layer.blockbuilder-layer-selected {
  --accent-color: #4cb9ea;
  user-select: none;
}

.blockbuilder-placeholder {
  position: relative;
  font-family: "Open Sans", sans-serif;
  z-index: 101;
}

.blockbuilder-layer-selector {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}

.blockbuilder-layer-drag {
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  background-color: var(--accent-color);
  color: #fff;
  z-index: 111;
  cursor: move;
  cursor: grab;
  cursor: -webkit-grab;
}

.blockbuilder-layer-drag-rows {
  right: 0px;
  height: 40px;
  width: 40px;
  font-size: 20px;
  line-height: 40px;
  border-radius: 100% 0 0 100%;
  margin-top: -20px;
}

.blockbuilder-layer.blockbuilder-layer-selected > .blockbuilder-layer-selector .blockbuilder-layer-drag {
  visibility: visible;
}

.blockbuilder-layer-add-row {
  visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: -20px;
  background-color: var(--accent-color);
  opacity: 0.5;
  color: #fff;
  width: 100px;
  left: calc(50% - 50px);
  text-align: center;
  z-index: 112;
  cursor: pointer;
}

.blockbuilder-layer.blockbuilder-layer-selected .blockbuilder-layer-add-row {
  visibility: visible;
  background-color: var(--accent-color);
}

.blockbuilder-layer-add-row.blockbuilder-layer-add-row-top {
  bottom: auto;
  top: -20px;
}

.blockbuilder-layer-controls {
  visibility: hidden;
  display: inline-block;
  position: absolute;
  bottom: -35px;
  right: 0px;
  color: #fff;
  text-align: center;
  z-index: 112;
  height: 30px;
  overflow: hidden;
}

.blockbuilder-layer.blockbuilder-layer-selected
  > .blockbuilder-layer-selector
  .blockbuilder-layer-controls {
  visibility: visible;
}

.blockbuilder-layer-controls.blockbuilder-layer-controls-left.blockbuilder-layer-controls-rows {
  right: auto;
}

.blockbuilder-layer-controls.blockbuilder-layer-controls-left {
  left: 0px;
  right: auto;
}

.blockbuilder-layer.blockbuilder-layer-selected
  > .blockbuilder-layer-selector:after {
  opacity: 1;
  outline: var(--accent-color) solid 2px;
  outline-offset: -1px;
}

.blockbuilder-layer-selectable .blockbuilder-layer-selector:after {
  content: " ";
  opacity: 0;
  z-index: 100;
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  outline: var(--accent-color) solid 2px;
  outline-offset: -1px;
  pointer-events: var(--pointer-events-dnd);
}

.blockbuilder-layer-selectable .blockbuilder-layer-selector:hover:after {
    opacity: 1;
}

/* .blockbuilder-layer.blockbuilder-layer-selected>.blockbuilder-layer-selector:after {
    opacity: 1;
    outline: var(--accent-color) solid 2px;
    outline-offset: -1px;
} */

@media (min-width: 992px) {
  .design-web .container {
    max-width: 960px;
  }
}
@media (min-width: 786px) {
  .design-web .container {
    max-width: 720px;
  }
}

@media (min-width: 576px) {
  .design-web .container {
    max-width: 540px;
  }
}

#u_row_1 .container {
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  padding-right: 0px;
  padding-left: 0px;
  margin-right: auto;
  margin-left: auto;
}

.u-row {
  display: flex;
  flex-wrap: nowrap;
  margin-left: 0;
  margin-right: 0;
}

.u-row .u-col {
  position: relative;
  width: 100%;
  padding-right: 0;
  padding-left: 0;
}

.blockbuilder-placeholder .blockbuilder-placeholder-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(222, 242, 250, 0.85);
  outline: #2faade dashed 1px;
  outline-offset: -1px;
  min-height: 100px;
  font-size: 13px;
  color: #2faade;
  padding: 20px;
  text-align: center;
}

.svg-inline--fa {
    display: inline-block;
    font-size: inherit;
    height: 1em;
    overflow: visible;
    vertical-align: -0.125em;
}
</style>
