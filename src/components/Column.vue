<template>
  <div class="column">
    <div class="title">
      <h2>{{title}}</h2>
    </div>
    <div ref="chart" class="chart"></div>
  </div>
</template>
<style scoped lang="less" type="text/less">
  .column {
    height: 500px;
    border: 1px solid;
    overflow: hidden;
    .title {
      text-align: left;
      padding-left: 20px;
    }
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

  let data = {
    data1: [],
    data2: []
  }

  for (let i = 0; i < 7; i++) {
    data.data1.push(Math.random() * 100)
    data.data2.push(Math.random() * 100)
  }

  export default {
    props: {
      title: {type: String, default: '柱状图'}
    },
    data() {
      return {
        chart: {}
      }
    },
    mounted() {
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption({
        title: {show: false},
        legend: {
          data: ['标签1', '标签2']
        },
        xAxis: {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {},
        series: [{
          name: '标签1',
          type: 'bar',
          stack: '总量',
          data: data.data1
        }, {
          name: '标签2',
          type: 'bar',
          stack: '总量1',
          data: data.data2
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
