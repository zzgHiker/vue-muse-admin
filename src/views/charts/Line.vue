<template>
  <div class="chart-content" v-if="show">
    <div class="chart-item" style="transform: translate(-28%, -33.3%) scale(0.33)">
      <chart-line></chart-line>
    </div>
    <div class="chart-item" style="transform: translate(-28%, 0.3%) scale(0.33)">
      <chart-line></chart-line>
    </div>
    <div class="chart-item" style="transform: translate(-28%, 33.9%) scale(0.33)">
      <chart-column></chart-column>
    </div>
    <div class="chart-item" style="transform: translate(41%, 0.3%) scale(1)">
      <chart-line></chart-line>
    </div>
  </div>
</template>
<style lang="less" type="text/less">
  .chart-content {
    position: relative;
    margin: 25px 5px;
    box-sizing: content-box;
  }

  .chart-item {
    position: absolute;
    padding: 0;
    margin: 0;
    width: 68%;
    text-align: center;
    transition: all 0.8s;
  }
</style>
<script>
  import Line from '@/components/Line'
  import Column from '@/components/Column'

  export default {
    data() {
      return {
        show: false
      }
    },
    mounted() {
      this.show = true
    },
    methods: {},
    components: {
      'chart-line': Line,
      'chart-column': Column
    }
  }
</script>
