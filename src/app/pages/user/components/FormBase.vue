<script>
import AppInput from '@/components/form/AppInput'

export default {
  name: 'FormBase',
  components: { AppInput },
  data: () => ({
    errors: [],
    form: {
      name: '',
      email: '',
      password: ''
    }
  }),
  props: {
    user: {
      type: Object,
      required: false
    }
  },
  watch: {
    user () {
      const { id, email, name } = this.user
      this.form.name = name
      this.form.email = email
      this.form.id = id
    }
  },
  methods: {
    handleSubmit () {
      if (!this.errors.length) {
        delete this.form.password
        this.$emit('submit', this.form)
        this.$refs.form.reset()
      }
    },
    validate () {
      const form = this.form
      this.errors = []

      if (!form.name) {
        this.errors.push('O nome é obrigatório.')
      }
      if (!form.email) {
        this.errors.push('O email é obrigatório.')
      }
      if (!form.password) {
        this.errors.push('A senha é obrigatória.')
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="row col-6">
      <div>
        <p v-if="errors.length">
          <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
          <ul>
            <li v-for="(error, index) in errors"
                :key="index">
              {{ error }}
            </li>
          </ul>
        </p>
      </div>
    </div>
    <form @submit.prevent="handleSubmit"
          ref="form"
          method="post">
      <div class="row col-6">
        <div>
          <app-input v-model="form.name"
                     forId="name"
                     required
                     placeholder="nome"
                     label="Nome" />
        </div>
      </div>
      <div class="row col-6">
        <div>
          <app-input v-model="form.email"
                     type="email"
                     required
                     forId="email"
                     placeholder="email"
                     label="Email" />
        </div>
      </div>
      <div class="row col-6" v-if="!user">
        <div>
          <app-input v-model="form.password"
                     type="password"
                     required
                     forId="password"
                     placeholder="senha"
                     label="Senha" />
        </div>
      </div>
      <div class="row col-6">
        <div class="s-align--right">
          <button type="submit"
                  class="m-button ">
            Confirmar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
