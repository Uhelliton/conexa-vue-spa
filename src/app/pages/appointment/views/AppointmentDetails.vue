<script>
import CardBox from '@/components/layouts/CardBox'
import service from '@/app/domains/appointment/services/appointment-service'
import { HTTP_RESPONSE } from '@/app/supports/utils/context'

export default {
  name: 'AppointmentDetails',
  components: { CardBox },
  data: () => ({
    appointment: ''
  }),
  async mounted () {
    const id = this.$route.params.id
    await this.getAppointmentById(id)
  },
  methods: {
    async getAppointmentById (id) {
      try {
        const request = await service.show(id)
        const { data: response, status } = request

        if (status === HTTP_RESPONSE.OK) {
          this.appointment = response.data
        }
      } catch (e) {
        this.flashMessage.error({ title: 'Ops!', message: e })
      }
    },
    print () {
      this.$nextTick(() => {
        window.print()
      })
    }
  }
}
</script>

<template>
  <card-box class="l-details">
    <template #head>
      <div class="l-boxContent_head_title">Detalhes Consulta #{{ appointment.id }}</div>
      <div class="l-boxContent_head_subtitle">
        <button type="button"
                @click="print()"
                class="m-button ">
          imprimir ficha
        </button>
      </div>
      <div class="row col-12">
        <div class="s-align--right s-mb--md">
          <button type="button"
                  @click="$router.push({ name: 'appointment.index' })"
                  class="m-button ">
            Voltar
          </button>
        </div>
      </div>

    </template>

    <ul class="m-item_details">
      <li>
        <span>Médico:</span>
        {{ appointment.medico.nome }}
      </li>
      <li>
        <span>Médico: Email</span>
        {{ appointment.medico.email }}
      </li>
      <li>
        <span>paciente</span>
        {{ appointment.paciente }}
      </li>
      <li>
        <span>Data Consulta</span>
        {{ appointment.dataConsulta }}
      </li>
      <li>
        <span>Observacao</span>
        {{ appointment.observacao }}
      </li>
    </ul>
  </card-box>
</template>

<style lang="scss">
  @import '../../../../assets/scss/utilities/_all';

  .l-details {
    ul {
      li {
        list-style-type: none;
        span {
          font-weight: bold;
        }
      }
    }

    .m-item_details {
      display: grid;
      grid-column-gap: 24px;
      grid-row-gap: 24px;
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media print {
    nav {
      display: none;
    }
  }
</style>
