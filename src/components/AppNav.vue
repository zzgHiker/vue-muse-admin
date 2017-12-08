<template>
  <mu-drawer :zDepth="1"
             :open="open"
             :docked="docked"
             class="nav-drawer"
             @close="doClose">
    <mu-appbar class="nav-appbar">
      <b>Q</b>uake
    </mu-appbar>
    <mu-divider/>
    <div class="nav-content">
      <mu-list :value="menuVal">
        <mu-list-item v-for="(item,index) in items"
                      :value="item.to"
                      :to="item.to"
                      :title="item.text"
                      :key="item/index"
                      :open="item.toggle"
                      :toggleNested="item.isMenu">
          <mu-list-item slot="nested"
                        v-for="(subItem,index) in item.items"
                        :value="subItem.to"
                        :to="subItem.to"
                        :title="subItem.text"
                        :key="subItem/index"></mu-list-item>
        </mu-list-item>
      </mu-list>
      <mu-divider/>
      <mu-sub-header>资源</mu-sub-header>
      <mu-list>
        <mu-list-item v-for="ref,index in references"
                      target="_blank"
                      :key="'reference'/index"
                      :href="ref.link"
                      :title="ref.text">
          <img :src="ref.img" height="20" v-if="ref.img" slot="left"/>
          <mu-icon :value="ref.icon" v-if="ref.icon" slot="left"/>
        </mu-list-item>
      </mu-list>
    </div>
  </mu-drawer>
</template>
<style lang="less" type="text/less">
  @import "~muse-ui/less/mixins.less";

  .nav-drawer {
    display: flex;
    flex-direction: column;
  }

  .nav-appbar {
    flex-shrink: 0;
    text-align: center;
  }

  .nav-content {
    flex-shrink: 1;
    .scrollable();
    .no-scrollbar();
  }
</style>
<script>
  import {APP_MENUS} from '@/config'

  export default {
    props: {
      open: {type: Boolean, default: true},
      docked: {type: Boolean, default: true}
    },
    data() {
      return {
        items: APP_MENUS,
        references: [
          {
            text: 'Vue',
            link: 'http://vuejs.org/',
            img: 'https://vuejs.org/images/logo.png'
          },
          {
            text: 'Material UI',
            link: 'http://www.material-ui.com/',
            img: 'http://www.material-ui.com/images/material-ui-logo.svg'
          },
          {
            text: 'ECharts',
            link: 'http://echarts.baidu.com/feature.html',
            img: 'http://echarts.baidu.com/images/echarts-footer-logo.png'
          },
          {
            text: 'Material Design Icons',
            link: 'https://materialdesignicons.com/',
            icon: 'crop_square'
          }
        ]
      }
    },
    computed: {
      menuVal() {
        return this.$route.path
      }
    },
    watch: {
      menuVal() {
        this.setMenuToggle()
      }
    },
    mounted() {
      this.setMenuToggle()
    },
    methods: {
      doClose() {
        this.$emit('close')
      },
      setMenuToggle() {
        for (let item of this.items) {
          if (item.isMenu) {
            item.toggle = this.$route.path.indexOf(item.val) === 0
          }
        }
      }
    }
  }
</script>
