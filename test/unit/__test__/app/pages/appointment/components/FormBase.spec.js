/* eslint-disable */
/**
 * @jest-environment node
 */
import {createLocalVue, shallowMount, config} from '@vue/test-utils'
import FormBase from '@/app/pages/appointment/components/FormBase'
import AppInput from '@/components/form/AppInput'
import AppTextarea from '@/components/form/AppTextarea'
import Vuex from 'vuex'
import sinon from "sinon";

const localVue = createLocalVue()
localVue.use(Vuex)

config.showDeprecationWarnings = false

describe('FormBase.vue', () => {
  let actions
  let getters
  let state
  let store

  beforeEach(() => {
    state = {
      auth: {
        name: 'Uhelliton Andrade',
        email: 'uhlliton@uol.com.br',
        id: 1,
      },
      token: 'eyJhbGciOiJIUzI1NiJ9'
    }
    actions = {
      attemptLogin: jest.fn(),
      logout: jest.fn()
    }
    getters = {
      user: () => {
        return {
          name: 'Uhelliton Andrade',
          email: 'uhlliton@uol.com.br',
          id: 1,
        }
      },
      token: () => {
        return 'eyJhbGciOiJIUzI1NiJ9'
      }
    },
      store = new Vuex.Store({
        modules: {
          user: {
            actions,
            state,
            getters,
            namespaced: true
          }
        }
      })
  })

  const build = () => {
    const wrapper = shallowMount(FormBase, {
      localVue,
      store,
      stubs: ['router-link']
    })

    return {
      wrapper,
      AppInput: () => wrapper.findComponent(AppInput),
      AppTextarea: () => wrapper.findComponent(AppTextarea)
    }
  }

  it('should render instance component', () => {
    const { wrapper } = build()
    expect(wrapper.vm).toBeTruthy()
  })

  it('renders main children components', () => {
    const { CardBox, AppTextarea, AppInput } =  build()

    expect(AppTextarea().exists()).toBe(true)
    expect(AppInput().exists()).toBe(true)
  })

  it('passes a binded user props to AppInput,AppTextarea component', () => {
    const { AppInput, AppTextarea, wrapper } =  build()
    wrapper.setData({
      forId: 'id-1'
    })

    const forId = AppInput().vm.$options.props.forId
    const forId2 = AppTextarea().vm.$options.props.forId
    expect(forId).toBeTruthy()
    expect(forId2).toBeTruthy()
  })

  it('should contain method handleSubmit and emited event', async () => {
    const { wrapper } = build()

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')[0][0]).toEqual({
      dataConsulta: '',
      idMedico: 1,
      observacao: '',
      paciente: ''
    })

    // expect(wrapper.emitted('submit')).toBeTruthy()
  })

})
