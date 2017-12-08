<template>
  <div class="line">
    <div>
      <h2>{{name}}</h2>
    </div>
    <div ref="chart" class="chart"></div>
  </div>
</template>
<style scoped lang="less" type="text/less">
  .line {
    height: 500px;
    border: 1px solid;
    overflow: hidden;
    .chart {
      width: 100%;
      height: 450px; // calc(100% - 100px);
      margin-top: -15px;
    }
  }
</style>
<script>
  import EventBus from '@/EventBus'
  import echarts from 'echarts'

  export default {
    data() {
      return {
        chart: {},
        name: '折线图'
      }
    },
    mounted() {
      this.uuid = Math.random() * 1000
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption({
        title: {show: false},
        xAxis: [{
          name: '产品',
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        }],
        yAxis: [{}],
        series: [{
          name: '标签1',
          type: 'line',
          stack: '总量',
          data: [120, 132, 101, 134, 90, 230, 210]
        }]
      })
    },
    created() {
      EventBus.$on('layoutChange', this.handleResize)
    },
    destroyed() {
      EventBus.$off('layoutChange', this.handleResize)
    },
    methods: {
      handleResize() {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.chart.resize()
        }, 500)
      }
    }
  }
</script>
