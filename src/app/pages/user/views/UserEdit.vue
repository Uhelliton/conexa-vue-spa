<script>
import FormBase from '../components/FormBase'
import CardBox from '@/components/layouts/CardBox'
import service from '@/app/domains/users/services/user-service'
import { HTTP_RESPONSE } from '@/app/supports/utils/context'

export default {
  name: 'UserEdit',
  components: { FormBase, CardBox },
  data: () => ({
    user: {}
  }),
  async mounted () {
    let id = this.$route.params.id
    await this.getUserById(id)
  },
  methods: {
    async onSubmit (formData) {
      console.log(formData)
      try {
        const request = await service.update(formData)
        const { status } = request
        if (status === HTTP_RESPONSE.OK) {
          this.flashMessage.success({ title: 'Sucesso!', message: 'Usuário atualizado!' })
          this.$router.push({ name: 'user.index' })
        }
      } catch (e) {
        this.flashMessage.error({ title: 'Ops!', message: e })
      }
    },
    async getUserById (id) {
      try {
        const request = await service.show(id)
        const { status, data: response } = request
        if (status === HTTP_RESPONSE.OK) {
          this.user = response.data
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
      <div class="l-boxContent_head_title">Editar Usuário</div>
      <div class="l-boxContent_head_subtitle"></div>
    </template>
    <form-base @submit="onSubmit" :user="user"></form-base>
  </card-box>
</template>
