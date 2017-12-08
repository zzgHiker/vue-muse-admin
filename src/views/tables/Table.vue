<template>
  <div class="container">
    <mu-table :showCheckbox="false">
      <mu-thead>
        <mu-tr>
          <mu-th v-for="(item, index) in columns" :key="index" @click.native="doSort(item)">
            {{item.toUpperCase()}}
          </mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(row,index) in displayData" :key="index">
          <mu-td v-for="(item, index) in columns" :key="index"> {{row[item]}}</mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-pagination :total="total" :current="current" @pageChange="doPageChanged">
    </mu-pagination>
  </div>
</template>
<style scoped lang="less" type="text/less">
  .container {
    margin: 15px;

    .mu-pagination {
      float: right;
      margin-top: 10px;
    }
  }
</style>
<script>
  const TAG_INDEX = '__index'

  export default {
    props: {
      paging: true,
      pageSize: {type: Number, default: 10}
    },
    data() {
      return {
        columns: [],
        data: [],
        sort: {},
        editable: -1,
        current: 0
      }
    },
    computed: {
      displayData() {
        return this.data.filter((item, index) => {
          let startPageIndex = this.pageSize * (this.current - 1)
          let endPageIndex = startPageIndex + this.pageSize
          return index >= startPageIndex && index < endPageIndex
        })
      },
      total() {
        return this.data.length
      }
    },
    mounted() {
      this.$store.dispatch('users')
        .then(res => {
          this.data = res.data
          this.current = res.data.length > 0 ? 1 : 0
          this.data.forEach((item, index) => {
            item[TAG_INDEX] = index
          })
          for (let k in this.data[0]) {
            if (k.indexOf('_') === -1) {
              this.columns.push(k)
            }
          }
        })
    },
    methods: {
      doSort(field) {
        if (this.sort[field] === undefined || this.sort[field]) {
          this.sort[field] = !this.sort[field]
          let iAsc = this.sort[field] ? 1 : -1
          this.data.sort(function (v, m) {
            return v[field] > m[field] ? 1 * iAsc : -1 * iAsc
          })
        } else {
          this.sort[field] = undefined
          this.data.sort(function (v, m) {
            return v[TAG_INDEX] > m[TAG_INDEX] ? 1 : -1
          })
        }
      },
      doPageChanged(idx) {
        this.current = idx
      }
    }
  }
</script>
