<script>
export default {
  name: 'AppTable',
  data: () => ({
    pagination: {
      rowsPerPage: 10,
      pageNumber: 1
    }
  }),
  props: {
    thead: {
      type: [Array, Object],
      required: true,
      default: () => []
    },
    rows: {
      type: [Array, Object],
      required: false,
      default: () => []
    },
    filterKey: {
      type: String,
      required: false
    }
  },
  computed: {
    pageNumber () {
      return this.pagination.pageNumber
    }
  },
  watch: {
    paginatedData (data) {
      this.$emit('renderData', data)
    }
  },
  methods: {
    goToPage (pageLength) {
      this.pagination.pageNumber = pageLength
      this.dispatch(this.pagination.rowsPerPage, pageLength)
    },
    dispatch (page = 1, pageLength = null) {
      const dispatch = {
        page: page,
        pageLength: pageLength
      }
      this.$emit('server-request', dispatch)
    }
  }
}
</script>

<template>
  <div class="m-table">
    <table>
      <thead>
      <tr>
        <th scope="col"
            v-for="(column, index) in thead"
            :key="index">
          {{ column.label }}
        </th>
      </tr>
      </thead>
      <tbody>
      <slot name="tbody"></slot>
      </tbody>
    </table>
  </div>
</template>
