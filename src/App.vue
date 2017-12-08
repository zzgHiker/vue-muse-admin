<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  /* eslint-disable import/no-webpack-loader-syntax */

  import light from '!raw-loader!muse-ui/dist/theme-light.min.css'
  import dark from '!raw-loader!muse-ui/dist/theme-dark.min.css'
  import carbon from '!raw-loader!muse-ui/dist/theme-carbon.min.css'
  import teal from '!raw-loader!muse-ui/dist/theme-teal.min.css'

  export default {
    name: 'app',
    data() {
      return {
        themes: {
          light,
          dark,
          carbon,
          teal
        }
      }
    },
    computed: {
      theme() {
        return this.$store.getters.theme
      }
    },
    watch: {
      theme(val) {
        this.setTheme(val)
      }
    },
    mounted() {
      this.setTheme()
    },
    methods: {
      setTheme() {
        const styleElm = this.getThemeStyle()
        styleElm.innerHTML = this.themes[this.theme] || ''
      },
      getThemeStyle() {
        const themeId = 'muse-theme'
        let styleEl = document.getElementById(themeId)
        if (!styleEl) {
          styleEl = document.createElement('style')
          styleEl.id = themeId
          document.body.appendChild(styleEl)
        }
        return styleEl
      }
    }
  }
</script>

<style lang="less" type="text/less">
  #app {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .loading {
    width: auto !important;
    border-radius: 8px;
  }

  .box {
    padding: 20px;

    .toolbar {
      float: right;

      .mu-raised-button {
        margin-left: 10px;
      }

    }

  }

  .mu-dialog {
    min-width: 300px;
  }
</style>
