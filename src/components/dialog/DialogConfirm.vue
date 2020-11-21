<script>
export default {
  name: 'DialogConfirm',
  data: () => ({}),
  props: {
    dialog: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    onCancel () {
      this.dialog = !this.dialog
    },
    onConfirm () {
      this.$emit('confirm', true)
    }
  }
}
</script>

<template>
  <div ref="dialog"
       class="m-dialog"
       :class="[{'m-dialog--open': dialog}, {'m-dialog--close': !dialog}]">
    <span class="m-dialog--buttonClose" title="Close Modal">×</span>
    <div class="m-dialog_content">
      <slot name="header"></slot>
      <div class="m-dialog_action">
        <button type="button"
                @click="onCancel"
                class="m-button m-button--disabled">
          Cancelar
        </button>
        <button type="button"
                @click="onConfirm"
                class="m-button">
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>
