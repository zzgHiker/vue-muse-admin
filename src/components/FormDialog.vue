<template>
  <mu-dialog :open="open"
             :title="title"
             :scrollable="scrollable"
             @show="doShow">
    <div class="dialog-content">
      <div class="item" v-for="field,index of fields" :key="index">
        <mu-text-field :label="field.label"
                       v-model="field.value"
                       ref="input"
                       :required="true"
                       :errorText="field.errorText"></mu-text-field>
      </div>
    </div>
    <mu-flat-button label="取消" slot="actions" secondary @click="closeDialog"/>
    <mu-flat-button label="确定" slot="actions" primary @click="doSave"/>
  </mu-dialog>
</template>
<style lang="less" type="text/less">
  .dialog-content {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    .item {
      flex: 1;
      text-align: center;
    }
  }
</style>
<script>
  export default {
    props: {
      open: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: 'Form Dialog'
      },
      fields: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {}
    },
    computed: {
      scrollable() {
        return this.fields.length > 6
      }
    },
    methods: {
      closeDialog() {
        this.$emit('close')
      },
      doSave() {
        this.$emit('save')
      },
      doShow() {
        this.$refs['input'][0].focus()
      }
    }
  }
</script>
