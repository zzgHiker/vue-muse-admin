<template>
  <div>
    <app-layout>
      <mu-flat-button @click="doLogout" secondary label="Log Out"></mu-flat-button>
      <mu-icon value="home"></mu-icon>
    </app-layout>
  </div>
</template>
<script>
  import AppLayout from '../components/Layout.vue'

  export default {
    data() {
      return {}
    },

    methods: {
      doLogout() {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
      }
    },
    components: {
      'app-layout': AppLayout
    }
  }
</script>
