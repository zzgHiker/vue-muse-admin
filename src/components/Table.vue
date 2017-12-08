<template>
  <div>
    <mu-table :showCheckbox="true" @rowSelection="doSelect" multiSelectable enableSelectAll ref="table">
      <mu-thead>
        <mu-tr>
          <mu-th v-for="(item, index) in columns" :key="index" @click.native="doSort(item)">
            {{item.toUpperCase()}}
          </mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(row,index) in displayData" :key="index" :selected="row.__SELECTED">
          <mu-td v-for="(item, index) in columns" :key="index"> {{row[item]}}</mu-td>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-pagination :total="total" :current="current" @pageChange="doPageChanged" v-if="paging">
    </mu-pagination>
  </div>
</template>
<style scoped type="text/less" lang="less">
  .mu-pagination {
    float: right;
    margin-top: 10px;
  }
</style>

<script>
  const TAG_INDEX = '__INDEX'

  export default {
    props: {
      data: {
        type: Array,
        default: function () {
          return []
        }
      },
      columns: {
        type: Array,
        default: function () {
          return []
        }
      },
      paging: {type: Boolean, default: true},
      pageSize: {type: Number, default: 10}
    },
    data() {
      return {
        sort: {},
        current: -1
      }
    },
    watch: {
      data(val) {
        if (val.length > 0 && this.paging && this.current < 1) {
          this.current = 1
        }
      }
    },
    computed: {
      startPageIndex() {
        return this.paging ? this.pageSize * (this.current - 1) : 0
      },
      endPageIndex() {
        return this.paging ? this.startPageIndex + this.pageSize : -1
      },
      displayData() {
        return this.paging ? this.data.filter((item, index) => {
          return index >= this.startPageIndex && index < this.endPageIndex
        }) : this.data
      },
      total() {
        return this.data.length
      }
    },
    mounted() {
      this.init()
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
        this.$refs.table.unSelectAll()
        this.$emit('select', null)
      },
      doSelect(idx) {
        console.log(idx)
        let data = idx === undefined ? null : this.displayData[idx]
        this.$emit('select', data)
      },
      init() {
        if (this.columns.length === 0) {
          for (let k in this.data[0]) {
            if (k.indexOf('_') === -1) {
              this.columns.push(k)
            }
          }
        }
        if (this.paging && this.data.length > 0) {
          this.current = 1
        }
      }
    }
  }
</script>
