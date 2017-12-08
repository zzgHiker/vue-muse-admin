<template>
  <app-layout>
    <router-view></router-view>
  </app-layout>
</template>
<script>
  import AppLayout from '@/components/Layout.vue'

  export default {
    data() {
      return {}
    },
    components: {
      'app-layout': AppLayout
    }
  }
</script>
