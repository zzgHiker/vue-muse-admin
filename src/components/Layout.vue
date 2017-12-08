<template>
  <div>
    <mu-appbar :zDepth="0" :title="title" class="layout-appbar" :class="styleClass">
      <mu-icon-button @click="toggleNav" icon="menu" slot="left"/>
      <mu-icon-button icon="more_vert" slot="right"
                      @click="toggle"
                      ref="setting"/>
    </mu-appbar>
    <app-nav :open="showMenu"
             :docked="docked"
             @close="doCloseNav"></app-nav>
    <div class="layout-content" :class="styleClass">
      <slot></slot>
    </div>

    <mu-popover :open="open"
                :trigger="trigger"
                class="pop-settings"
                @close="handleClose">
      <mu-list :value="theme">
        <mu-sub-header>THEME</mu-sub-header>
        <mu-list-item v-for="(theme, index) of themes"
                      :key="index"
                      :title="theme.text"
                      :value="theme.value"
                      @click="changeTheme(theme.value)"></mu-list-item>
        <mu-divider/>
        <mu-list-item title="LogOut">
          <mu-icon slot="left" value="shuffle"/>
        </mu-list-item>
      </mu-list>
    </mu-popover>
  </div>
</template>
<style lang="less" type="text/less">
  @import "~muse-ui/less/vars.less";

  .layout-appbar {
    position: fixed;
    width: auto;
    left: 256px;
    right: 0;
    top: 0;
    transition: all 0.45s @easeOutFunction;
    &.nav-hide {
      left: 0;
    }
  }

  .layout-content {
    padding-top: 56px;
    padding-left: 256px;
    height: 100%;
    transition: all .45s @easeOutFunction;
    &.nav-hide {
      padding-left: 0;
    }
  }

  @media (min-width: 480px) {
    .layout-content {
      padding-top: 64px;
    }
  }

  @media (max-width: 993px) {
    .layout-appbar {
      left: 0;
    }

    .layout-content {
      padding-left: 0;
    }
  }
</style>

<style scoped>
  .pop-settings {
    min-width: 300px;
  }
</style>
<script>
  import EventBus from '@/EventBus'
  import AppNav from './AppNav.vue'

  export default {
    data() {
      return {
        showMenu: false,
        docked: false,
        trigger: null,
        open: false,
        themes: [
          {text: 'Default', value: ''},
          {text: 'Light', value: 'light'},
          {text: 'Dark', value: 'dark'},
          {text: 'Carbon', value: 'carbon'},
          {text: 'Teal', value: 'teal'}
        ]
      }
    },
    computed: {
      title() {
        return this.$route.name
      },
      styleClass() {
        return {
          'nav-hide': !this.showMenu
        }
      },

      theme() {
        return this.$store.getters.theme
      }
    },
    mounted() {
      this.showMenu = this.isDesktop()
      this.docked = this.isDesktop()
      this.trigger = this.$refs['setting'].$el
      window.addEventListener('resize', this.handleResize)
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer)
      }
    },
    watch: {
      'showMenu': function () {
        if (this.isDesktop()) {
          EventBus.$emit('layoutChange')
        }
      }
    },
    methods: {
      isDesktop() {
        return window.innerWidth > 993
      },
      toggleNav() {
        this.showMenu = !this.showMenu
      },
      doCloseNav() {
        this.showMenu = false
      },
      handleResize() {
        if (this.docked !== this.isDesktop()) {
          this.showMenu = this.isDesktop()
          this.docked = this.isDesktop()
        }
        if (this.resizeTimer) {
          clearTimeout(this.resizeTimer)
        }
        this.resizeTimer = setTimeout(() => {
          EventBus.$emit('layoutChange')
        }, 10)
      },
      handleClose() {
        this.open = false
      },
      toggle() {
        this.open = !this.open
      },
      changeTheme(theme) {
        this.$store.dispatch('changeTheme', theme)
      }
    },
    components: {
      'app-nav': AppNav
    }
  }
</script>
