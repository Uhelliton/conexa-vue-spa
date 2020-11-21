<script>
import CardBox from '@/components/layouts/CardBox'
import AppTable from '@/components/table/AppTable'
import AppInput from '@/components/form/AppInput'
import service from '@/app/domains/appointment/services/appointment-service'
import { HTTP_RESPONSE } from '@/app/supports/utils/context'

export default {
  name: 'AppointmentIndex',
  components: {
    CardBox,
    AppTable,
    AppInput
  },
  data: () => ({
    dialog: false,
    userSelectId: null,
    datatable: {
      filterKey: '',
      thead: [
        { field: 'id', label: 'ID', sortable: true },
        { field: 'medico', label: 'Médico', sortable: true },
        { field: 'paciente', label: 'Paciente', sortable: true },
        { field: 'dataConsulta', label: 'Data Consulta' },
        { field: 'action', label: '' }
      ],
      rows: [],
      pagination: {}
    }
  }),
  async mounted () {
    await this.fetchAppointments()
  },
  methods: {
    async fetchAppointments () {
      try {
        const request = await service.all()
        const { data: response, status } = request

        if (status === HTTP_RESPONSE.OK) {
          this.datatable.rows = response.data
          this.datatable.pagination = response.meta
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
      <div class="l-boxContent_head_title">Listagem de Consultas</div>
      <div class="l-boxContent_head_subtitle">apenas uma listagem de consultas</div>
    </template>
    <div class="row col-12">
      <div class="s-align--right s-mb--md">
        <button type="button"
                ref="appointment-create"
                @click="() => $router.push({ name: 'appointment.create' })"
                class="m-button ">
          + Nova Consulta
        </button>
        <app-input v-model="datatable.filterKey"
                   hidden
                   forId="filterKey"
                   placeholder="digite algo"
                   label="Buscar" />
      </div>
    </div>
    <app-table :thead="datatable.thead"
               :rows="datatable.rows"
               @server-request="fetchAppointments"
               :filterKey="datatable.filterKey">
              <template #tbody>
                <tr v-for="(row, index) in datatable.rows" :key="index">
                  <td scope="row" data-label="ID">{{ row.id }}</td>
                  <td scope="row" data-label="Médico">{{ row.medico.nome }}</td>
                  <td scope="row" data-label="Paciente">{{ row.paciente }}</td>
                  <td scope="row" data-label="Data Consulta">{{ row.dataConsulta }}</td>
                  <td scope="row" data-label="">
                    <button type="button"
                            ref="appointment-detail"
                            @click="$router.push({ name: 'appointment.detail', params: {id: `${ row.id}`} })"
                            class="m-button ">
                      consultar
                    </button>
                  </td>
                </tr>
              </template>
    </app-table>
  </card-box>
</template>
