/* eslint-disable */
/**
 * @jest-environment node
 */
import { shallowMount } from '@vue/test-utils'
import DashboardIndex from '@/app/pages/dashboard/views/DashboardIndex'

describe('DashboardIndex.vue', () => {
  const build = () => {
    const wrapper = shallowMount(DashboardIndex)

    return {
      wrapper,
    }
  }

  it('should render instance component', () => {
    const { wrapper } = build()
    expect(wrapper.vm).toBeTruthy()
  })

})
