<template>
  <div class="box" ref="box">
    <div class="search_box">
      <mu-text-field icon="search" v-model="searchKey" :fullWidth="true" slot="right" hintText="请输入搜索内容"/>
      <div class="search_result"><b>{{resultSize}}</b> icons matched.</div>
    </div>

    <div class="result_box">
      <mu-grid-list :cols="cols" :padding="padding">
        <mu-grid-tile v-for="(icon, index) of displayIcons" :key="index">
          <div class="icon-display">
            <mu-icon :value="icon.name" :size="48"></mu-icon>
          </div>
          <span slot="title">{{icon.name}}</span>
          <span slot="subTitle">Code: <b>#{{icon.code}}</b></span>
        </mu-grid-tile>
      </mu-grid-list>
    </div>
  </div>
</template>
<style scoped lang="less" type="text/less">
  .search_box {
    width: 80%;
    max-width: 600px;
    margin: 10px auto;

    .search_result {
      color: gray;
      text-align: center;
    }
  }

  .result_box {
    margin: 10px;
  }

  .icon-display {
    height: 100%;
    text-align: center;
    margin-top: 20px;
  }
</style>
<script>
  /* eslint-disable import/no-webpack-loader-syntax */

  import EventBus from '@/EventBus'
  import stringIcons from 'raw-loader!material-design-icons/iconfont/codepoints'

  const icons = []

  let arrIcons = stringIcons.split('\n')
  arrIcons.forEach(item => {
    let arr = item.split(' ')
    if (arr.length === 2) {
      icons.push({
        name: arr[0],
        code: arr[1]
      })
    }
  })

  export default {
    data() {
      return {
        icons: icons,
        searchKey: '',
        cols: 2,
        padding: 8,
        displayIcons: []
      }
    },
    computed: {
      resultSize() {
        return this.displayIcons.length
      }
    },
    watch: {
      searchKey() {
        this.filter()
      }
    },
    mounted() {
      this.filter()
      this.calCols()
    },
    created() {
      EventBus.$on('layoutChange', this.handleResize)
    },
    destroyed() {
      EventBus.$off('layoutChange', this.handleResize)
    },
    methods: {
      handleResize() {
        if (this.resizeTimer) {
          clearTimeout(this.resizeTimer)
        }
        this.resizeTimer = setTimeout(() => {
          this.calCols()
        }, 1000)
      },
      calCols() {
        let boxWidth = this.$refs.box.clientWidth
        if (this.boxWidth !== boxWidth) {
          this.boxWidth = boxWidth
          if (boxWidth < 420) {
            this.cols = 2
          } else if (boxWidth >= 420 && boxWidth < 680) {
            this.cols = 3
          } else if (boxWidth >= 680 && boxWidth < 920) {
            this.cols = 4
          } else {
            this.cols = 6
          }
        }
      },
      filter() {
        let sKey = this.searchKey
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.displayIcons = icons.filter(icon => {
            let name = icon.name
            let code = icon.code

            return sKey ? name.indexOf(sKey) > -1 ||
              code.indexOf(sKey) > -1 : true
          })
        }, 500)
      }
    }
  }
</script>
