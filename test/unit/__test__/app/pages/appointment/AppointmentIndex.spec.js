/* eslint-disable */
/**
 * @jest-environment node
 */
import { shallowMount, config  } from '@vue/test-utils'
import AppointmentIndex from '@/app/pages/appointment/views/AppointmentIndex'
import CardBox from '@/components/layouts/CardBox'
import AppTable from '@/components/table/AppTable'
import AppInput from '@/components/form/AppInput'
import flushPromises from "flush-promises"

config.showDeprecationWarnings = false

describe('AppointmentIndex.vue', () => {
  const mockRoute = {
    params: { id: 1 }
  }
  const mockRouter = { push: jest.fn() }

  const build = () => {
    const wrapper = shallowMount(AppointmentIndex, {
      stubs: ['router-link'],
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        }
      }
    })

    return {
      wrapper,
      CardBox: () => wrapper.findComponent(CardBox),
      AppTable: () => wrapper.findComponent(AppTable),
      AppInput: () => wrapper.findComponent(AppInput)
    }
  }

  it('should render instance component', () => {
    const { wrapper } = build()
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders main children components', () => {
    const { CardBox, AppTable, AppInput } =  build()

    expect(CardBox().exists()).toBe(true)
    expect(AppTable().exists()).toBe(true)
    expect(AppInput().exists()).toBe(true)
  })

  it('passes a binded user props to AppInput component', () => {
    const { AppInput, wrapper } =  build()
    wrapper.setData({
      forId: 'id-1'
    })

    const forId = AppInput().vm.$options.props.forId
    expect(forId).toBeTruthy()
  })

  it('should contain method fetchAppointments()', () => {
    const { wrapper } = build()
    expect(wrapper.vm.fetchAppointments).toBeTruthy()
  })

  it("should contain datatable.rows fetchAppointments()", async () => {
    const { wrapper } = build()

    await flushPromises()
    expect(wrapper.vm.datatable.rows.length).toBe(0)
  })

  it("should contain button add and redirect to create", async () => {
    const { wrapper } = build()

    const btn = wrapper.find({ ref: 'appointment-create' })
    expect(btn.text()).toContain('+ Nova Consulta')
  })

})
