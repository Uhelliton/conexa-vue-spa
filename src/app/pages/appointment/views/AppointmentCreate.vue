<script>
import FormBase from '../components/FormBase'
import CardBox from '@/components/layouts/CardBox'
import service from '@/app/domains/appointment/services/appointment-service'
import { HTTP_RESPONSE } from '@/app/supports/utils/context'

export default {
  name: 'AppointmentCreate',
  components: { FormBase, CardBox },
  data: () => ({}),
  methods: {
    async onSubmit (formData) {
      try {
        formData['dataConsulta'] = new Date(formData.dataConsulta)
        const request = await service.create(formData)
        const { status } = request
        if (status === HTTP_RESPONSE.CREATED) {
          this.flashMessage.success({ title: 'Sucesso!', message: 'A consulta foi agendada com sucesso!' })
          this.$router.push({ name: 'appointment.index' })
        }
      } catch (e) {
        this.flashMessage.error({ title: 'Ops!', message: 'algo inesperado ocorreu!' })
      }
    }
  }
}
</script>

<template>
  <card-box>
    <template #head>
      <div class="l-boxContent_head_title">Nova Consulta</div>
      <div class="l-boxContent_head_subtitle"></div>
    </template>
    <form-base @submit="onSubmit"></form-base>
  </card-box>
</template>
