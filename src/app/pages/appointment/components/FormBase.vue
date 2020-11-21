<script>
import AppInput from '@/components/form/AppInput'
import AppTextarea from '@/components/form/AppTextarea'

export default {
  name: 'FormBase',
  components: { AppInput, AppTextarea },
  data () {
    return {
      errors: [],
      form: {
        dataConsulta: '',
        idMedico: this.$store.state.user.auth.id,
        observacao: '',
        paciente: ''
      }
    }
  },
  props: {
    appointment: {
      type: Object,
      required: false
    }
  },
  watch: {
    appointment () {
      const { id, medico: { idMedico }, paciente, observacao, dataConsulta } = this.appointment
      this.form.paciente = paciente
      this.form.idMedico = idMedico
      this.form.observacao = observacao
      this.form.dataConsulta = dataConsulta
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

      if (!form.dataConsulta) {
        this.errors.push('A data é obrigatória.')
      }
      if (!form.paciente) {
        this.errors.push('O paciente é obrigatório.')
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
          <app-input v-model="form.idMedico"
                     forId="id"
                     disabled
                     required
                     label="Identificador" />
        </div>
      </div>
      <div class="row col-6">
        <div>
          <app-input v-model="form.dataConsulta"
                     forId="approintmentDate"
                     type="date"
                     required
                     placeholder="data consulta"
                     label="Data Consulta" />
        </div>
      </div>
      <div class="row col-6">
        <div>
          <app-input v-model="form.paciente"
                     required
                     forId="patient"
                     placeholder="nome"
                     label="Paciente" />
        </div>
      </div>
      <div class="row col-6">
        <div>
          <app-textarea v-model="form.observacao"
                        required
                        forId="observation"
                        label="Observação" />
        </div>
      </div>
      <div class="row col-6 s-mt--lg">
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
