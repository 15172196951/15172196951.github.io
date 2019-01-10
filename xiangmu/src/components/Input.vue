<template>
    <div class="co-inp co-flex co-ac">
      <div class="co-f1 co-flex">
        <input class="co-f1 co-pd-l02" :readonly="isDisable" v-model="currentValue" @click="handleFocus" :maxlength="maxlength" :placeholder="placeholder" type="text" />
      </div>
      <div class="co-mg-l04" v-show = "isClear" @click="clearText">
        <i class="coicon coicon-delete co-fs-3 co-cl-2"></i>
      </div>
    </div>
</template>
<script>
export default {
  name: 'coInput',
  components: {
  },
  props: {
    value: [String, Number],
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    maxlength: {
      type: Number,
      default: 9999
    },
    isClear: {
      type: Boolean,
      default: false
    },
    isDisable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      currentValue: this.value === undefined || this.value === null
        ? ''
        : this.value
    }
  },
  methods: {
    clearText () {
      this.currentValue = ''
      this.$emit('input', this.currentValue)
    }
  },
  watch: {
    currentValue (val, oldValue) {
      this.$emit('input', val)
    },
    value (val) {
      this.currentValue = val
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
  .co-inp {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem; 
    input {
      height: 2rem;
      border: none;
      text-align: right;
      outline:none;
      padding: 0.1rem;
      font-size: 0.75rem;
    }
  }
</style>
