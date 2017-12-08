<template>
  <div class="box">
    <div class="toolbar">
      <mu-raised-button label="Add"
                        icon="add"
                        @click="openDialog(1)"></mu-raised-button>
      <mu-raised-button label="Edit"
                        icon="edit"
                        :disabled="unselected"
                        @click="openDialog(2)"></mu-raised-button>
    </div>

    <app-table :data="data"
               :columns="columns"
               @select="doSelect"></app-table>

    <app-form-dialog :open="dialogOpen"
                     :title="dialogTitle"
                     :fields="fields"
                     @close="closeDialog"
                     @save="doSave"></app-form-dialog>
  </div>
</template>
<script>
  import Table from '@/components/Table.vue'
  import FormDialog from '@/components/FormDialog.vue'

  export default {
    data() {
      return {
        columns: ['id', 'name'],
        dialogOpen: false,
        selectedData: null,
        mode: 1,
        fields: [
          {label: 'ID', name: 'id', type: 'text', value: '', errorText: ''},
          {label: 'Name', name: 'name', type: 'text', value: '', errorText: ''}
        ]
      }
    },
    computed: {
      data() {
        return this.$store.state.auth.objects
      },
      dialogTitle() {
        if (this.mode === 1) {
          return '新增 Object'
        } else {
          return '修改 Object'
        }
      },
      unselected() {
        return this.selectedData === null
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        this.$store.dispatch('objects')
      },
      closeDialog() {
        this.dialogOpen = false
      },
      openDialog(mode) {
        this.mode = mode || 1
        if (this.mode === 1) {
          this.clearData()
        } else {
          const d = this.selectedData
          this.fields.forEach(item => {
            item.value = d[item.name]
          })
        }
        this.dialogOpen = true
      },
      clearData() {
        this.fields.forEach(item => {
          item.value = ''
        })
      },
      doSelect(data) {
        this.selectedData = data
      },
      doSave() {
        const data = this.mode === 2 && this.selectedData ? JSON.parse(JSON.stringify(this.selectedData)) : {}
        this.validate()
          .then(res => {
            if (res) {
              this.fields.forEach(item => {
                data[item.name] = item.value
              })
              this.$store.dispatch('saveObject', data)
                .then(() => {
                  this.dialogOpen = false
                })
            }
          })
      },
      validate() {
        let checkResult = true
        return new Promise((resolve) => {
          this.fields.forEach(item => {
            if (!item.value) {
              checkResult = false
              item.errorText = '这是必填项'
            } else {
              item.errorText = ''
            }
          })

          resolve(checkResult)
        })
      }
    },
    components: {
      'app-table': Table,
      'app-form-dialog': FormDialog
    }
  }
</script>
