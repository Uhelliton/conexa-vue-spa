<script>
import FormBase from '../components/FormBase'
import CardBox from '@/components/layouts/CardBox'
import service from '@/app/domains/users/services/user-service'
import { HTTP_RESPONSE } from '@/app/supports/utils/context'

export default {
  name: 'UserCreate',
  components: { FormBase, CardBox },
  data: () => ({}),
  methods: {
    async onSubmit (formData) {
      try {
        const request = await service.create(formData)
        const { status } = request
        if (status === HTTP_RESPONSE.CREATED) {
          this.flashMessage.success({ title: 'Sucesso!', message: 'Usuário cadastrado!' })
          this.$router.push({ name: 'user.index' })
        }
      } catch (e) {
        this.flashMessage.error({ title: 'Ops!', message: e })
      }
    }
  }
}
</script>

<template>
  <card-box>
    <template #head>
      <div class="l-boxContent_head_title">Novo Usuário</div>
      <div class="l-boxContent_head_subtitle"></div>
    </template>
    <form-base @submit="onSubmit"></form-base>
  </card-box>
</template>
