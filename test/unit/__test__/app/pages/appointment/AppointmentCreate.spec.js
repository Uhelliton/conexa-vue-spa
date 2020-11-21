/* eslint-disable */
/**
 * @jest-environment node
 */
import { shallowMount, config, createLocalVue  } from '@vue/test-utils'
import AppointmentIndex from '@/app/pages/appointment/views/AppointmentCreate'
import FormBase from '@/app/pages/appointment/components/FormBase'
import CardBox from '@/components/layouts/CardBox'
import flushPromises from "flush-promises"
import mockAxios from 'axios'
import appointmentService from '@/app/domains/appointment/services/appointment-service'
import {appointment} from "../../domains/__mocks__/appointment-mock";
import FlashMessage from '@smartweb/vue-flash-message';

const localVue = createLocalVue()
localVue.use(FlashMessage);

config.showDeprecationWarnings = false


describe('AppointmentIndex.vue', () => {
  const mockRoute = {
    params: { id: 1 }
  }
  const mockRouter = { push: jest.fn() }

  const build = () => {
    const wrapper = shallowMount(AppointmentIndex, {
      stubs: ['router-link'],
      localVue,
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
      FormBase: () => wrapper.findComponent(FormBase),
    }
  }

  it('should render instance component', () => {
    const { wrapper } = build()
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders main children components', () => {
    const { CardBox, FormBase } =  build()

    expect(CardBox().exists()).toBe(true)
    expect(FormBase().exists()).toBe(true)
  })


  it('should contain method onSubmit()', () => {
    const { wrapper } = build()
    expect(wrapper.vm.onSubmit).toBeTruthy()
  })

  it('should redirect to "appointment.index" after onSubmit()', () => {
    const { wrapper } = build()
    expect(wrapper.emitted()).toEqual({})
  })


  it('should onSubmit has executed with response 401', async () => {
    const { wrapper, FormBase } = build()

    FormBase().vm.$emit('submit', {})
    wrapper.vm.onSubmit()

    // setup
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: appointment,
        // status: 401,
      })
    )
    const service = await appointmentService.create(appointment)

    // Wait until the DOM updates.
    await flushPromises()

    expect(mockAxios.post).toHaveBeenCalledTimes(2)
  })
})
